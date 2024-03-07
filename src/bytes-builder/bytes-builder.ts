import assert from 'assert'
import {BN} from '../bn/bn'
import {isHexBytes} from '../validations'
import {UINT_8_MAX as UINT_160_MAX} from '../constants'
import {trim0x} from '../utils'

/**
 * Helper class to build an arbitrary bytes sequence
 */
export class BytesBuilder {
    private bytes: string

    constructor(init?: string | BN) {
        if (init === undefined) {
            this.bytes = '0x'

            return
        }

        if (typeof init === 'string') {
            assert(isHexBytes(init), 'Init bytes must be valid hex bytes')

            this.bytes = init
        } else {
            this.bytes = init.toHex()
        }
    }

    /**
     * Returns current bytes count
     */
    get length(): number {
        return Number(this.bytes.length / 2 - 1)
    }

    public addAddress(address: string | BN): this {
        if (typeof address === 'string') {
            assert(
                isHexBytes(address) && address.length === 42,
                'Invalid address'
            )

            this.append(address)
        } else {
            assert(address.value <= UINT_160_MAX, 'Invalid address: too big')

            this.append(address.toHex(40))
        }

        return this
    }

    public addBytes(bytes: string): this {
        assert(isHexBytes(bytes), 'Invalid bytes')

        this.append(bytes)

        return this
    }

    public addByte(byte: string | BN): this {
        return this.addNBytes(byte, 1)
    }

    public addUint8(val: string | BN): this {
        return this.addNBytes(val, 1)
    }

    public addUint16(val: string | BN): this {
        return this.addNBytes(val, 2)
    }

    public addUint24(val: string | BN): this {
        return this.addNBytes(val, 3)
    }

    public addUint32(val: string | BN): this {
        return this.addNBytes(val, 4)
    }

    public addUint64(val: string | BN): this {
        return this.addNBytes(val, 8)
    }

    public addUint128(val: string | BN): this {
        return this.addNBytes(val, 16)
    }

    public addUint160(val: string | BN): this {
        return this.addNBytes(val, 20)
    }

    public addUint256(val: string | BN): this {
        return this.addNBytes(val, 32)
    }

    /**
     * Returns bytes as single bigint value
     */
    public asBigInt(): bigint {
        return BigInt(this.bytes)
    }

    /**
     * Returns hex string
     *
     * @param prefixed should be string prefixed with 0x or not, true by default
     */
    public asHex(prefixed = true): string {
        return prefixed ? this.bytes : this.bytes.slice(2)
    }

    private append(bytes: string): void {
        this.bytes += trim0x(bytes)
    }

    private addNBytes(bytes: string | BN, n: number): this {
        if (typeof bytes === 'string') {
            assert(isHexBytes(bytes), 'Invalid value: not bytes hex string')
            assert(bytes.length === 2 + n * 2, 'Invalid value: bad length')

            this.append(bytes)
        } else {
            assert(
                bytes.value <= (1n << (8n * BigInt(n))) - 1n,
                'Invalid value: too long'
            )

            this.append(bytes.toHex(n * 2))
        }

        return this
    }
}
