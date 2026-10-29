import { describe, expect, it } from 'vitest'
import { calculateElo } from './elo'

describe('calculateElo', () => {
  it('gir 1216 og 1184 når A vinner med lik rating', () => {
    expect(calculateElo(1200, 1200, 'A')).toEqual({
      newRatingA: 1216,
      newRatingB: 1184,
      changeA: 16,
      changeB: -16,
    })
  })

  it('gir 1224 og 1376 når A slår en høyere rangert spiller', () => {
    expect(calculateElo(1200, 1400, 'A')).toEqual({
      newRatingA: 1224,
      newRatingB: 1376,
      changeA: 24,
      changeB: -24,
    })
  })

  it('gir 1192 og 1408 når B vinner med høyere rating', () => {
    expect(calculateElo(1200, 1400, 'B')).toEqual({
      newRatingA: 1192,
      newRatingB: 1408,
      changeA: -8,
      changeB: 8,
    })
  })

  it('lar endringene summere til null og bevarer samlet Elo', () => {
    const ratings = [0, 800, 1200, 1400, 2000]
    const winners = ['A', 'B'] as const

    for (const ratingA of ratings) {
      for (const ratingB of ratings) {
        for (const winner of winners) {
          const result = calculateElo(ratingA, ratingB, winner)

          expect(result.changeA + result.changeB).toBe(0)
          expect(result.newRatingA + result.newRatingB).toBe(ratingA + ratingB)
        }
      }
    }
  })

  it('avviser desimaltall for begge spillere', () => {
    expect(() => calculateElo(1200.5, 1400, 'A')).toThrow(/heltall/)
    expect(() => calculateElo(1200, 1400.5, 'B')).toThrow(/heltall/)
  })
})
