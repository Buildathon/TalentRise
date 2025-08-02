import { useAccount } from 'wagmi'
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Loader } from '../ui/Loader'

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { isConnected, isConnecting } = useAccount()
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (!isConnected && !isConnecting && location.pathname !== '/login') {
      navigate('/login')
    }
  }, [isConnected, isConnecting, location])

  if (isConnecting) return <Loader fullPage />

  return <>{children}</>
}