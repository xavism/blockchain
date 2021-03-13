import Wallet from './Wallet'
const Transactions = ({transactions}) => {

  // renders
  const renderTransactions = () => {
    return transactions.map(tx => {
      const { fromAddress, toAddress } = tx
      return (<div className="flex items-center my-2" key={tx.id}>
        <Wallet wallet={fromAddress} />
        <div className="mx-2">sends { tx.amount } to </div>
        <Wallet wallet={toAddress} />
      </div>)
    })
  }

  return (
    <div className="px-2 py-2">
      { renderTransactions() }
    </div>)
}

export default Transactions