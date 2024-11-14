export function movimientosPosibles (piezaSeleccionada, tablero, index) {
  const pieza = tablero[piezaSeleccionada]

  if (!pieza) return false

  const tipoPieza = pieza.tipo
  const colorPieza = pieza.color
  const destino = tablero[index]

  if (piezaSeleccionada === index) return false

  if (destino && destino.color === colorPieza) return false
  if (destino && destino.tipo === 'rey') return false

  switch (tipoPieza) {
    case 'peon':
      return movimientosPeon(piezaSeleccionada, index, colorPieza, tablero)
    case 'torre':
      return movimientosTorre(piezaSeleccionada, index, tablero)
    case 'alfil':
      return movimientosAlfil(piezaSeleccionada, index, tablero)
    case 'caballo':
      return movimientosCaballo(piezaSeleccionada, index)
    case 'dama':
      return movimientosDama(piezaSeleccionada, index, tablero)
    case 'rey':
      return movimientosRey(piezaSeleccionada, index)
    default:
      return false
  }
}

function movimientosPeon (piezaSeleccionada, index, colorPieza, tablero) {
  const filaInicial = colorPieza === 'blanco' ? 6 : 1
  const direccion = colorPieza === 'blanco' ? -8 : 8

  /* verifica q se mueva derecho y no haya nadie */
  if (index === piezaSeleccionada + direccion && !tablero[index]) return true

  //
  if (piezaSeleccionada >= filaInicial * 8 && piezaSeleccionada < filaInicial * 8 + 8) {
    if (index === piezaSeleccionada + 2 * direccion && !tablero[index] && !tablero[piezaSeleccionada + direccion]) {
      return true
    }
  }

  if (
    (index === piezaSeleccionada + direccion - 1 || index === piezaSeleccionada + direccion + 1) &&
      tablero[index] &&
      tablero[index].color !== colorPieza
  ) {
    return true
  }

  return false
}

function movimientosTorre (piezaSeleccionada, index, tablero) {
  const diferenciaFila = Math.floor(piezaSeleccionada / 8) - Math.floor(index / 8)
  const diferenciaColumna = (piezaSeleccionada % 8) - (index % 8)

  if (diferenciaFila !== 0 && diferenciaColumna !== 0) return false

  if (diferenciaColumna === 0) {
    const paso = diferenciaFila > 0 ? -8 : 8
    for (let i = piezaSeleccionada + paso; i !== index; i += paso) {
      if (tablero[i]) return false
    }
    return true
  }

  if (diferenciaFila === 0) {
    const paso = diferenciaColumna > 0 ? -1 : 1
    for (let i = piezaSeleccionada + paso; i !== index; i += paso) {
      if (tablero[i]) return false
    }
    return true
  }

  return false
}

function movimientosAlfil (piezaSeleccionada, index, tablero) {
  const diferenciaFila = Math.abs(Math.floor(piezaSeleccionada / 8) - Math.floor(index / 8))
  const diferenciaColumna = Math.abs((piezaSeleccionada % 8) - (index % 8))

  if (diferenciaFila !== diferenciaColumna) return false

  const pasoDiagonal = (index > piezaSeleccionada)
    ? (index % 8 > piezaSeleccionada % 8 ? 9 : 7)
    : (index % 8 > piezaSeleccionada % 8 ? -7 : -9)

  for (let i = piezaSeleccionada + pasoDiagonal; i !== index; i += pasoDiagonal) {
    if (tablero[i]) return false
  }

  return true
}

function movimientosCaballo (piezaSeleccionada, index) {
  const diferenciaFila = Math.abs(Math.floor(piezaSeleccionada / 8) - Math.floor(index / 8))
  const diferenciaColumna = Math.abs((piezaSeleccionada % 8) - (index % 8))

  return (diferenciaFila === 2 && diferenciaColumna === 1) || (diferenciaFila === 1 && diferenciaColumna === 2)
}

function movimientosDama (piezaSeleccionada, index, tablero) {
  const filaInicial = Math.floor(piezaSeleccionada / 8)
  const filaFinal = Math.floor(index / 8)
  const colInicial = piezaSeleccionada % 8
  const colFinal = index % 8

  const diferenciaFila = Math.abs(filaInicial - filaFinal)
  const diferenciaColumna = Math.abs(colInicial - colFinal)

  const esMovimientoTorre = filaInicial === filaFinal || colInicial === colFinal
  const esMovimientoAlfil = diferenciaFila === diferenciaColumna

  if (esMovimientoTorre) {
    return movimientosTorre(piezaSeleccionada, index, tablero)
  }

  if (esMovimientoAlfil) {
    return movimientosAlfil(piezaSeleccionada, index, tablero)
  }

  return false
}

function movimientosRey (piezaSeleccionada, index) {
  const diferenciaFila = Math.abs(Math.floor(piezaSeleccionada / 8) - Math.floor(index / 8))
  const diferenciaColumna = Math.abs((piezaSeleccionada % 8) - (index % 8))

  // El rey solo puede moverse una casilla en cualquier dirección
  return (diferenciaFila <= 1 && diferenciaColumna <= 1)
}

export function promocionPeon (piezaSeleccionada, tablero, index) {
// cuando un peon blanco se encuentra en la posicion de 0 a 7 devuelve true
  if (tablero[piezaSeleccionada].tipo === 'peon' && ((index <= 63 && index >= 56) || (index <= 7 && index >= 0))) { return true }
}
