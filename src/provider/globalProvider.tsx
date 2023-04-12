// React
import Lenis from '@studio-freight/lenis'
import { createContext, useContext, useState } from 'react'

interface GlobalInterface {
  // Manage Sound enabled
  isSoundEnabled: boolean
  setSoundStatus?: React.ComponentState
  // Manage scroll state
  scrollLenis: Lenis | null
  setScrollLenis?: React.ComponentState
}

const defaultGlobalState = {
  isSoundEnabled: false,
  scrollLenis: null,
}

const GlobalCtx = createContext<GlobalInterface>(defaultGlobalState)

const GlobalProvider = ({ children }: { children: any }) => {
  const [isSoundEnabled, setSoundStatus] = useState(
    defaultGlobalState.isSoundEnabled
  )
  const [scrollLenis, setScrollLenis] = useState(defaultGlobalState.scrollLenis)

  return (
    <GlobalCtx.Provider
      value={{
        isSoundEnabled,
        setSoundStatus,
        scrollLenis,
        setScrollLenis,
      }}
    >
      {children}
    </GlobalCtx.Provider>
  )
}

// Get global props
export const useGlobalContext = () => useContext(GlobalCtx)

export default GlobalProvider
