const sha256 = require('crypto-js/sha256')
const EC = require('elliptic').ec
const ec = new EC('secp256k1')
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }

  calculateHash() {
    return sha256(this.fromAddress + this.toAddress + this.amount).toString()
  }

  signTransaction(signingKey) {
    if (signingKey.getPublic('hex') !== this.fromAddress) throw new Error('You cannot sign transactions for other wallets')

    const hashTx = this.calculateHash()
    const sig = signingKey.sign(hashTx, 'base64')
    this.signature = sig.toDER('hex')
  }

  isValid() {
    if (this.fromAddress === null) return true
    if (!this.signature || this.signature.length === 0) throw new Error('No signature in this transaction')
    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex')
    return publicKey.verify(this.calculateHash(), this.signature)
  }
}
class Block {
  // All the info need to create a block in our chain, in this step we change data with a transactions array per each block
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp
    this.transactions = transactions
    this.previousHash = previousHash
    this.nonce = 0
    this.hash = this.calculateHash()
  }

  // Method that calculates the hash of the block
  calculateHash() {
    return sha256(this.timestamp + JSON.stringify(this.transactions) + this.previousHash + this.nonce).toString()
  }
  // Getting the hash with the amount of 0 based on the difficulty
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
      this.nonce++
      this.hash = this.calculateHash()
    }

    console.log(`BLOCK MINED: ${this.hash} 💰`)
  }

  hasValidTransactions() {
    return this.transactions.every(tx => tx.isValid())
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
    this.difficulty = 2
    // Transactions pending  to be mined
    this.pendingTransactions = []
    // the reward that will be given to the miners
    this.miningReward = 100
  }

  // Every blockchain needs a genesis block, it is the first block of the blockchain
  createGenesisBlock() {
    return new Block(Date.parse("2020-03-01 10:00"), [], '0')
  }

  // Get the latest block of the chain
  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // We mine Pending transactions to add it to the chain
  minePendingTransactions(miningRewardAddress) {
    // Adding the miner Tx to the pending ones to get the reward
    const rewardTX = new Transaction(null, miningRewardAddress, this.miningReward)
    this.pendingTransactions.push(rewardTX)
    // Creating a block containing the pending transactions
    let block = new Block(new Date().toLocaleDateString(), this.pendingTransactions, this.getLatestBlock().hash)
    block.mineBlock(this.difficulty)
    
    console.log('Block successfully mined!')
    this.chain.push(block)
    // Cleaning the transactions that have been added to the chain
    this.pendingTransactions = []
  }

  addTransaction(transaction) {

    if(!transaction.fromAddress || !transaction.toAddress) throw new Error('Transaction must include from and to address')

    if(!transaction.isValid()) throw new Error('Cannot add invalid transaction to chain')

    this.pendingTransactions.push(transaction)
  }

  // To check the total amount of an address, all the chain has to be checked
  getBalanceOfAddress(address) {
    let balance = 0
    // Looping all blocks
    for (const block of this.chain) {
      // Looping all transactions inside a block
      for(const trans of block.transactions) {
        // If you are the sender, the total amount have to decrease
        if(trans.fromAddress === address) balance -= trans.amount
        // If you are the receiver, the total amount have to increase
        if(trans.toAddress === address) balance += trans.amount
      }
    }

    return balance
  }

  // Chacks if the chain is valid
  isChainValid() {
    // Analyzes each block (the genesis shouldn't be analyzed) comparing the store information of the previous block with the current information of the previousblock, recalculating the hash
    return this.chain.every((block, index) => {
      // first block is not evaluated
      if (index === 0) return true
      // ensure all transactions are signed correctly
      if (!block.hasValidTransactions()) return false
      // ensure that the hash info of the current block is ok and hasn't been modified
      if (block.hash !== block.calculateHash()) return false
      // checking that the prevous block information is ok
      if (block.previousHash !== this.chain[index - 1].calculateHash()) return false
      
      return true
    })
  }
}

module.exports.Blockchain = Blockchain
module.exports.Transaction = Transaction