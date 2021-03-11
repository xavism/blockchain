const Wallet = ({ wallet }) => {
  return (
    <div className="cursor-pointer">
      <span 
      style={{backgroundColor: wallet.color, color: wallet.textColor}}
      className="py-1 px-2 rounded-xl">
        {wallet.name}
      </span>
    </div>
  )
}

export default Wallet