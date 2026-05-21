import { useState, useRef } from 'react'
import { useGameStore } from '../store/useGameStore'
import Container from '../components/Container'
import Card from '../components/Card'
import Button from '../components/Button'
import PlayerBar from '../components/PlayerBar'
import DemoNotice from '../components/DemoNotice'
import { calculatePot, calculateFee, calculatePrize } from '../utils/game'

const COLORS = [
  '#7c3aed', '#2563eb', '#059669',
  '#d97706', '#dc2626', '#db2777',
  '#0891b2', '#65a30d',
]

function WheelPage() {
  const players    = useGameStore((state) => state.players)
  const room       = useGameStore((state) => state.room)
  const addResult  = useGameStore((state) => state.addResult)
  const setScreen  = useGameStore((state) => state.setScreen)
  const resetGame  = useGameStore((state) => state.resetGame)
  const currentPlayer = useGameStore((state) => state.currentPlayer)

  const [phase, setPhase] = useState<'ready' | 'spinning' | 'done'>('ready')
  const [winner, setWinner] = useState<string | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const pot   = calculatePot(room?.betAmount ?? 0, players.length)
  const fee   = calculateFee(pot)
  const prize = calculatePrize(pot)

  function handleSpin() {
    if (phase !== 'ready') return
    setPhase('spinning')

    const winnerIndex  = Math.floor(Math.random() * players.length)
    const winnerPlayer = players[winnerIndex]
    const sliceAngle   = 360 / players.length
    const winnerAngle  = sliceAngle * winnerIndex
    const totalRotation = 2160 + (360 - winnerAngle)

    if (wheelRef.current) {
      wheelRef.current.style.transition =
        'transform 3s cubic-bezier(0.17, 0.67, 0.12, 1)'
      wheelRef.current.style.transform =
        `rotate(${totalRotation}deg)`
    }

    setTimeout(() => {
      setWinner(winnerPlayer.name)
      setPhase('done')
      addResult({
        winnerId:   winnerPlayer.id,
        winnerName: winnerPlayer.name,
        pot,
        fee,
        prize,
        timestamp:  Date.now(),
      })
    }, 3200)
  }

  function handlePlayAgain() {
    resetGame()
    setScreen('create-room')
  }

  function handleHistory() {
    setScreen('history')
  }

  return (
    <Container>

      {currentPlayer && (
        <PlayerBar
          name={currentPlayer.name}
          coins={currentPlayer.coins}
        />
      )}

      {/* Room info */}
      <div className="flex justify-between items-center mb-4 px-1">
        <p className="text-gray-400 text-sm">{room?.name}</p>
        <p className="text-purple-400 text-sm font-semibold">
          Pot: ⬡ {pot.toLocaleString()}
        </p>
      </div>

      <Card className="mb-4">
        <h2 className="text-white text-xl font-bold text-center mb-6">
          {phase === 'ready'    && '🎡 Ready to Spin'}
          {phase === 'spinning' && '🌀 Spinning...'}
          {phase === 'done'     && '🏆 We have a winner!'}
        </h2>

        {/* Wheel */}
        <div className="flex justify-center mb-6">
          <div className="relative w-64 h-64">

            {/* Pointer */}
            <div
              style={{
                position:    'absolute',
                top:         '-8px',
                left:        '50%',
                transform:   'translateX(-50%)',
                zIndex:      10,
                width:       0,
                height:      0,
                borderLeft:  '10px solid transparent',
                borderRight: '10px solid transparent',
                borderBottom:'20px solid white',
              }}
            />

            {/* Spinning disc */}
            <div
              ref={wheelRef}
              className="w-64 h-64 rounded-full overflow-hidden"
              style={{ position: 'relative' }}
            >
              {players.map((player, index) => {
                const sliceAngle = 360 / players.length
                const rotation   = sliceAngle * index
                return (
                  <div
                    key={player.id}
                    style={{
                      position:        'absolute',
                      width:           '100%',
                      height:          '100%',
                      transform:       `rotate(${rotation}deg)`,
                      transformOrigin: 'center',
                      background:      `conic-gradient(
                        ${COLORS[index % COLORS.length]}
                        0deg ${sliceAngle}deg,
                        transparent ${sliceAngle}deg
                      )`,
                    }}
                  >
                    <div
                      style={{
                        position:     'absolute',
                        top:          '12%',
                        left:         '50%',
                        transform:    `translateX(-50%) rotate(${sliceAngle / 2}deg)`,
                        color:        'white',
                        fontSize:     '11px',
                        fontWeight:   'bold',
                        textAlign:    'center',
                        width:        '60px',
                        whiteSpace:   'nowrap',
                        overflow:     'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {player.name}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Prize breakdown */}
        <div className="bg-gray-800 rounded-xl p-4 mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Total pot</span>
            <span className="text-white font-semibold">
              ⬡ {pot.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-400">Platform fee (10%)</span>
            <span className="text-red-400 font-semibold">
              − ⬡ {fee.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm border-t border-gray-700 pt-2">
            <span className="text-gray-400">Winner receives</span>
            <span className="text-purple-400 font-bold">
              ⬡ {prize.toLocaleString()}
            </span>
          </div>
        </div>

        {/* Winner card */}
        {phase === 'done' && winner && (
          <div className="bg-purple-900 border border-purple-600 rounded-xl p-4 text-center mb-4">
            <p className="text-purple-300 text-sm mb-1">Winner</p>
            <p className="text-white text-2xl font-bold">{winner} 🏆</p>
            <p className="text-purple-400 text-sm mt-1">
              Wins ⬡ {prize.toLocaleString()} demo coins
            </p>
          </div>
        )}
      </Card>

      {/* Buttons */}
      <div className="flex flex-col gap-3">
        {phase === 'ready' && (
          <Button onClick={handleSpin} fullWidth>
            🎯 Spin the Wheel
          </Button>
        )}

        {phase === 'spinning' && (
          <Button disabled fullWidth>
            🌀 Spinning...
          </Button>
        )}

        {phase === 'done' && (
          <>
            <Button onClick={handlePlayAgain} fullWidth>
              🎡 Play Again
            </Button>
            <Button
              variant="secondary"
              onClick={handleHistory}
              fullWidth
            >
              📋 View History
            </Button>
          </>
        )}
      </div>

      <DemoNotice />
    </Container>
  )
}

export default WheelPage