export default function calcualtePointsWon(wager: number, odds: number): number {
  if (wager === undefined) {
    return 0
  }

  const result = odds > 0
    ? (odds / 100) * wager
    : (100 / Math.abs(odds)) * wager
  return Math.round(result * 100) / 100
}