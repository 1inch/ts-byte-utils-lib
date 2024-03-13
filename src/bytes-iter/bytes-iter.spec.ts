import {BytesIter} from './bytes-iter'

describe('BytesIter', () => {
    it('should iterate as BigInt ', () => {
        const iter = BytesIter.BigInt('0xdeadbeef')
        expect(iter.nextByte()).toEqual(BigInt(0xde))
        expect(iter.nextByte()).toEqual(BigInt(0xad))
        expect(iter.nextBytes(2)).toEqual(BigInt(0xbeef))
    })

    it('should iterate as String ', () => {
        const iter = BytesIter.String('0xdeadbeef')
        expect(iter.nextByte()).toEqual('0xde')
        expect(iter.nextByte()).toEqual('0xad')
        expect(iter.nextBytes(2)).toEqual('0xbeef')
    })
})
