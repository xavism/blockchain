import { SHA256 } from 'crypto-js'
import { ec } from 'elliptic'
import Wallet from './wallet'
const EC = new ec('secp256k1')

export default class Transaction {
  readonly fromAddress: Wallet
  readonly toAddress: Wallet
  readonly amount: number
  private signature: any
  constructor(fromAddress: Wallet, toAddress: Wallet, amount: number) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }

  calculateHash(): string {
    return SHA256(
      this.fromAddress.key.getPublic('hex') +
        this.toAddress.key.getPublic('hex') +
        this.amount
    ).toString()
  }

  signTransaction(signingKey: any) {
    if (signingKey.getPublic('hex') !== this.fromAddress.key.getPublic('hex'))
      throw new Error('You cannot sign transactions for other wallets')

    const hashTx = this.calculateHash()
    const sig = signingKey.sign(hashTx, 'base64')
    this.signature = sig.toDER('hex')
  }

  isValid(): boolean {
    debugger
    if (this.fromAddress === null) return true
    if (!this.signature || this.signature.length === 0)
      throw new Error('No signature in this transaction')
    const publicKey = EC.keyFromPublic(
      this.fromAddress.key.getPublic('hex'),
      'hex'
    )
    return publicKey.verify(this.calculateHash(), this.signature)
  }
}
