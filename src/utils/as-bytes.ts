/**
 * Formats `val` as 0x prefixed string with even length
 * @param val
 */
export function asBytes(val: bigint): string {
    const hex = val.toString(16)

    if (hex.length % 2) {
        return '0x0' + hex
    }

    return '0x' + hex
}
