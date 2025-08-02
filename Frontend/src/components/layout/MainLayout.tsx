import { useAccount } from 'wagmi'
import { WalletConnector } from '../ui/WalletConnector'
import { Sidebar } from './Sidebar'

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const { isConnected } = useAccount()
  
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>TalentHub</h1>
        <WalletConnector />
      </header>
      
      {isConnected ? (
        <div className="app-content">
          <Sidebar />
          <main className="main-content">{children}</main>
        </div>
      ) : (
        <div className="connect-wallet-prompt">
          <p>Conecta tu wallet para acceder a TalentHub</p>
        </div>
      )}
    </div>
  )
}