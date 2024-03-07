import {BytesBuilder} from './bytes-builder'
import {BN} from '../bn/bn'

describe('BytesBuilder', () => {
    it('Should build correct bytes', () => {
        // deadbeef
        const beef = new BytesBuilder()
        beef.addByte('0xde')
        beef.addByte(BN.fromHex('0xad'))
        beef.addUint16(BN.fromHex('0xbeef'))

        expect(beef.asHex()).toEqual('0xdeadbeef')

        // deadc0de
        const code = new BytesBuilder('0xde')
        code.addUint24('0xadc0de')

        expect(code.asHex()).toEqual('0xdeadc0de')

        // f00dbabe (shout-out to ledger)
        const babe = new BytesBuilder()
        babe.addBytes('0xf0')
        babe.addByte(BN.fromNumber(0x0d))
        babe.addUint16(new BN(0xbaben))
        expect(babe.asHex()).toEqual('0xf00dbabe')
    })
})
