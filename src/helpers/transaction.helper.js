import { SHA256 } from 'crypto-js'
import { generateId } from './utils'
import { ec } from 'elliptic'
const EC = new ec('secp256k1')

class TransactionHelper {
  static createTx (from, to, amount, id = null) {
    return {
      id: id || generateId(),
      fromAddress: from,
      toAddress: to,
      amount,
      signature: ''
    }
  }
  static calculateHash(fromPublicKey, toPublicKey, amount) {
    return SHA256(fromPublicKey + toPublicKey + amount).toString()
  }
  static signTx(tx, owner) {
    if (owner.publicKey !== tx.fromAddress.publicKey)
      throw new Error('You cannot sign transactions for other wallets')
    const hashTx = this.calculateHash(tx.fromAddress.publicKey, tx.toAddress.publicKey, tx.amount)
    const key = EC.keyFromPrivate(owner.privateKey, 'hex')
    const sig = EC.sign(hashTx, key)
    tx.signature = sig.toDER('hex')
  }

  static isValid(tx) {
      if (tx.fromAddress === null) return true
      if (!tx.signature || tx.signature.length === 0)
        throw new Error('No signature in this transaction')
      const publicKey = EC.keyFromPublic(
        tx.fromAddress.publicKey,
        'hex'
      )
      const hashTx = this.calculateHash(tx.fromAddress.publicKey, tx.toAddress.publicKey, tx.amount)
      return publicKey.verify(hashTx, tx.signature)
  }
}

export default TransactionHelper