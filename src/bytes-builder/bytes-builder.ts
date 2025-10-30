import assert from 'assert'
import {BN} from '../bn/bn'
import {isHexBytes} from '../validations'
import {UINT_160_MAX} from '../constants'
import {trim0x} from '../utils'

/**
 * Helper class to build an arbitrary bytes sequence
 */
export class BytesBuilder {
    private bytes: string

    constructor(init?: string | BN | bigint) {
        if (init === undefined) {
            this.bytes = '0x'

            return
        }

        if (typeof init === 'string') {
            assert(isHexBytes(init), 'Init bytes must be valid hex bytes')

            this.bytes = init
        } else {
            const initBn = init instanceof BN ? init : new BN(init)
            this.bytes = initBn.toHex()
        }
    }

    /**
     * Returns current bytes count
     */
    get length(): number {
        return Number(this.bytes.length / 2 - 1)
    }

    public addAddress(address: string | BN | bigint): this {
        if (typeof address === 'string') {
            assert(
                isHexBytes(address) && address.length === 42,
                'Invalid address'
            )

            this.append(address)
        } else {
            const addressBN = address instanceof BN ? address : new BN(address)
            assert(addressBN.value <= UINT_160_MAX, 'Invalid address: too big')

            this.append(addressBN.toHex(40))
        }

        return this
    }

    public addBytes(bytes: string): this {
        assert(isHexBytes(bytes), 'Invalid bytes')

        this.append(bytes)

        return this
    }

    public addByte(byte: string | BN | bigint): this {
        return this.addNBytes(byte, 1)
    }

    public addUint8(val: string | BN | bigint): this {
        return this.addNBytes(val, 1)
    }

    public addUint16(val: string | BN | bigint): this {
        return this.addNBytes(val, 2)
    }

    public addUint24(val: string | BN | bigint): this {
        return this.addNBytes(val, 3)
    }

    public addUint32(val: string | BN | bigint): this {
        return this.addNBytes(val, 4)
    }

    public addUint40(val: string | BN | bigint): this {
        return this.addNBytes(val, 5)
    }

    public addUint48(val: string | BN | bigint): this {
        return this.addNBytes(val, 6)
    }

    public addUint64(val: string | BN | bigint): this {
        return this.addNBytes(val, 8)
    }

    public addUint128(val: string | BN | bigint): this {
        return this.addNBytes(val, 16)
    }

    public addUint160(val: string | BN | bigint): this {
        return this.addNBytes(val, 20)
    }

    public addUint256(val: string | BN | bigint): this {
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

    private addNBytes(bytes: string | BN | bigint, n: number): this {
        if (typeof bytes === 'string') {
            assert(isHexBytes(bytes), 'Invalid value: not bytes hex string')
            assert(bytes.length === 2 + n * 2, 'Invalid value: bad length')

            this.append(bytes)
        } else {
            const bytesBn = bytes instanceof BN ? bytes : new BN(bytes)
            assert(
                bytesBn.value <= (1n << (8n * BigInt(n))) - 1n,
                'Invalid value: too long'
            )

            this.append(bytesBn.toHex(n * 2))
        }

        return this
    }
}
