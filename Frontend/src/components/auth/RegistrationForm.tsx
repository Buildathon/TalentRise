import { useState } from 'react'
import { useAccount, useContractWrite } from 'wagmi'
import { talentHubContract } from '../../utils/contracts'
import { parseEther } from 'viem'
import { useNavigate } from 'react-router-dom'

type UserType = 'talent' | 'investor'

export const RegistrationForm = () => {
  const [userType, setUserType] = useState<UserType>('talent')
  const [name, setName] = useState('')
  const [bio, setBio] = useState('')
  const [skills, setSkills] = useState('')
  const [stakeAmount, setStakeAmount] = useState('0.1')
  const { address } = useAccount()
  const navigate = useNavigate()

  const { write: registerTalent } = useContractWrite({
    ...talentHubContract,
    functionName: 'registerTalent',
    args: [name, bio, skills.split(',').map(s => s.trim())],
    value: parseEther(stakeAmount),
    onSuccess: () => {
      navigate('/dashboard')
      // Aquí podrías mostrar notificación de éxito
    }
  })

  const { write: registerInvestor } = useContractWrite({
    ...talentHubContract,
    functionName: 'registerInvestor',
    args: [name, bio],
    value: parseEther(stakeAmount),
    onSuccess: () => navigate('/dashboard')
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (userType === 'talent') {
      registerTalent()
    } else {
      registerInvestor()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="registration-form">
      <div className="user-type-selector">
        <button 
          type="button" 
          className={userType === 'talent' ? 'active' : ''}
          onClick={() => setUserType('talent')}
        >
          Soy Talento
        </button>
        <button 
          type="button" 
          className={userType === 'investor' ? 'active' : ''}
          onClick={() => setUserType('investor')}
        >
          Soy Inversor
        </button>
      </div>

      <div className="form-group">
        <label>Nombre completo</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>

      <div className="form-group">
        <label>Breve descripción</label>
        <textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
          required 
          rows={3}
        />
      </div>

      {userType === 'talent' && (
        <div className="form-group">
          <label>Tus habilidades (separadas por comas)</label>
          <input 
            type="text" 
            value={skills} 
            onChange={(e) => setSkills(e.target.value)} 
            placeholder="Ej: React, TypeScript, Diseño UI"
            required
          />
        </div>
      )}

      <div className="form-group">
        <label>Stake inicial (MATIC)</label>
        <input 
          type="number" 
          min="0.1" 
          step="0.1" 
          value={stakeAmount} 
          onChange={(e) => setStakeAmount(e.target.value)} 
          required
        />
        <small>Este stake demuestra tu compromiso con la plataforma</small>
      </div>

      <button 
        type="submit" 
        disabled={!address}
        className="submit-button"
      >
        {address ? 'Completar registro' : 'Conecta tu wallet primero'}
      </button>
    </form>
  )
}