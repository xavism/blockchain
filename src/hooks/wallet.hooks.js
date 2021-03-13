export const useWalletOptions = (wallets) => {
  return wallets.map(({publicKey, name })=> (<option key={publicKey} value={publicKey}>{name}</option>))
}