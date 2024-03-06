# @1inch/byte-utils
Contains helpers to work with bytes

## Installation

```shell
npm install '@1inch/byte-utils'
```

## Docs

<!-- TSDOC_START -->

## :toolbox: Functions

- [isHexString](#gear-ishexstring)
- [isHexBytes](#gear-ishexbytes)

### :gear: isHexString

Check that string starts with 0x and has only valid hex symbols

| Function | Type |
| ---------- | ---------- |
| `isHexString` | `(val: string) => boolean` |

### :gear: isHexBytes

Check that string is valid hex with 0x prefix and length is even

| Function | Type |
| ---------- | ---------- |
| `isHexBytes` | `(val: string) => boolean` |


## :factory: BitMask

### Methods

- [toString](#gear-tostring)
- [toBigInt](#gear-tobigint)

#### :gear: toString

| Method | Type |
| ---------- | ---------- |
| `toString` | `() => string` |

#### :gear: toBigInt

| Method | Type |
| ---------- | ---------- |
| `toBigInt` | `() => bigint` |


## :factory: BN

Class to work with bits in bignumber
Immutable, all methods return new value

### Methods

- [fromNumber](#gear-fromnumber)
- [setBit](#gear-setbit)
- [getBit](#gear-getbit)
- [shiftLeft](#gear-shiftleft)
- [shiftRight](#gear-shiftright)
- [and](#gear-and)
- [or](#gear-or)
- [xor](#gear-xor)
- [isZero](#gear-iszero)
- [isOne](#gear-isone)
- [getMask](#gear-getmask)
- [setMask](#gear-setmask)
- [clearMask](#gear-clearmask)
- [toHex](#gear-tohex)
- [toNumber](#gear-tonumber)

#### :gear: fromNumber

| Method | Type |
| ---------- | ---------- |
| `fromNumber` | `(n: number) => BN` |

#### :gear: setBit

| Method | Type |
| ---------- | ---------- |
| `setBit` | `(n: bigint, value: 0 or 1) => BN` |

#### :gear: getBit

| Method | Type |
| ---------- | ---------- |
| `getBit` | `(n: bigint) => 0 or 1` |

#### :gear: shiftLeft

| Method | Type |
| ---------- | ---------- |
| `shiftLeft` | `(n: bigint) => BN` |

#### :gear: shiftRight

| Method | Type |
| ---------- | ---------- |
| `shiftRight` | `(n: bigint) => BN` |

#### :gear: and

| Method | Type |
| ---------- | ---------- |
| `and` | `(other: bigint or BN) => BN` |

#### :gear: or

| Method | Type |
| ---------- | ---------- |
| `or` | `(other: bigint or BN) => BN` |

#### :gear: xor

| Method | Type |
| ---------- | ---------- |
| `xor` | `(other: bigint or BN) => BN` |

#### :gear: isZero

| Method | Type |
| ---------- | ---------- |
| `isZero` | `() => boolean` |

#### :gear: isOne

| Method | Type |
| ---------- | ---------- |
| `isOne` | `() => boolean` |

#### :gear: getMask

Return bits defined in `mask` as BN

| Method | Type |
| ---------- | ---------- |
| `getMask` | `(mask: BitMask) => BN` |

#### :gear: setMask

Set bits defined in `mask` to `value`
if value is bigger than mask then error will be thrown

| Method | Type |
| ---------- | ---------- |
| `setMask` | `(mask: BitMask, value: bigint or BN) => BN` |

#### :gear: clearMask

Set bits defined in `mask` to 0s

| Method | Type |
| ---------- | ---------- |
| `clearMask` | `(mask: BitMask) => BN` |

#### :gear: toHex

Return 0x prefixed string with hex representation of BN, padded with '0s' if `padNum` specified

| Method | Type |
| ---------- | ---------- |
| `toHex` | `(padNum?: number) => string` |

#### :gear: toNumber

Convert BN to Number

Caution: value will be rounded for numbers > `Number.MAX_SAFE_INTEGER`

| Method | Type |
| ---------- | ---------- |
| `toNumber` | `() => number` |


## :factory: BytesIter

Class to iterate though bytes string by parsing individual bytes

### Methods

- [isEmpty](#gear-isempty)
- [nextByte](#gear-nextbyte)
- [nextBytes](#gear-nextbytes)
- [nextUint8](#gear-nextuint8)
- [nextUint16](#gear-nextuint16)
- [nextUint24](#gear-nextuint24)
- [nextUint32](#gear-nextuint32)
- [nextUint160](#gear-nextuint160)

#### :gear: isEmpty

| Method | Type |
| ---------- | ---------- |
| `isEmpty` | `() => boolean` |

#### :gear: nextByte

| Method | Type |
| ---------- | ---------- |
| `nextByte` | `() => bigint` |

#### :gear: nextBytes

| Method | Type |
| ---------- | ---------- |
| `nextBytes` | `(n: number) => bigint` |

#### :gear: nextUint8

| Method | Type |
| ---------- | ---------- |
| `nextUint8` | `() => bigint` |

#### :gear: nextUint16

| Method | Type |
| ---------- | ---------- |
| `nextUint16` | `() => bigint` |

#### :gear: nextUint24

| Method | Type |
| ---------- | ---------- |
| `nextUint24` | `() => bigint` |

#### :gear: nextUint32

| Method | Type |
| ---------- | ---------- |
| `nextUint32` | `() => bigint` |

#### :gear: nextUint160

| Method | Type |
| ---------- | ---------- |
| `nextUint160` | `() => bigint` |


<!-- TSDOC_END -->
