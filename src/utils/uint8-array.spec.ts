import {hexToUint8Array, uint8ArrayToHex} from './uint8-array'

describe('hexToUint8Array', () => {
    it('should convert hex to Uint8Array', () => {
        expect(hexToUint8Array('0xdeadbeef')).toEqual(
            new Uint8Array([222, 173, 190, 239])
        )
    })
})

describe('uint8ArrayToHex', () => {
    it('should convert Uint8Array to hex string', () => {
        expect(uint8ArrayToHex(new Uint8Array([222, 173, 190, 239]))).toEqual(
            '0xdeadbeef'
        )
    })
})
