import assert from 'assert'
import {BitMask} from '../bit-mask/bit-mask'
import {add0x} from '../utils'
import {isHexString} from '../validations'

/**
 * Class to work with bits in bignumber
 * Immutable, all methods return new value
 */
export class BN {
    constructor(public readonly value: bigint) {}

    static fromNumber(n: number): BN {
        return new BN(BigInt(n))
    }

    static fromHex(hex: string): BN {
        assert(isHexString(hex), 'Invalid hex')

        return new BN(BigInt(hex))
    }

    /**
     * Add value
     */
    public add(other: BN): BN {
        return new BN(this.value + other.value)
    }

    /**
     * Subtract value
     */
    public sub(other: BN): BN {
        return new BN(this.value - other.value)
    }

    public setBit(n: bigint, value: 1 | 0 | true | false): BN {
        if (value) {
            return new BN(this.value | (1n << n))
        }

        return new BN(this.value & ~(1n << n))
    }

    public getBit(n: bigint): 1 | 0 {
        return (this.value & (1n << n)) === 0n ? 0 : 1
    }

    public shiftLeft(n: bigint): BN {
        return new BN(this.value << n)
    }

    public shiftRight(n: bigint): BN {
        return new BN(this.value >> n)
    }

    public and(other: BN | bigint): BN {
        const raw = typeof other === 'bigint' ? other : other.value

        return new BN(raw & this.value)
    }

    public or(other: BN | bigint): BN {
        const raw = typeof other === 'bigint' ? other : other.value

        return new BN(raw | this.value)
    }

    public xor(other: BN | bigint): BN {
        const raw = typeof other === 'bigint' ? other : other.value

        return new BN(raw ^ this.value)
    }

    public isZero(): boolean {
        return this.value === 0n
    }

    public isOne(): boolean {
        return this.value === 1n
    }

    /**
     * Return bits defined in `mask` as BN
     *
     * @example
     * const mask = new BitMask(4, 8) // bits 4,5,6,7
     * const bn = new BN(0x1234abcd)
     *
     * new BN(0x2).value === bn.getMask(mask)
     */
    public getMask(mask: BitMask): BN {
        return this.shiftRight(mask.offset).and(mask.mask)
    }

    /**
     * Set bits defined in `mask` to `value`
     * if value is bigger than mask then error will be thrown
     */
    public setMask(mask: BitMask, value: BN | bigint): BN {
        const raw = typeof value === 'bigint' ? value : value.value
        assert(
            raw <= mask.mask,
            `Value 0x${raw.toString(16)} to big for mask ${mask}`
        )

        return new BN(this.clearMask(mask).value | (raw << mask.offset))
    }

    /**
     * Set bits defined in `mask` to 0s
     */
    public clearMask(mask: BitMask): BN {
        return new BN(this.value - (mask.toBigInt() & this.value))
    }

    /**
     * Return 0x prefixed string with hex representation of BN, padded with '0s' if `padNum` specified
     */
    public toHex(padNum = 0): string {
        return add0x(this.value.toString(16).padStart(padNum, '0'))
    }

    /**
     * Convert BN to Number
     *
     * Caution: value will be rounded for numbers > `Number.MAX_SAFE_INTEGER`
     */
    public toNumber(): number {
        return Number(this.value)
    }
}
