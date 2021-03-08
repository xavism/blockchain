import Blockchain from '@/entities/blockchain'
import Wallet from '@/entities/wallet'

export const state = {
  blockchain: new Blockchain() as Blockchain,
  wallets: [] as Wallet[]
}

export type State = typeof state
