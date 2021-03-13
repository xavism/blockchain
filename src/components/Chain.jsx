import { useDispatch, useSelector } from "react-redux"
import { changeDifficulty, changeReward } from "../redux/blockchain/actions"
//import mineWorker from './../workers/mine.worker'
import Block from './Block'
import ValidationTag from './ValidationTag'
import PendingTX from "./PendingTransactions"
import ChainHelper from "../helpers/chain.helper"
const Chain = () => {
  //state
  const { difficulty, miningReward, chain } = useSelector(state => state.blockchain)
  const dispatch = useDispatch()

  //handlers
  const handleDifficulty = ({ target: { value }}) => {
    dispatch(changeDifficulty(parseInt(value === '' ? 0 : value)))
  }
  const handleMiningReward = ({ target: { value }}) => {
    dispatch(changeReward(parseFloat(value === '' ? 0 : value)))
  }

  //renders
  const renderBlocks = () => {
    return chain.map((block, index) => <div className="mb-4" key={block.id}><Block block={block} index={index}></Block></div>)
  }

  return (
    <div>
      <div className="flex items-center mb-4">
        <h1 className="font-bold text-2xl mr-4">Blockchain</h1>
        <ValidationTag valid={ChainHelper.isValidChain(chain)}/>
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <label className="mr-4"htmlFor="difficulty">Difficulty: </label>
          <input className="border border-grey-100 pl-2 w-20" min="0" max="3"  value={difficulty} type="number" onChange={handleDifficulty}/>
        </div>
        <div>
        <label className="mr-4" htmlFor="difficulty">Mining Reward: </label>
          <input className="border border-grey-100 pl-2" value={miningReward} type="number" onChange={handleMiningReward} min="1"/>
        </div>
      </div>
      <div className="mb-4">
        <PendingTX />
      </div>
      <div>
        { renderBlocks() }
      </div>
    </div>
  )
}
export default Chain