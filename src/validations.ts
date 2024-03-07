const HEX_REGEX = /^(0x)[0-9a-f]+$/i

/**
 * Check that string starts with 0x and has only valid hex symbols
 * @param val
 */
export function isHexString(val: string): boolean {
    return HEX_REGEX.test(val.toLowerCase())
}

/**
 * Check that string is valid hex with 0x prefix and length is even
 * @param val
 */
export function isHexBytes(val: string): boolean {
    return isHexString(val) && val.length % 2 === 0
}
