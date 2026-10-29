export const STARTING_ELO = 1200
export const K_FACTOR = 32

export function calculateElo(
  ratingA: number,
  ratingB: number,
  winner: 'A' | 'B',
) {
  if (!Number.isInteger(ratingA) || !Number.isInteger(ratingB)) {
    throw new Error('Elo-ratinger må være heltall.')
  }

  // Forventet poengsum for A, basert på forskjellen i rating.
  const expectedA = 1 / (1 + 10 ** ((ratingB - ratingA) / 400))

  // Vinneren får 1 poeng i beregningen, taperen får 0.
  const scoreA = winner === 'A' ? 1 : 0

  // Avrund én gang og bruk motsatt endring for å bevare totalen.
  const changeA = Math.round(K_FACTOR * (scoreA - expectedA))
  const changeB = -changeA

  return {
    newRatingA: ratingA + changeA,
    newRatingB: ratingB + changeB,
    changeA,
    changeB,
  }
}
