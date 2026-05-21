// Who is playing
export interface Player {
  id: string
  name: string
  coins: number
  isReady: boolean
}

// A game room
export interface Room {
  id: string
  name: string
  betAmount: number
  maxPlayers: number
  hostId: string
}

// One spin result
export interface GameResult {
  winnerId: string
  winnerName: string
  pot: number
  fee: number
  prize: number
  timestamp: number
}

// Which screen to show
export type Screen =
  | 'login'
  | 'create-room'
  | 'lobby'
  | 'wheel'
  | 'history'