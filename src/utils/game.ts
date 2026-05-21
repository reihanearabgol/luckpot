export function calculatePot(betAmount: number, playerCount: number): number {
  return betAmount * playerCount
}

export function calculateFee(pot: number): number {
  return Math.floor(pot * 0.1)
}

export function calculatePrize(pot: number): number {
  return pot - calculateFee(pot)
}

export function formatCoins(amount: number): string {
  return `⬡ ${amount.toLocaleString()}`
}

export function formatDate(timestamp: number): string {
  return new Date(timestamp).toLocaleString()
}