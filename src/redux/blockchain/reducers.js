import BlockHelper from "../../helpers/block.helper"
import TransactionHelper from "../../helpers/transaction.helper"
import { ADD_TRANSACTION, CHANGE_DIFFICULTY, CHANGE_REWARD, MINE, UPDATE_BLOCK } from "./types"
const INITIAL_REWARD= 100
const initialState = {
  chain: [BlockHelper.createGenesisBlock(INITIAL_REWARD)],
  difficulty: 2,
  pendingTransactions: [],
  miningReward: INITIAL_REWARD
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_DIFFICULTY: 
      return {
        ...state,
        difficulty: action.payload
      }
    case CHANGE_REWARD: 
      return {
        ...state,
        miningReward: action.payload
      }
    case UPDATE_BLOCK:
      let chain = [...state.chain]
      chain.splice(action.payload.index, 1, action.payload.block)
      return {
        ...state,
        chain
      }
    case ADD_TRANSACTION: 
      let { payload: tx } = action
      if (
        !tx.fromAddress.publicKey ||
        !tx.toAddress.privateKey
      )
        throw new Error('Transaction must include from and to address')

      if (!TransactionHelper.isValid(tx))
        throw new Error('Cannot add invalid transaction to chain')
      return {
        ...state,
        pendingTransactions: [...state.pendingTransactions, tx]
      }
    case MINE:
      return {
        ...state,
        pendingTransactions: [],
        chain: [...state.chain, action.payload]
      }
    default:
      return state
  }
}

export default reducer