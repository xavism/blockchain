import Wallet from './Wallet'
import { useWalletOptions } from './../hooks/wallet.hooks'
import { useDispatch, useSelector } from 'react-redux'
import { updateTransaction } from '../redux/blockchain/actions'
import ColorHelper from '../helpers/color.helper'
import TransactionHelper from '../helpers/transaction.helper'
import ValidationTag from './ValidationTag'
import { useCallback } from 'react'
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

  //methods
  const getColor = (hash) => ColorHelper.intToRGB(hash.substring(0,10))
  // renders
  const renderTransactions = useCallback(() => {
    return transactions.map((tx, i) => {
      const { fromAddress, toAddress, signature } = tx
      const hash = TransactionHelper.calculateHash(fromAddress ? fromAddress.publicKey : null, toAddress.publicKey, tx.amount)
      return (<div className="flex items-center my-1 md:my-2 flex-wrap px-1 py-1 bg-gray-200 rounded justify-between" key={tx.id}>
        { fromAddress ?
        <select name="from" id="from" value={fromAddress.publicKey} onChange={(e) => handleSelect(ADDRESS_TYPE.FROM, i, tx, e)}>
            { selectOptions } 
        </select>
        :
        <Wallet wallet={fromAddress} />
        }
        <div className="mx-2 hidden md:block">sends</div>
        <div>
          <input className="w-14 md:w-28" type="number" min="0" value={tx.amount} onChange={(e) => handleAmount(i, tx, e)}/>
        </div>
        <div className="mx-2 hidden md:block">to</div>
        <select name="from" id="from" value={toAddress.publicKey} onChange={(e) => handleSelect(ADDRESS_TYPE.TO, i, tx, e)}>
            { selectOptions } 
        </select>
        <div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="mx-2 font-bold">Tx Hash: </span>
            <span className="rounded px-2 text-white" style={{backgroundColor: getColor(hash.substring(0,10))}} >{hash.substring(0,10)}...</span>
        </div>
        {
          signature !== '' ?
          (<div className="whitespace-nowrap overflow-hidden overflow-ellipsis">
            <span className="mx-2 font-bold">Sig: </span>
            <span className="rounded px-2 text-white" style={{backgroundColor: getColor(signature.substring(0,10))}} >{signature.substring(0,10)}...</span>
          </div>)
          :
          null
        }
        <div className="flex-1 flex justify-end">
          { <ValidationTag valid={TransactionHelper.isValid(tx)} /> }
        </div>
      </div>)
    })
  }, [transactions, selectOptions])

  return (
    <div className="">
      { renderTransactions() }
    </div>)
}

export default EditableTransactions