export function hackee (tablero) {
  const posicionReyBlanco = tablero.findIndex(
    (pieza) => pieza && pieza.tipo === 'rey' && pieza.color === 'blanco'
  )
  const posicionReyNegro = tablero.findIndex(
    (pieza) => pieza && pieza.tipo === 'rey' && pieza.color === 'negro'
  )

  let reyBlancoEnJaque = false
  let reyNegroEnJaque = false

  for (let i = 0; i <= 63; i++) {
    const pieza = tablero[i]
    if (!pieza) continue

    // Evaluar amenazas al rey blanco
    if (pieza.color === 'negro') {
      if (pieza.tipo === 'peon') {
        if (i + 7 === posicionReyBlanco || i + 9 === posicionReyBlanco) {
          reyBlancoEnJaque = true
        }
      } else if (pieza.tipo === 'caballo') {
        const movimientosCaballo = [-17, -15, -10, -6, 6, 10, 15, 17]
        if (movimientosCaballo.some((mov) => i + mov === posicionReyBlanco)) {
          reyBlancoEnJaque = true
        }
      } else if (pieza.tipo === 'alfil' || pieza.tipo === 'dama') {
        const direccionesDiagonal = [7, -7, 9, -9]
        for (const direccion of direccionesDiagonal) {
          let posicionActual = i + direccion
          while (posicionActual >= 0 && posicionActual <= 63) {
            const cambioFila = Math.abs(
              Math.floor(posicionActual / 8) - Math.floor((posicionActual - direccion) / 8)
            )
            // Si se cruza a otra fila, detener el recorrido
            if (cambioFila > 1 || cambioFila === 0) break
            if (posicionActual === posicionReyBlanco) {
              reyBlancoEnJaque = true
              break
            }
            if (tablero[posicionActual]) break
            posicionActual += direccion
          }
        }
      }

      if (pieza.tipo === 'torre' || pieza.tipo === 'dama') {
        const direccionesRectas = [8, -8, 1, -1]
        for (const direccion of direccionesRectas) {
          let posicionActual = i + direccion
          while (posicionActual >= 0 && posicionActual <= 63) {
            const cambioFila =
              direccion === 1 || direccion === -1
                ? Math.abs(Math.floor(posicionActual / 8) - Math.floor((posicionActual - direccion) / 8))
                : 0
            // Si se cruza a otra fila en movimientos horizontales, detener el recorrido
            if (direccion === 1 || direccion === -1) {
              if (cambioFila > 0) break
            }
            if (posicionActual === posicionReyBlanco) {
              reyBlancoEnJaque = true
              break
            }
            if (tablero[posicionActual]) break
            posicionActual += direccion
          }
        }
      }

      // Verificar movimientos tipo rey
      if (pieza.tipo === 'rey') {
        const movimientosRey = [-9, -8, -7, -1, 1, 7, 8, 9]
        if (movimientosRey.some((mov) => i + mov === posicionReyBlanco)) {
          reyBlancoEnJaque = true
        }
      }
    }

    // Evaluar amenazas al rey negro (misma lógica pero para piezas blancas)
    if (pieza.color === 'blanco') {
      if (pieza.tipo === 'peon') {
        if (i - 7 === posicionReyNegro || i - 9 === posicionReyNegro) {
          reyNegroEnJaque = true
        }
      } else if (pieza.tipo === 'caballo') {
        const movimientosCaballo = [-17, -15, -10, -6, 6, 10, 15, 17]
        if (movimientosCaballo.some((mov) => i + mov === posicionReyNegro)) {
          reyNegroEnJaque = true
        }
      } else if (pieza.tipo === 'alfil' || pieza.tipo === 'dama') {
        const direccionesDiagonal = [7, -7, 9, -9]
        for (const direccion of direccionesDiagonal) {
          let posicionActual = i + direccion
          while (posicionActual >= 0 && posicionActual <= 63) {
            const cambioFila = Math.abs(
              Math.floor(posicionActual / 8) - Math.floor((posicionActual - direccion) / 8)
            )
            // Si se cruza a otra fila, detener el recorrido
            if (cambioFila > 1 || cambioFila === 0) break
            if (posicionActual === posicionReyNegro) {
              reyNegroEnJaque = true
              break
            }
            if (tablero[posicionActual]) break
            posicionActual += direccion
          }
        }
      }

      if (pieza.tipo === 'torre' || pieza.tipo === 'dama') {
        const direccionesRectas = [8, -8, 1, -1]
        for (const direccion of direccionesRectas) {
          let posicionActual = i + direccion
          while (posicionActual >= 0 && posicionActual <= 63) {
            const cambioFila =
              direccion === 1 || direccion === -1
                ? Math.abs(Math.floor(posicionActual / 8) - Math.floor((posicionActual - direccion) / 8))
                : 0
            // Si se cruza a otra fila en movimientos horizontales, detener el recorrido
            if (direccion === 1 || direccion === -1) {
              if (cambioFila > 0) break
            }
            if (posicionActual === posicionReyNegro) {
              reyNegroEnJaque = true
              break
            }
            if (tablero[posicionActual]) break
            posicionActual += direccion
          }
        }
      }

      // Verificar movimientos tipo rey
      if (pieza.tipo === 'rey') {
        const movimientosRey = [-9, -8, -7, -1, 1, 7, 8, 9]
        if (movimientosRey.some((mov) => i + mov === posicionReyNegro)) {
          reyNegroEnJaque = true
        }
      }
    }
  }
  return { reyBlancoEnJaque, reyNegroEnJaque }
}
