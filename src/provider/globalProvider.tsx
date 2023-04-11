// React
import { createContext, useContext, useState } from 'react'

interface GlobalInterface {
  // Manage Wallet connection status
  isWalletConnected: boolean
  setWalletStatus?: React.ComponentState
}

const defaultGlobalState = {
  isWalletConnected: false,
}

const GlobalCtx = createContext<GlobalInterface>(defaultGlobalState)

const GlobalProvider = ({ children }: { children: any }) => {
  const [isWalletConnected, setWalletStatus] = useState(
    defaultGlobalState.isWalletConnected
  )

  return (
    <GlobalCtx.Provider
      value={{
        isWalletConnected,
        setWalletStatus,
      }}
    >
      {children}
    </GlobalCtx.Provider>
  )
}

// Get global props
export const useGlobalContext = () => useContext(GlobalCtx)

export default GlobalProvider
