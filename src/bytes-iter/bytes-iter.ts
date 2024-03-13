import assert from 'assert'
import {isHexBytes} from '../validations'
import {add0x} from '../utils'

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

    static String(bytes: string): BytesIter<string> {
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

    public nextByte(): T {
        return this.nextBytes(1)
    }

    public nextBytes(n: number): T {
        const cnt = n * 2

        if (this.bytes.length < cnt) {
            throw new Error(
                `Can not consume ${n} bytes, have only ${this.bytes.length / 2}`
            )
        }

        const bytes = this.bytes.slice(0, cnt)

        this.bytes = this.bytes.slice(cnt)

        return this.ResultType(add0x(bytes))
    }

    public nextUint8(): T {
        return this.nextByte()
    }

    public nextUint16(): T {
        return this.nextBytes(2)
    }

    public nextUint24(): T {
        return this.nextBytes(3)
    }

    public nextUint32(): T {
        return this.nextBytes(4)
    }

    public nextUint128(): T {
        return this.nextBytes(16)
    }

    public nextUint160(): T {
        return this.nextBytes(20)
    }

    public nextUint256(): T {
        return this.nextBytes(32)
    }
}
