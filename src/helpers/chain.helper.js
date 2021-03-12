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

}

export default ChainHelper