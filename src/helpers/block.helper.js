import { SHA256 } from 'crypto-js'
import TransactionHelper from './transaction.helper'
import { generateId } from './utils'
import WalletHelper from './wallet.helper'

class BlockHelper {
  // All the info need to create a block in our chain, in this step we change data with a transactions array per each block

  static createBlock(timestamp, transactions, previousHash = '') {
    return {
      id: generateId(),
      timestamp,
      transactions,
      previousHash,
      nonce: 0,
      hash: this.calculateHash(timestamp, transactions, previousHash, 0)
    }
  }
  
  // Getting the hash with the amount of 0 based on the difficulty
  static mineBlock(block, difficulty) {

    let { timestamp, transactions, previousHash } = block
    while (block.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
      block.nonce++
      block.hash = this.calculateHash(timestamp, transactions, previousHash, block.nonce)
    }
  }

  static createGenesisBlock(miningReward) {
    let block = this.createBlock(new Date().toISOString().split('T')[0], [TransactionHelper.createTx(null, WalletHelper.getSatoshi(), miningReward)], '')
    return block
  }
  // Method that calculates the hash of the block
  static calculateHash(timestamp, transactions, previousHash, nonce) {
    return SHA256(timestamp + JSON.stringify(transactions) + previousHash + nonce).toString()
  }

  static hasValidTransactions(block) {
    return block.transactions.every(tx => TransactionHelper.isValid(tx))
  }
  static isValid(block, chain, index) {
    if (!this.hasValidTransactions(block)) return false
      // ensure that the hash info of the current block is ok and hasn't been modified
      if (block.hash !== this.calculateHash(block.timestamp, block.transactions, block.previousHash, block.nonce)) return false
      if(index === 0) return true
      // checking that the prevous block information is ok
      let { timestamp, transactions, previousHash, nonce } = chain[index - 1]
      if (block.previousHash !== this.calculateHash(timestamp, transactions, previousHash, nonce)) return false
      if (!this.isValid(chain[index - 1], chain, index - 1)) return false
      return true
  }
}

export default BlockHelper