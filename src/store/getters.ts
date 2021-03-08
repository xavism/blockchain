import Wallet from '@/entities/wallet'
import { GetterTree } from 'vuex'
import { State } from './state'
import { GetterTypes } from './types/getter-types'

export type Getters = {
  [GetterTypes.LAST_WALLET](state: State): Wallet
}

export const getters: GetterTree<State, State> & Getters = {
  [GetterTypes.LAST_WALLET]: state => {
    return state.wallets[state.wallets.length - 1]
  }
}
