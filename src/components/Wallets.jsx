import Wallet from './Wallet'
import { useDispatch, useSelector } from "react-redux"
import { createWallet } from "../redux/wallets/actions"
const Wallets = () => {
  const dispatch = useDispatch()
  const { wallets } = useSelector(state => state.wallets)
  // renders
  const renderWallets = () => {
    if (!wallets.length) return <p className="py-1">There are no wallets yet</p>
    return wallets.map(wallet => renderWalletPill(wallet))
  }

  const renderWalletPill = (wallet) => {
    return (
      <div className="m-1 cursor-pointer flex items-center" key={wallet.publicKey}>
        <Wallet wallet={wallet} withAmount={true}/>
      </div>
    )
  }

  // handlers
  const handleCreateWallet = () => {
    dispatch(createWallet())
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-xl flex-1">Wallets</h2>
        <button onClick={handleCreateWallet} className="py-1 px-4 rounded bg-gray-500 text-white focus:outline-none hover:bg-gray-600">Create</button>
      </div>
      <div className="p-4 rounded bg-gray-100 w-full">
        <div className="flex flex-wrap">
        { renderWallets() }
        </div>
      </div>
    </div>
  )
}

export default Wallets