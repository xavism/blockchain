import { MutationTypes } from './types/mutation-types'
import { MutationTree } from 'vuex'
import { State } from './state'
import Wallet from '@/entities/wallet'
import Transaction from '@/entities/transaction'

export type Mutations<S = State> = {
  [MutationTypes.CREATE_WALLET](state: S, name: string): void
}

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.CREATE_WALLET](state, name: string) {
    state.wallets.push(new Wallet(name))
  },
  [MutationTypes.CREATE_TRANSACTION](state, transaction: Transaction) {
    state.blockchain.addTransaction(transaction)
  },
  [MutationTypes.MINE_PENDING_TRANSACTIONS](state, miner: Wallet) {
    state.blockchain.minePendingTransactions(miner)
  }
}
