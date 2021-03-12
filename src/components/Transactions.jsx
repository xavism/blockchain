import Wallet from './Wallet'
import { useSelector } from 'react-redux'
const Transactions = ({transactions}) => {

  const { wallets } = useSelector(state => state.wallets)

  // getter
  const getWallet = (wallet) => !wallet ? null : wallets.find(w => w.publicKey === wallet.publicKey)

  return (
    <div className="px-2 py-2">
      { transactions.map(tx => {
        const from = getWallet(tx.fromAddress)
        const to = getWallet(tx.toAddress)
        return (<div className="flex items-center my-2" key={tx.id}>
          <Wallet wallet={from} />
          <div className="mx-2">sends { tx.amount } to </div>
          <Wallet wallet={to} />
        </div>)
      }) }
    </div>)
}

export default Transactions