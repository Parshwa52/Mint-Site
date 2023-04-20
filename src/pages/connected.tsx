import ThreeJSLoading from '@/components/threeJSLoading'
import VideoScreen from '@/components/videoScreen'
import { useAccount } from 'wagmi'

const Connect = () => {
  const { address, isConnecting, isConnected, isDisconnected } = useAccount()

  if (isConnecting) return <ThreeJSLoading />
  else if (isConnected) return <VideoScreen />
  else return <div>Please connect to your wallet to access this page.</div>
}

export default Connect
