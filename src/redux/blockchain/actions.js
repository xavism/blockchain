import { ADD_TRANSACTION, CHANGE_DIFFICULTY, CHANGE_REWARD, MINE, SET_MINING, UPDATE_BLOCK, UPDATE_TX } from "./types"

export const changeDifficulty = (difficulty) => {
  return {
    type: CHANGE_DIFFICULTY,
    payload: difficulty
  }
}

export const changeReward = (reward) => {
  return {
    type: CHANGE_REWARD,
    payload: reward
  }
}

export const updateBlock = (index, block) => {
  return {
    type: UPDATE_BLOCK,
    payload: {
      index,
      block
    }
  }
}

export const addTransaction = (tx) => {
  return {
    type: ADD_TRANSACTION,
    payload: tx
  }
}

export const updateTransaction = (blockIndex, txIndex, tx) => {
  return {
    type: UPDATE_TX,
    payload: {
      blockIndex,
      txIndex,
      tx
    }
  }
}

export const mine = (block) => {
  return {
    type: MINE,
    payload: block
  }
}

export const setMining = (status) => {
  return {
    type: SET_MINING,
    payload: status
  }
}