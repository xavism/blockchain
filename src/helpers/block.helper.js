import { SHA256 } from 'crypto-js'

class BlockHelper {
  // All the info need to create a block in our chain, in this step we change data with a transactions array per each block

  static createBlock(timestamp, transactions, previousHash = '') {
    return {
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

  static createGenesisBlock() {
    return this.createBlock(new Date().toLocaleDateString(), [], '0')
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