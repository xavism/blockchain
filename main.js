const sha256 = require('crypto-js/sha256')
class Transaction {
  constructor(fromAddress, toAddress, amount) {
    this.fromAddress = fromAddress
    this.toAddress = toAddress
    this.amount = amount
  }
}
class Block {
  // All the info need to create a block in our chain, in this step we change data with a transactions array per each block
  constructor(timestamp, transactions, previousHash = '') {
    this.timestamp = timestamp
    this.transactions = transactions
    this.previousHash = previousHash
    this.hash = this.calculateHash()
    this.nonce = 0
  }

  // Method that calculates the hash of the block
  calculateHash() {
    return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash + this.nonce).toString()
  }
  // Getting the hash with the amount of 0 based on the difficulty
  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
      this.nonce++
      this.hash = this.calculateHash()
    }

    console.log(`BLOCK MINED: ${this.hash} 💰`)
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
    return new Block(new Date().toLocaleString(), 'Genesis Block', 'Genesis Hash')
  }

  // Get the latest block of the chain
  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // We mine Pending transactions to add it to the chain
  minePendingTransactions(miningRewardAddress) {
    // Creating a block containing the pending transactions
    let block = new Block(new Date().toLocaleString(), this.pendingTransactions)
    block.mineBlock(this.difficulty)
    console.log('Block successfully mined!')
    this.chain.push(block)
    // Cleaning the transactions that have been added to the chain but adding the reward to the miner
    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward)
    ]
  }

  createTransaction(transaction) {
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
      // ensure that the hash info of the current block is ok and hasn't been modified
      let currentBlockCheck = block.hash === block.calculateHash()
      // checking that the prevous block information is ok
      let previousBlockCheck = block.previousHash === this.chain[index - 1].calculateHash()
      return currentBlockCheck && previousBlockCheck
    })
  }
}

let xaviCoin = new Blockchain()
xaviCoin.createTransaction(new Transaction('Alfa', 'Beta', 100))
xaviCoin.createTransaction(new Transaction('Beta', 'Alfa', 50))

console.log('\nStarting the miner.⛏️..')
xaviCoin.minePendingTransactions('Charly')

console.log(`\nBalance of Charly (the miner⛏️) is ${xaviCoin.getBalanceOfAddress('Charly')}`)

console.log('\nStarting the miner⛏️...')
xaviCoin.minePendingTransactions('Charly')

console.log(`\nBalance of Charly (the miner⛏️) is ${xaviCoin.getBalanceOfAddress('Charly')}`)
