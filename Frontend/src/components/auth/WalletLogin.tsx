import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { MetaMaskConnector, WalletConnectConnector } from 'wagmi/connectors'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const WalletLogin = () => {
  const [loading, setLoading] = useState(false)
  const { address, isConnected } = useAccount()
  const navigate = useNavigate()
  
  const { connect } = useConnect({
    connector: new MetaMaskConnector(),
    onError: () => setLoading(false),
    onSuccess: () => {
      localStorage.setItem('connected', 'true')
      navigate('/dashboard')
    }
  })

  const { disconnect } = useDisconnect({
    onSuccess: () => localStorage.removeItem('connected')
  })

  useEffect(() => {
    const previouslyConnected = localStorage.getItem('connected') === 'true'
    if (previouslyConnected && !isConnected) {
      setLoading(true)
      connect()
    }
  }, [])

  if (isConnected) {
    return (
      <div className="wallet-connected">
        <span>{`${address?.slice(0, 6)}...${address?.slice(-4)}`}</span>
        <button onClick={() => disconnect()} disabled={loading}>
          {loading ? 'Cerrando...' : 'Cerrar sesión'}
        </button>
      </div>
    )
  }

  return (
    <div className="login-options">
      <button 
        onClick={() => {
          setLoading(true)
          connect()
        }}
        disabled={loading}
      >
        {loading ? 'Conectando...' : 'Conectar con MetaMask'}
      </button>
      
      <div className="separator">o</div>
      
      <button 
        onClick={() => {
          setLoading(true)
          connect({ connector: new WalletConnectConnector({ options: { projectId: 'TU_PROJECT_ID' } }) })
        }}
        disabled={loading}
      >
        {loading ? 'Conectando...' : 'Usar WalletConnect'}
      </button>
    </div>
  )
}