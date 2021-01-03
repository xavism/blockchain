import { SHA256 } from 'crypto-js'
import Transaction from './transaction'

export default class Block {
  private timestamp: Date
  private transactions: Transaction[]
  private previousHash: string
  private nonce: number = 0
  private hash: string

  // All the info need to create a block in our chain, in this step we change data with a transactions array per each block
  constructor(transactions: Transaction[], previousHash?: string) {
    this.timestamp = new Date()
    this.transactions = transactions
    if (previousHash) this.previousHash = previousHash
    this.hash = this.calculateHash()
  }

  // Method that calculates the hash of the block
  calculateHash(): string {
    return SHA256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString()
  }
  // Getting the hash with the amount of 0 based on the difficulty
  mineBlock(difficulty: number) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
      this.nonce++
      this.hash = this.calculateHash()
    }

    console.log(`BLOCK MINED: ${this.hash} 💰`)
  }

  hasValidTransactions(): boolean {
    return this.transactions.every(tx => tx.isValid())
  }

// GETTERS

  getHash(): string {
    return this.hash
  }

  getTransactions(): Transaction[] {
    return this.transactions
  }

  getPreviousHash(): string {
    return this.previousHash
  }
}