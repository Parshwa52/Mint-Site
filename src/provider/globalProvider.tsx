// React
import Lenis from '@studio-freight/lenis'
import { createContext, useContext, useState } from 'react'

interface GlobalInterface {
  // Manage Sound enabled
  isSoundEnabled: boolean
  setSoundStatus?: React.ComponentState
  // sound array
  soundsArray: any[]
  // Manage scroll state
  scrollLenis: Lenis | null
  setScrollLenis?: React.ComponentState
}

const defaultGlobalState = {
  isSoundEnabled: false,
  scrollLenis: null,
  soundsArray: [],
}

const GlobalCtx = createContext<GlobalInterface>(defaultGlobalState)

const GlobalProvider = ({ children }: { children: any }) => {
  const [isSoundEnabled, setSoundStatus] = useState(
    defaultGlobalState.isSoundEnabled
  )
  const [scrollLenis, setScrollLenis] = useState(defaultGlobalState.scrollLenis)
  const soundsArray = defaultGlobalState.soundsArray

  return (
    <GlobalCtx.Provider
      value={{
        isSoundEnabled,
        setSoundStatus,
        soundsArray,
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
