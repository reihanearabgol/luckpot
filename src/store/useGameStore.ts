import { create } from 'zustand'
import type { Player, Room, GameResult, Screen } from '../types'

interface GameStore {
  screen: Screen
  currentPlayer: Player | null
  room: Room | null
  players: Player[]
  history: GameResult[]

  setScreen: (screen: Screen) => void
  setCurrentPlayer: (player: Player) => void
  setRoom: (room: Room) => void
  addPlayer: (player: Player) => void
  setPlayerReady: (playerId: string) => void
  deductBet: (playerId: string, amount: number) => void
  addResult: (result: GameResult) => void
  resetGame: () => void
}

export const useGameStore = create<GameStore>((set) => ({
  screen: 'login',
  currentPlayer: null,
  room: null,
  players: [],
  history: [],

  setScreen: (screen) => set({ screen }),

  setCurrentPlayer: (player) => set({ currentPlayer: player }),

  setRoom: (room) => set({ room }),

  addPlayer: (player) =>
    set((state) => ({
      players: [...state.players, player],
    })),

  setPlayerReady: (playerId) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId ? { ...p, isReady: true } : p
      ),
    })),

  deductBet: (playerId, amount) =>
    set((state) => ({
      players: state.players.map((p) =>
        p.id === playerId
          ? { ...p, coins: p.coins - amount }
          : p
      ),
      currentPlayer:
        state.currentPlayer?.id === playerId
          ? {
              ...state.currentPlayer,
              coins: state.currentPlayer.coins - amount,
            }
          : state.currentPlayer,
    })),

  addResult: (result) =>
    set((state) => ({
      history: [result, ...state.history],
    })),

  resetGame: () =>
    set({
      room: null,
      players: [],
    }),
}))