import { useDispatch, useSelector } from "react-redux"
import { createWallet } from "../redux/wallets/actions"

const Wallets = () => {
  const dispatch = useDispatch()
  const { wallets } = useSelector(state => state.wallets)

  const renderWalletPill = (wallet) => {
    return (
      <div className="mb-2 mx-1 cursor-pointer" key={wallet.publicKey}>
        <span 
        style={{backgroundColor: wallet.color, color: wallet.textColor}}
        className="py-1 px-2 rounded-xl">
          {wallet.name}
        </span>
      </div>
    )
  }

  // renders
  const renderWallets = () => {
    if (!wallets.length) return <p className="py-2">There are no wallets yet</p>
    return wallets.map(wallet => renderWalletPill(wallet))
  }

  const handleCreateWallet = () => {
    dispatch(createWallet())
  }

  return (
    <div className="mb-4">
      <h2 className="font-bold text-xl mb-4">Wallets</h2>
      <div className="p-4 rounded bg-gray-100 w-full">
        <div className="flex flex-wrap mb-4">
        { renderWallets() }
        </div>
        <button onClick={handleCreateWallet} className="w-full py-1 px-4 rounded bg-gray-500 text-white focus:outline-none hover:bg-gray-600">Create</button>
      </div>
    </div>
  )
}

export default Wallets