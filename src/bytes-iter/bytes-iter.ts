import assert from 'assert'
import {isHexBytes} from '../validations'
import {add0x} from '../utils'

enum Side {
    Front,
    Back
}

/**
 * Class to iterate through bytes string by parsing individual bytes
 *
 * @example
 * const iter = BytesIter.BigInt('0xdeadbeef')
 * iter.nextByte() == BigInt(0xde)
 * iter.nextByte() == BigInt(0xad)
 * iter.nextBytes(2) == BigInt(0xbeef)
 */
export class BytesIter<T> {
    public static SIDE = Side

    private bytes: string

    private constructor(
        bytes: string,
        private readonly ResultType: (val: string) => T
    ) {
        assert(isHexBytes(bytes), 'invalid bytes value')

        this.bytes = bytes.slice(2) // trim 0x
    }

    static BigInt(bytes: string): BytesIter<bigint> {
        return new BytesIter(bytes, BigInt)
    }

    static HexString(bytes: string): BytesIter<string> {
        return new BytesIter(bytes, String)
    }

    /**
     * Returns all not consumed bytes
     */
    public rest(): T {
        return this.ResultType(add0x(this.bytes))
    }

    public isEmpty(): boolean {
        return this.bytes.length === 0
    }

    public nextByte(side = Side.Front): T {
        return this.nextBytes(1, side)
    }

    public nextBytes(n: number, side = Side.Front): T {
        const cnt = n * 2

        if (this.bytes.length < cnt) {
            throw new Error(
                `Can not consume ${n} bytes, have only ${this.bytes.length / 2}`
            )
        }

        const isFront = side === Side.Front

        const bytes = isFront
            ? this.bytes.slice(0, cnt)
            : this.bytes.slice(-cnt)

        this.bytes = isFront ? this.bytes.slice(cnt) : this.bytes.slice(0, -cnt)

        return this.ResultType(add0x(bytes))
    }

    public nextAddress(side = Side.Front): T {
        return this.nextBytes(20, side)
    }

    public nextUint8(side = Side.Front): T {
        return this.nextByte(side)
    }

    public nextUint16(side = Side.Front): T {
        return this.nextBytes(2, side)
    }

    public nextUint24(side = Side.Front): T {
        return this.nextBytes(3, side)
    }

    public nextUint32(side = Side.Front): T {
        return this.nextBytes(4, side)
    }

    public nextUint40(side = Side.Front): T {
        return this.nextBytes(5, side)
    }

    public nextUint48(side = Side.Front): T {
        return this.nextBytes(6, side)
    }

    public nextUint64(side = Side.Front): T {
        return this.nextBytes(8, side)
    }

    public nextUint96(side = Side.Front): T {
        return this.nextBytes(12, side)
    }

    public nextUint128(side = Side.Front): T {
        return this.nextBytes(16, side)
    }

    public nextUint160(side = Side.Front): T {
        return this.nextBytes(20, side)
    }

    public nextUint256(side = Side.Front): T {
        return this.nextBytes(32, side)
    }
}
