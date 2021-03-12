const Wallet = ({ wallet }) => {
  return (
    <div className="cursor-pointer">
      { !wallet ?  <span className="py-1 px-2 rounded-xl bg-gray-500 text-white">Blockchain</span>
        :
      <span 
      style={{backgroundColor: wallet.color, color: wallet.textColor}}
      className="py-1 px-2 rounded-xl">
        {wallet.name}
      </span>
    }
    </div>
  )
}

export default Wallet