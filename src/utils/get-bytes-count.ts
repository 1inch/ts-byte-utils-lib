import {trim0x} from './zero-x-prefix'

export function getBytesCount(hex: string): bigint {
    return BigInt(trim0x(hex).length / 2)
}
