import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import TransactionHelper from "../helpers/transaction.helper"
import { addTransaction } from "../redux/blockchain/actions"

const CreateTransactions = () => {
  const dispatch = useDispatch()
  //local state
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [amount, setAmount] = useState(0)

  // redux
  const { wallets } = useSelector(state => state.wallets)

  //handlers
  const handleInput = (setter, { target: { value }}) => {
    setter(value)
  }
  const handleAddTransaction = () => {
    let fromTx = wallets.find(wallet => wallet.publicKey === from)
    let toTx = wallets.find(wallet => wallet.publicKey === to)
    let tx = TransactionHelper.createTx(fromTx, toTx, amount)
    TransactionHelper.signTx(tx, fromTx)
    dispatch(addTransaction(tx))
    clean()
  }

  //methods
  const clean = () => {
    setFrom('')
    setTo('')
    setAmount(0)
  }

  //renders
  const renderSelectOptions = () => {
    return wallets.map(({publicKey, name })=> (<option key={publicKey} value={publicKey}>{name}</option>))
  }

  return (
    <div className="mb-4">
      <h2 className="font-bold text-xl mb-4">Transactions</h2>
      <div className="p-4 rounded bg-gray-100 w-full">
        <div className="flex mb-2">
          <label className="font-bold mr-2" htmlFor="from">From Address: </label>
          <select className="flex-1" name="from" id="from" value={from} onChange={(e) => handleInput(setFrom, e)}>
            <option>Select an addr</option>
            {renderSelectOptions() } 
          </select>
        </div>
        <div className="flex mb-2">
          <label className="font-bold mr-2" htmlFor="to">To Address: </label>
          <select className="flex-1" name="to" id="to" value={to} onChange={(e) => handleInput(setTo, e)}>
            <option>Select an addr</option>
            {renderSelectOptions() } 
          </select>
        </div>
        <div className="flex mb-2">
          <label className="font-bold mr-2" htmlFor="from">Amount: </label>
          <input className="flex-1" value={amount} onChange={(e) => handleInput(setAmount, e)} type="number" step="10" min="0"/>
        </div>
        <button
          disabled={!amount || from === '' || to === ''} 
          onClick={handleAddTransaction} className="w-full py-1 px-4 rounded bg-gray-500 text-white focus:outline-none hover:bg-gray-600 disabled:bg-gray-200 disabled:cursor-not-allowed">Create</button>
      </div>
    </div>
  )
}

export default CreateTransactions