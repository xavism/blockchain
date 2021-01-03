const sha256 = require('crypto-js/sha256')

class Block {
  // All the info need to create a block in our chain
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index
    this.timestamp = timestamp
    this.data = data
    this.previousHash = previousHash
    this.hash = this.calculateHash()
  }

  // Method that calculates the hash of the block
  calculateHash() {
    return sha256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString()
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()]
  }

  // Every blockchain needs a genesis block, it is the first block of the blockchain
  createGenesisBlock() {
    return new Block(0, new Date().toLocaleString(), 'Genesis Block', 'Genesis Hash')
  }

  // Get the latest block of the chain
  getLatestBlock() {
    return this.chain[this.chain.length - 1]
  }

  // add a new block
  addBlock(block) {
    // You need to put information that refeers the latests block in order to be validated in the chain
    block.previousHash = this.getLatestBlock().hash
    // the info of the current block has changed, so its hash should change too, the hash has to be recalculated
    block.hash = block.calculateHash()
    // We add the new block. In more complex blockchains, more checks are needed in order to add a block, but is it perfect for our example
    this.chain.push(block)
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
xaviCoin.addBlock(new Block(1, new Date('03/01/2021 05:04:25').toLocaleString(), { amount: 4 }))
xaviCoin.addBlock(new Block(2, new Date('03/01/2021 05:04:30').toLocaleString(), { amount: 10 }))
console.log('Is blockchain valid?', xaviCoin.isChainValid())
// true 
// Now we are doing bad things, trying to change the blockchain to get 4000 coins instead of 4
xaviCoin.chain[1].data = { amount: 1000 }
//Now the blochain is not valid
console.log('Is blockchain valid?', xaviCoin.isChainValid())
// true

// Ok, ease, Lets recalculate the hash, no one will notice the change
xaviCoin.chain[1].hash = xaviCoin.chain[1].calculateHash()
console.log('Is blockchain valid?', xaviCoin.isChainValid())
// false

// What? Why is this happening, remember that the block information hash is also stored in the next block, so it is failing. 

// If we restore the chain:
xaviCoin.chain[1].data = { amount: 4 }
xaviCoin.chain[1].hash = xaviCoin.chain[1].calculateHash()
console.log('Is blockchain valid?', xaviCoin.isChainValid())

console.log(JSON.stringify(xaviCoin, null, 4))