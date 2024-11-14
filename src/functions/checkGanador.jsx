import { isHackeMate } from './isHackeMate'
import { isStalemate } from './isStalemate'

export function checkGanador (tablero, turno) {
  if (isHackeMate(tablero, turno)) {
    return turno === 'blanco' ? 'negro' : 'blanco' // The opposite player wins
  }

  // Check for stalemate (no legal moves and not in check)
  if (isStalemate(tablero, turno)) {
    return 'draw'
  }

  return null // No winner yet
}
