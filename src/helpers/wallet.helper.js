import { ec } from 'elliptic'
import faker from 'faker'
import ColorHelper from './color.helper'
const EC = new ec('secp256k1')


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
}
