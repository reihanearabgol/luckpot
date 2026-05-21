import { useGameStore } from '../store/useGameStore'
import Container from '../components/Container'
import Card from '../components/Card'
import Button from '../components/Button'

function HistoryPage() {
  const history = useGameStore((state) => state.history)
  const currentPlayer = useGameStore((state) => state.currentPlayer)
  const setScreen = useGameStore((state) => state.setScreen)

  return (
    <Container>

      {/* Header */}
      <div className="flex justify-between items-center mb-4 px-1">
        <p className="text-gray-400 text-sm">
          👤 {currentPlayer?.name}
        </p>
        <p className="text-purple-400 text-sm font-semibold">
          ⬡ {currentPlayer?.coins.toLocaleString()} coins
        </p>
      </div>

      {/* Title */}
      <Card className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-white text-2xl font-bold">
              Game History
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              {history.length} game{history.length !== 1 ? 's' : ''} played
            </p>
          </div>
          <span className="text-4xl">📋</span>
        </div>

        {/* Summary stats */}
        {history.length > 0 && (
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-gray-400 text-xs mb-1">
                Total coins wagered
              </p>
              <p className="text-purple-400 font-bold">
                ⬡ {history
                  .reduce((sum, r) => sum + r.pot, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-800 rounded-xl p-3 text-center">
              <p className="text-gray-400 text-xs mb-1">
                Biggest prize
              </p>
              <p className="text-green-400 font-bold">
                ⬡ {Math.max(...history.map((r) => r.prize))
                  .toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </Card>

      {/* Empty state */}
      {history.length === 0 && (
        <Card className="mb-4">
          <div className="text-center py-8">
            <p className="text-5xl mb-4">🎡</p>
            <p className="text-white font-semibold mb-2">
              No games yet
            </p>
            <p className="text-gray-400 text-sm">
              Play your first game to see results here
            </p>
          </div>
        </Card>
      )}

      {/* Results list */}
      {history.length > 0 && (
        <div className="flex flex-col gap-3 mb-4">
          {history.map((result, index) => (
            <Card key={result.timestamp}>

              {/* Result header */}
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="text-gray-400 text-xs uppercase tracking-wider mb-1">
                    Game {history.length - index}
                  </p>
                  <p className="text-white font-bold text-lg">
                    🏆 {result.winnerName}
                  </p>
                </div>
                <p className="text-gray-500 text-xs">
                  {new Date(result.timestamp).toLocaleString()}
                </p>
              </div>

              {/* Result breakdown */}
              <div className="bg-gray-800 rounded-xl p-3 flex flex-col gap-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Total pot</span>
                  <span className="text-white font-medium">
                    ⬡ {result.pot.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Platform fee (10%)
                  </span>
                  <span className="text-red-400 font-medium">
                    − ⬡ {result.fee.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm border-t border-gray-700 pt-2">
                  <span className="text-gray-400">Winner received</span>
                  <span className="text-green-400 font-bold">
                    ⬡ {result.prize.toLocaleString()}
                  </span>
                </div>
              </div>

            </Card>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col gap-3">
        <Button onClick={() => setScreen('create-room')} fullWidth>
          🎡 Play Again
        </Button>
        <Button
          variant="secondary"
          onClick={() => setScreen('login')}
          fullWidth
        >
          ← Back to Login
        </Button>
      </div>

      <p className="text-center text-gray-600 text-xs mt-4">
        ⬡ Demo coins only · No real money involved
      </p>

    </Container>
  )
}

export default HistoryPage