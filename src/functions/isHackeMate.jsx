import { hackee } from './isHacke'
export function esJaqueMate (tablero, turno) {
  const colorRey = turno === 'blanco' ? 'blanco' : 'negro'

  // Encuentra la posición del rey del turno actual
  const posicionRey = tablero.findIndex(
    (pieza) => pieza && pieza.tipo === 'rey' && pieza.color === colorRey
  )

  // Determina si el rey está en jaque
  const { reyBlancoEnJaque, reyNegroEnJaque } = hackee(tablero, turno)
  const reyEnJaque = turno === 'blanco' ? reyBlancoEnJaque : reyNegroEnJaque

  if (!reyEnJaque) {
    // Si el rey no está en jaque, no puede ser jaque mate
    return false
  }

  // Intenta verificar si el rey puede escapar del jaque
  const movimientosRey = [-9, -8, -7, -1, 1, 7, 8, 9] // Movimientos posibles del rey
  for (const movimiento of movimientosRey) {
    const nuevaPosicion = posicionRey + movimiento

    // Validar que la nueva posición esté dentro del tablero y no salte filas
    const cambioFila = Math.abs(
      Math.floor(posicionRey / 8) - Math.floor(nuevaPosicion / 8)
    )
    if (nuevaPosicion < 0 || nuevaPosicion > 63 || cambioFila > 1) continue

    // Evita que el rey se mueva a una posición ocupada por piezas propias
    if (tablero[nuevaPosicion] && tablero[nuevaPosicion].color === colorRey) continue

    // Simula el movimiento del rey para verificar si todavía estaría en jaque
    const tableroSimulado = [...tablero]
    tableroSimulado[nuevaPosicion] = tableroSimulado[posicionRey]
    tableroSimulado[posicionRey] = null

    // Verificar si después del movimiento el rey sigue en jaque
    const { reyBlancoEnJaque: jaqueBlanco, reyNegroEnJaque: jaqueNegro } = hackee(
      tableroSimulado,
      turno
    )
    const reyAunEnJaque = turno === 'blanco' ? jaqueBlanco : jaqueNegro

    if (!reyAunEnJaque) {
      // Si encuentra al menos un movimiento válido, no es jaque mate
      return false
    }
  }

  // Si el rey no puede escapar y está en jaque, es jaque mate
  return true
}
