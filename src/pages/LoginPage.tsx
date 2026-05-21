import { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import Container from '../components/Container'
import Card from '../components/Card'
import Button from '../components/Button'

function LoginPage() {
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  const setCurrentPlayer = useGameStore((state) => state.setCurrentPlayer)
  const setScreen = useGameStore((state) => state.setScreen)

  function handleEnter() {
    // Validate
    if (name.trim() === '') {
      setError('Please enter your name')
      return
    }
    if (name.trim().length < 2) {
      setError('Name must be at least 2 characters')
      return
    }

    // Create the player
    const player = {
      id: crypto.randomUUID(),
      name: name.trim(),
      coins: 1000,
      isReady: false,
    }

    // Save to store and switch screen
    setCurrentPlayer(player)
    setScreen('create-room')
  }

  return (
    <Container>
      <Card>

        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            🎡 LuckPot
          </h1>
          <p className="text-gray-400 text-sm">
            Virtual coins only · No real money
          </p>
        </div>

        {/* Input */}
        <div className="mb-4">
          <label className="text-gray-300 text-sm font-medium block mb-2">
            Your name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setError('')
            }}
            onKeyDown={(e) => e.key === 'Enter' && handleEnter()}
            placeholder="Enter your name..."
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition-colors"
            maxLength={20}
          />
          {/* Error message */}
          {error && (
            <p className="text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        {/* Button */}
        <Button onClick={handleEnter} fullWidth>
          Enter Game →
        </Button>

        {/* Demo coins notice */}
        <p className="text-center text-gray-500 text-xs mt-4">
          You start with ⬡ 1,000 demo coins
        </p>

      </Card>
    </Container>
  )
}

export default LoginPage