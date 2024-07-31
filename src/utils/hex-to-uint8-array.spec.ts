import {hexToUint8Array} from './hex-to-uint8-array'

describe('hexToUint8Array', () => {
    it('should convert hex to Uint8Array', () => {
        expect(hexToUint8Array('0xdeadbeef')).toEqual(
            new Uint8Array([222, 173, 190, 239])
        )
    })
})
