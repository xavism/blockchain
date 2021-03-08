import ColorHelper from '@/helpers/color.helper'
import { ec } from 'elliptic'
const EC = new ec('secp256k1')

const key = EC.genKeyPair()
const publicKey = key.getPublic('hex')
const privateKey = key.getPrivate('hex')

console.log()
console.log('Private key', privateKey)

console.log()
console.log('Public key', publicKey)

export default class Wallet {
  name: string
  color: string
  key: ec.KeyPair

  constructor(name: string) {
    this.name = name
    this.color = ColorHelper.getRandomHexadecimalColor()
    const key = EC.genKeyPair()
    console.log('publicKey: ', key.getPublic('hex'))
    console.log('privateKey: ', key.getPrivate('hex'))
    this.key = key
  }
}
