import { useGameStore } from '../store/useGameStore'
import Container from '../components/Container'
import Card from '../components/Card'
import Button from '../components/Button'

function LobbyPage() {
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const room = useGameStore((state) => state.room)
  const players = useGameStore((state) => state.players)
  const addPlayer = useGameStore((state) => state.addPlayer)
  const setPlayerReady = useGameStore((state) => state.setPlayerReady)
  const setScreen = useGameStore((state) => state.setScreen)

  // Derived data
  const allReady = players.length >= 2 && players.every((p) => p.isReady)
  const isCurrentPlayerReady = players.find(
    (p) => p.id === currentPlayer?.id
  )?.isReady

  const isHost = currentPlayer?.id === room?.hostId

  // Simulate a guest joining (for testing only)
  function simulatePlayerJoin() {
    const guest = {
      id: crypto.randomUUID(),
      name: `Guest ${players.length + 1}`,
      coins: 1000,
      isReady: false,
    }
    addPlayer(guest)
  }

  function handleReady() {
    if (currentPlayer) {
      setPlayerReady(currentPlayer.id)
    }
  }

  function handleStartGame() {
    setScreen('wheel')
  }

  return (
    <Container>

      {/* Room info bar */}
      <div className="flex justify-between items-center mb-4 px-1">
        <p className="text-gray-400 text-sm">
          👤 {currentPlayer?.name}
        </p>
        <p className="text-purple-400 text-sm font-semibold">
          ⬡ {currentPlayer?.coins.toLocaleString()} coins
        </p>
      </div>

      {/* Room info card */}
      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white text-xl font-bold">
              {room?.name}
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Bet: ⬡ {room?.betAmount} per player
            </p>
          </div>
          <div className="text-right">
            <p className="text-gray-400 text-xs">Players</p>
            <p className="text-white text-2xl font-bold">
              {players.length}
            </p>
          </div>
        </div>

        {/* Pot preview */}
        <div className="mt-4 bg-gray-800 rounded-xl p-3 flex justify-between items-center">
          <p className="text-gray-400 text-sm">Total pot</p>
          <p className="text-purple-400 font-bold">
            ⬡ {((room?.betAmount ?? 0) * players.length).toLocaleString()}
          </p>
        </div>
      </Card>

      {/* Player list */}
      <Card className="mb-4">
        <h3 className="text-gray-400 text-sm font-medium mb-3 uppercase tracking-wider">
          Players
        </h3>

        <div className="flex flex-col gap-2">
          {players.map((player) => (
            <div
              key={player.id}
              className="flex justify-between items-center bg-gray-800 rounded-xl px-4 py-3"
            >
              <div className="flex items-center gap-3">
                {/* Avatar circle */}
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-sm font-bold">
                  {player.name[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-white text-sm font-medium">
                    {player.name}
                    {player.id === room?.hostId && (
                      <span className="text-yellow-400 text-xs ml-2">
                        HOST
                      </span>
                    )}
                  </p>
                  <p className="text-gray-500 text-xs">
                    ⬡ {player.coins.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Ready status */}
              <span className={`text-xs font-semibold px-2 py-1 rounded-lg ${
                player.isReady
                  ? 'bg-green-900 text-green-400'
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {player.isReady ? '✓ Ready' : 'Waiting'}
              </span>
            </div>
          ))}
        </div>
      </Card>

      {/* Action buttons */}
      <div className="flex flex-col gap-3">

        {/* Ready button */}
        {!isCurrentPlayerReady && (
          <Button onClick={handleReady} fullWidth>
            ✓ I am Ready
          </Button>
        )}

        {isCurrentPlayerReady && !allReady && (
          <div className="text-center py-3 bg-green-900 rounded-xl">
            <p className="text-green-400 text-sm font-semibold">
              ✓ You are ready — waiting for others
            </p>
          </div>
        )}

        {/* Start game — host only, all ready */}
        {isHost && allReady && (
          <Button onClick={handleStartGame} fullWidth>
            🎡 Start Game
          </Button>
        )}

        {/* Simulate join — testing only */}
        <Button
          variant="secondary"
          fullWidth
          onClick={simulatePlayerJoin}
        >
          + Simulate Player Join
        </Button>

        {/* Back */}
        <Button
          variant="secondary"
          fullWidth
          onClick={() => setScreen('create-room')}
        >
          ← Back
        </Button>

      </div>

      <p className="text-center text-gray-600 text-xs mt-4">
        ⬡ Demo coins only · No real money involved
      </p>

    </Container>
  )
}

export default LobbyPage