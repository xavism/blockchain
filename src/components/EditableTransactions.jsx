import Wallet from './Wallet'
import { useWalletOptions } from './../hooks/wallet.hooks'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransaction } from '../redux/blockchain/actions'
import ColorHelper from '../helpers/color.helper'
import TransactionHelper from '../helpers/transaction.helper'
import ValidationTag from './ValidationTag'
const EditableTransactions = ({transactions, blockIndex}) => {
  const ADDRESS_TYPE = {
    FROM: 'fromAddress',
    TO: 'toAddress'
  }
  const dispatch = useDispatch()
  const { wallets } = useSelector(state => state.wallets)
  const selectOptions = useWalletOptions(wallets)
  // handlers
  const handleSelect = (property, index, tx, { target: { value }}) => {
    let newTX = {...tx}
    const getWallet = (value) => wallets.find(w => w.publicKey === value)
    newTX[property] = getWallet(value)
    dispatch(updateTransaction(blockIndex, index, newTX))
  }

  const handleAmount = (index, tx, {target: { value }}) => {
    const newTx = {
      ...tx,
      amount: parseFloat(value)
    }
    dispatch(updateTransaction(blockIndex, index, newTx))
  }
  // renders
  const renderTransactions = () => {
    return transactions.map((tx, i) => {
      const { fromAddress, toAddress, signature } = tx
      const hash = TransactionHelper.calculateHash(fromAddress ? fromAddress.publicKey : null, toAddress.publicKey, tx.amount)
      return (<div className="flex items-center my-2" key={tx.id}>
        { fromAddress ?
        <select name="from" id="from" value={fromAddress.publicKey} onChange={(e) => handleSelect(ADDRESS_TYPE.FROM, i, tx, e)}>
            { selectOptions } 
        </select>
        :
        <Wallet wallet={fromAddress} />
        }
        <div className="mx-2">sends</div>
        <div>
          <input className="w-28" type="number" min="0" value={tx.amount} onChange={(e) => handleAmount(i, tx, e)}/>
        </div>
        <div className="mx-2">to</div>
        <select name="from" id="from" value={toAddress.publicKey} onChange={(e) => handleSelect(ADDRESS_TYPE.TO, i, tx, e)}>
            { selectOptions } 
        </select>
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="mx-2 font-bold">Tx Hash: </span>
            <span className="rounded px-2 text-white" style={{backgroundColor: ColorHelper.intToRGB(hash.substring(0,10))}} >{hash.substring(0,10)}...</span>
        </div>
        {
          signature !== '' ?
          (<div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="mx-2 font-bold">Signature: </span>
            <span className="rounded px-2 text-white" style={{backgroundColor: ColorHelper.intToRGB(signature.substring(0,10))}} >{signature.substring(0,10)}...</span>
          </div>)
          :
          null
        }
        <div className="mx-2">
          { <ValidationTag valid={TransactionHelper.isValid(tx)} /> }
        </div>
      </div>)
    })
  }

  return (
    <div className="px-2 py-2">
      { renderTransactions() }
    </div>)
}

export default EditableTransactions