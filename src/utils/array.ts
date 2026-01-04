/**
 * Fisher-Yates shuffle algorithm
 * Returns a new shuffled array without mutating the original
 */
export function shuffle<T>(array: T[]): T[] {
  const result = [...array]
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = result[i] as T
    result[i] = result[j] as T
    result[j] = temp
  }
  return result
}

/**
 * Split an array into chunks of approximately equal size
 */
export function chunk<T>(array: T[], chunkCount: number): T[][] {
  if (chunkCount < 2) return [array]

  const result: T[][] = []
  const len = array.length
  let i = 0

  if (len % chunkCount === 0) {
    const size = Math.floor(len / chunkCount)
    while (i < len) {
      result.push(array.slice(i, (i += size)))
    }
  } else {
    let remaining = chunkCount
    while (i < len) {
      const size = Math.ceil((len - i) / remaining--)
      result.push(array.slice(i, (i += size)))
    }
  }

  return result
}
