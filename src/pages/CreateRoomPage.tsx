import { useState } from 'react'
import { useGameStore } from '../store/useGameStore'
import Container from '../components/Container'
import Card from '../components/Card'
import Button from '../components/Button'

function CreateRoomPage() {
  const [roomName, setRoomName] = useState('')
  const [betAmount, setBetAmount] = useState(100)
  const [error, setError] = useState('')

  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const setRoom      = useGameStore((state) => state.setRoom)
  const addPlayer    = useGameStore((state) => state.addPlayer)
  const resetGame    = useGameStore((state) => state.resetGame)
  const setScreen    = useGameStore((state) => state.setScreen)

  function handleCreate() {
    if (roomName.trim() === '') {
      setError('Please enter a room name')
      return
    }
    if (betAmount < 10) {
      setError('Minimum bet is ⬡ 10 coins')
      return
    }
    if (currentPlayer && betAmount > currentPlayer.coins) {
      setError('You do not have enough coins')
      return
    }

    const room = {
      id: crypto.randomUUID(),
      name: roomName.trim(),
      betAmount: betAmount,
      maxPlayers: 8,
      hostId: currentPlayer!.id,
    }

    // Clear old players first — fixes duplicate bug
    resetGame()
    setRoom(room)
    addPlayer({ ...currentPlayer!, isReady: false })
    setScreen('lobby')
  }

  return (
    <Container>
      <div className="flex justify-between items-center mb-4 px-1">
        <p className="text-gray-400 text-sm">
          👤 {currentPlayer?.name}
        </p>
        <p className="text-purple-400 text-sm font-semibold">
          ⬡ {currentPlayer?.coins.toLocaleString()} coins
        </p>
      </div>

      <Card>
        <div className="mb-6">
          <h2 className="text-white text-2xl font-bold">Create Room</h2>
          <p className="text-gray-400 text-sm mt-1">Set up your game room</p>
        </div>

        <div className="mb-4">
          <label className="text-gray-300 text-sm font-medium block mb-2">
            Room name
          </label>
          <input
            type="text"
            value={roomName}
            onChange={(e) => { setRoomName(e.target.value); setError('') }}
            placeholder="e.g. Friday Night Game"
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition-colors"
            maxLength={30}
          />
        </div>

        <div className="mb-6">
          <label className="text-gray-300 text-sm font-medium block mb-2">
            Bet amount (demo coins)
          </label>
          <input
            type="number"
            value={betAmount}
            onChange={(e) => { setBetAmount(Number(e.target.value)); setError('') }}
            min={10}
            max={currentPlayer?.coins}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition-colors"
          />
          <p className="text-gray-500 text-xs mt-2">
            Minimum ⬡ 10 · Your balance: ⬡ {currentPlayer?.coins.toLocaleString()}
          </p>
        </div>

        {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

        <Button onClick={handleCreate} fullWidth>
          Create Room →
        </Button>
        <div className="mt-3">
          <Button variant="secondary" fullWidth onClick={() => setScreen('login')}>
            ← Back
          </Button>
        </div>
      </Card>

      <p className="text-center text-gray-600 text-xs mt-4">
        ⬡ Demo coins only · No real money involved
      </p>
    </Container>
  )
}

export default CreateRoomPage