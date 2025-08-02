import { useState } from 'react'
import { useLocation } from 'wouter'

interface FormData {
  fullname: string
  email: string
  username: string
  password: string
  confirmPassword: string
}

const RegisterPage = () => {
  const [, navigate] = useLocation()

  const [formData, setFormData] = useState<FormData>({
    fullname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState<string>('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = () => {
    const { fullname, email, username, password, confirmPassword } = formData

    if (!fullname || !email || !username || !password || !confirmPassword) {
      setError('Por favor completa todos los campos.')
      return
    }

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres.')
      return
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden.')
      return
    }

    // Simular registro exitoso
    console.log('📝 Usuario registrado:', formData)
    navigate('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#0A0A0A] text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Crear Cuenta</h2>
      <p className="mb-4 text-gray-300 text-center max-w-sm">
        Únete a la comunidad de talentos
      </p>

      {error && <p className="text-red-500 mb-4 max-w-sm text-center">{error}</p>}

      <div className="w-full max-w-md space-y-4">
        <input
          type="text"
          name="fullname"
          value={formData.fullname}
          onChange={handleChange}
          placeholder="Nombre completo"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Correo electrónico"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Nombre de usuario"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Contraseña (mínimo 8 caracteres)"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirmar contraseña"
          className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg mt-4 transition-colors duration-300"
        >
          Crear Cuenta
        </button>

        <p className="text-center text-sm mt-4 text-gray-400">
          ¿Ya tienes cuenta?{' '}
          <a href="/login" className="text-indigo-400 hover:underline">
            Iniciar Sesión
          </a>
        </p>
      </div>
    </div>
  )
}

export default RegisterPage
