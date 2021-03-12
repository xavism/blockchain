import WalletHelper from "../../helpers/wallet.helper";
import { ADD_WALLET } from "./types";

const initialState = {
  wallets: [WalletHelper.getSatoshi(), WalletHelper.createRandomWallet(), WalletHelper.createRandomWallet()]
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WALLET:
      let wallet = WalletHelper.createRandomWallet()
      return {
        ...state,
        wallets: [...state.wallets, wallet]
      }
    default:
      return state
  }
}

export default reducer