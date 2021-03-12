import { ec } from 'elliptic'
import faker from 'faker'
import ColorHelper from './color.helper'
const EC = new ec('secp256k1')
const satoshiKey = EC.genKeyPair()
const satoshi = {
  name: 'Satoshi',
  color: '#ff0066',
  textColor: 'white',
  publicKey: satoshiKey.getPublic('hex'),
  privateKey: satoshiKey.getPrivate('hex')
}

export default class WalletHelper {

  static createRandomWallet() {
    let key = EC.genKeyPair()
    let color = ColorHelper.getColorFromColorPalette()
    let publicKey = key.getPublic('hex')
    let privateKey = key.getPrivate('hex')
    return {
      name: faker.name.firstName(),
      color,
      textColor: ColorHelper.isBright(color) ? 'black' : 'white',
      publicKey,
      privateKey,
    }
  }
  static getSatoshi = () => satoshi
}
