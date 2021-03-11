//import ChainHelper from './../helpers/chain.helper'
const worker = () => {
  onmessage = (e) => {
    const data = e.data
    console.log('Worker: Message received from main script');
    const ChainHelper = require('./../helpers/chain.helper')
    let block = ChainHelper.mine(data.latestBlockHash, data.pendingTx, data.miningReward, data.difficulty, data.miningRewardAddress)
    postMessage(block);
  }
}

export default worker

// onmessage = (e) => {
//   const data = e.data
//   console.log('Worker: Message received from main script');
//   let block = mine(data.latestBlockHash, data.pendingTx, data.miningReward, data.difficulty, data.miningRewardAddress)
//   postMessage(block);
// }

// const mine = (latestBlockHash, pendingTx, miningReward, difficulty, minerAddress) => {
//   // Adding the miner Tx to the pending ones to get the reward
//   const rewardTX = createTx(null, minerAddress, miningReward)
//   pendingTx.push(rewardTX)
//   // Creating a block containing the pending transactions
//   const block = createBlock(new Date(), pendingTx, latestBlockHash)
//   mineBlock(block, difficulty)
//   return block
// }

// const createTx = (from, to, amount) => {
//   return {
//     id: Math.random().toString(36).substr(2, 9),
//     fromAddress: from,
//     toAddress: to,
//     amount,
//     signature: ''
//   }
// }

// const createBlock = (timestamp, transactions, previousHash = '') => {
//   return {
//     timestamp,
//     transactions,
//     previousHash,
//     nonce: 0,
//     hash: this.calculateHash(timestamp, transactions, previousHash, 0)
//   }
// }

// const mineBlock = (block, difficulty) => {
//   let { timestamp, transactions, previousHash } = block
//   while (block.hash.substring(0, difficulty) !== Array(difficulty).fill(0).join('')) {
//     block.nonce++
//     block.hash = this.calculateHash(timestamp, transactions, previousHash, block.nonce)
//   }
// }