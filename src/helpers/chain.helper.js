import BlockHelper from "./block.helper"
import TransactionHelper from "./transaction.helper"

class ChainHelper {
  static mine(latestBlockHash, pendingTx, miningReward, difficulty, miner) {
    // Adding the miner Tx to the pending ones to get the reward
    const rewardTX = TransactionHelper.createTx(null, miner, miningReward)
    pendingTx.push(rewardTX)
    // Creating a block containing the pending transactions
    const block = BlockHelper.createBlock(new Date().toISOString().split('T')[0], pendingTx, latestBlockHash)
    BlockHelper.mineBlock(block, difficulty)
    return block
  }

  static getLatestBlock(chain) {
    return chain[chain.length - 1]
  }

  static getBalanceOfAddress(chain, address) {
    let balance = 0
    // Looping all blocks
    for (const block of chain) {
      // Looping all transactions inside a block
      for(const tx of block.transactions) {
        // If you are the sender, the total amount have to decrease
        if(tx.fromAddress?.publicKey === address) balance -= parseFloat(tx.amount)
        // If you are the receiver, the total amount have to increase
        if(tx.toAddress?.publicKey === address) balance += parseFloat(tx.amount)
      }
    }

    return balance
  }

  static isValidChain(chain) {
    // Analyzes each block (the genesis shouldn't be analyzed) comparing the store information of the previous block with the current information of the previousblock, recalculating the hash
    return chain.every((block, index) => BlockHelper.isValid(block, chain, index))
  }
}

export default ChainHelper