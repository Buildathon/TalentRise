import { useState } from 'react'
import { useLocation } from 'wouter'

const LoginPage = () => {
  const [, navigate] = useLocation()

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    const { email, password } = formData
    if (!email || !password) {
      setError('Por favor ingresa correo y contraseña.')
      return
    }
    // Aquí puedes agregar lógica de autenticación real

    console.log('Login con:', formData)
    setError('')
    navigate('/') // Redirigir tras login exitoso
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-[#0A0A0A] text-white">
      <h1 className="text-4xl font-bold mb-2">Iniciar Sesión</h1>
      <p className="text-gray-400 mb-8">Bienvenido de vuelta</p>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <div className="w-full max-w-md space-y-6">
        <label className="block">
          <span className="text-gray-300">Correo Electrónico</span>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <label className="block">
          <span className="text-gray-300">Contraseña</span>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Tu contraseña"
            className="mt-1 block w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 placeholder-gray-500 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>

        <button
          onClick={handleSubmit}
          className="w-full rounded-md bg-indigo-600 py-3 font-semibold hover:bg-indigo-700 transition-colors duration-300"
        >
          Iniciar Sesión
        </button>
      </div>
    </div>
  )
}

export default LoginPage
