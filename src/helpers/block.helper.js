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
    console.log(SHA256)
    let block = this.createBlock(new Date().toISOString().split('T')[0], [], '0')
    block.transactions.push(TransactionHelper.createTx(null, WalletHelper.getSatoshi(), miningReward))
    return block
  }
  // Method that calculates the hash of the block
  static calculateHash(timestamp, transactions, previousHash, nonce) {
    return SHA256(timestamp + JSON.stringify(transactions) + previousHash + nonce).toString()
  }

  static hasValidTransactions(transactions) {
    return transactions.every(tx => tx.isValid())
  }
}

export default BlockHelper