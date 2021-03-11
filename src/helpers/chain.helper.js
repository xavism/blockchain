import BlockHelper from "./block.helper"
import TransactionHelper from "./transaction.helper"

class ChainHelper {
  static mine(latestBlockHash, pendingTx, miningReward, difficulty, miningRewardAddress) {
    // Adding the miner Tx to the pending ones to get the reward
    const rewardTX = TransactionHelper.createTx(null, miningRewardAddress, miningReward)
    pendingTx.push(rewardTX)
    // Creating a block containing the pending transactions
    const block = BlockHelper.createBlock(new Date(), pendingTx, latestBlockHash)
    BlockHelper.mineBlock(block, difficulty)
    return block
  }

  static getLatestBlock(chain) {
    return chain[chain.length - 1]
  }

}

export default ChainHelper