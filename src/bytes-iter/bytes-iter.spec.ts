import {BytesIter} from './bytes-iter'

describe('BytesIter', () => {
    it('should iterate as BigInt ', () => {
        const iter = BytesIter.BigInt('0xdeadbeef')
        expect(iter.nextByte()).toEqual(BigInt(0xde))
        expect(iter.nextByte()).toEqual(BigInt(0xad))
        expect(iter.nextBytes(2)).toEqual(BigInt(0xbeef))
    })

    it('should iterate as String ', () => {
        const iter = BytesIter.HexString('0xdeadbeef')
        expect(iter.nextByte()).toEqual('0xde')
        expect(iter.nextByte()).toEqual('0xad')
        expect(iter.nextBytes(2)).toEqual('0xbeef')
    })

    it('should iterate in reverse ', () => {
        const iter = BytesIter.HexString('0xdeadbeef')
        expect(iter.nextByte(BytesIter.SIDE.Back)).toEqual('0xef')
        expect(iter.nextByte(BytesIter.SIDE.Back)).toEqual('0xbe')
        expect(iter.nextBytes(2, BytesIter.SIDE.Back)).toEqual('0xdead')
    })
})
