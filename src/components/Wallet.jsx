import { useCallback } from 'react'
import { useSelector } from 'react-redux'
import ChainHelper from './../helpers/chain.helper'

const Wallet = ({ wallet, withAmount = false }) => {
  const { chain } = useSelector(state => state.blockchain)

const getBalance = useCallback(() => ChainHelper.getBalanceOfAddress(ChainHelper.getValidChain(chain), wallet.publicKey), [wallet, chain])

  return (
    <div className="cursor-pointer">
      { !wallet ?  <span className="py-1 px-2 rounded-md bg-gray-500 text-white">Blockchain</span>
        :
      <span 
      style={{backgroundColor: wallet.color, color: wallet.textColor}}
      className="rounded-md flex items-center">
        <div className="px-2">
          {wallet.name}
        </div>
        { withAmount ?
          <div className="px-2 text-black bg-white rounded-r-md -m-1">
            {getBalance()}
          </div>
          :
          null
        }
      </span>
    }
    </div>
  )
}

export default Wallet