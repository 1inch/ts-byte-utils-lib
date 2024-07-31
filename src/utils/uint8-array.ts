import assert from 'assert'
import {trim0x} from './zero-x-prefix'
import {isHexBytes} from '../validations'

/**
 * Convert hex string to Uint8Array. String must be prefixed with 0x and have even length
 */
export const hexToUint8Array = (hex: string): Uint8Array => {
    assert(isHexBytes(hex), 'invalid hex bytes')
    const trimmed = trim0x(hex)
    const array = new Uint8Array({length: trimmed.length / 2})

    for (let i = 0; i < trimmed.length; i += 2) {
        array[i / 2] = parseInt(trimmed.slice(i, i + 2), 16)
    }

    return array
}

/**
 * Convert Uint8Array to hex string.
 */
export const uint8ArrayToHex = (arr: Uint8Array): string => {
    return '0x' + [...arr].map((i) => i.toString(16).padStart(2, '0')).join('')
}
