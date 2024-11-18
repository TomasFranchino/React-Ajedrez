import { jaquee } from "./isJaque"
let piezasMovidas = {
  reyBlanco: false,
  torreBlancaIzquierda: false,
  torreBlancaDerecha: false,
  reyNegro: false,
  torreNegraIzquierda: false,
  torreNegraDerecha: false,
}
function casillaBajoAtaque(tablero, turno, casilla) {
  const oponente = turno === 'blanco' ? 'negro' : 'blanco';
  for (let i = 0; i < tablero.length; i++) {
    if (tablero[i] && tablero[i].color === oponente) {
      if (movimientosPosibles(i, tablero, casilla, oponente)) {
        return true;
      }
    }
  }
  return false;
}
export function movimientosPosibles(piezaSeleccionada, tablero, index) {
  const pieza = tablero[piezaSeleccionada]

  if (!pieza) return false

  const tipoPieza = pieza.tipo
  const colorPieza = pieza.color
  const destino = tablero[index]

  if (piezaSeleccionada === index) return false

  if (destino && destino.color === colorPieza) return false
  if (destino && destino.tipo === 'rey') return false

  if (pieza.tipo === 'rey') {
    // Validar enroque blanco
    if (colorPieza === 'blanco' && !piezasMovidas.reyBlanco) {
      // Enroque corto (derecha)
      if (
        index === 62 &&
        !piezasMovidas.torreBlancaDerecha &&
        !tablero[61] &&
        !tablero[62] &&
        !casillaBajoAtaque(tablero, colorPieza, 60) && // Posición inicial del rey
        !casillaBajoAtaque(tablero, colorPieza, 61) && // Casilla que el rey atraviesa
        !casillaBajoAtaque(tablero, colorPieza, 62) && // Destino del rey
        !jaquee(tablero, 'blanco').reyBlancoEnJaque
      ) {
        return true;
      }
      // Enroque largo (izquierda)
      if (
        index === 58 &&
        !piezasMovidas.torreBlancaIzquierda &&
        !tablero[57] &&
        !tablero[58] &&
        !tablero[59] &&
        !casillaBajoAtaque(tablero, colorPieza, 60) && // Posición inicial del rey
        !casillaBajoAtaque(tablero, colorPieza, 59) && // Casilla que el rey atraviesa
        !casillaBajoAtaque(tablero, colorPieza, 58) && // Destino del rey
        !jaquee(tablero, 'blanco').reyBlancoEnJaque
      ) {
        return true;
      }
    }

    // Validar enroque negro
    if (colorPieza === 'negro' && !piezasMovidas.reyNegro) {
      // Enroque corto (derecha)
      if (
        index === 6 &&
        !piezasMovidas.torreNegraDerecha &&
        !tablero[5] &&
        !tablero[6] &&
        !casillaBajoAtaque(tablero, colorPieza, 4) && // Posición inicial del rey
        !casillaBajoAtaque(tablero, colorPieza, 5) && // Casilla que el rey atraviesa
        !casillaBajoAtaque(tablero, colorPieza, 6) && // Destino del rey
        !jaquee(tablero, 'negro').reyNegroEnJaque
      ) {
        return true;
      }
      // Enroque largo (izquierda)
      if (
        index === 2 &&
        !piezasMovidas.torreNegraIzquierda &&
        !tablero[1] &&
        !tablero[2] &&
        !tablero[3] &&
        !casillaBajoAtaque(tablero, colorPieza, 4) && // Posición inicial del rey
        !casillaBajoAtaque(tablero, colorPieza, 3) && // Casilla que el rey atraviesa
        !casillaBajoAtaque(tablero, colorPieza, 2) && // Destino del rey
        !jaquee(tablero, 'negro').reyNegroEnJaque
      ) {
        return true;
      }
    }
  }

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

function movimientosPeon(piezaSeleccionada, index, colorPieza, tablero) {
  const filaInicial = colorPieza === 'blanco' ? 6 : 1
  const direccion = colorPieza === 'blanco' ? -8 : 8

  const columnaPeon = piezaSeleccionada % 8
  const columnaObjetivo = index % 8
  /* verifica q se mueva derecho y no haya nadie */
  if (columnaObjetivo === columnaPeon || columnaObjetivo + 1 === columnaPeon || columnaObjetivo - 1 === columnaPeon) {
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
}

function movimientosTorre(piezaSeleccionada, index, tablero) {
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

function movimientosAlfil(piezaSeleccionada, index, tablero) {
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

function movimientosCaballo(piezaSeleccionada, index) {
  const diferenciaFila = Math.abs(Math.floor(piezaSeleccionada / 8) - Math.floor(index / 8))
  const diferenciaColumna = Math.abs((piezaSeleccionada % 8) - (index % 8))

  return (diferenciaFila === 2 && diferenciaColumna === 1) || (diferenciaFila === 1 && diferenciaColumna === 2)
}

function movimientosDama(piezaSeleccionada, index, tablero) {
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

function movimientosRey(piezaSeleccionada, index) {
  const diferenciaFila = Math.abs(Math.floor(piezaSeleccionada / 8) - Math.floor(index / 8))
  const diferenciaColumna = Math.abs((piezaSeleccionada % 8) - (index % 8))

  // El rey solo puede moverse una casilla en cualquier dirección
  return (diferenciaFila <= 1 && diferenciaColumna <= 1)
}

export function promocionPeon(piezaSeleccionada, tablero, index) {
  // cuando un peon blanco se encuentra en la posicion de 0 a 7 devuelve true
  if (tablero[piezaSeleccionada].tipo === 'peon' && ((index <= 63 && index >= 56) || (index <= 7 && index >= 0))) { return true }
}

export function actualizarPiezasMovidas(tablero, piezaSeleccionada) {
  const pieza = tablero[piezaSeleccionada];
  if (pieza) {
    if (pieza.tipo === 'rey') {
      if (pieza.color === 'blanco') piezasMovidas.reyBlanco = true;
      if (pieza.color === 'negro') piezasMovidas.reyNegro = true;
    }
    if (pieza.tipo === 'torre') {
      if (piezaSeleccionada === 0) piezasMovidas.torreNegraIzquierda = true;
      if (piezaSeleccionada === 7) piezasMovidas.torreNegraDerecha = true;
      if (piezaSeleccionada === 56) piezasMovidas.torreBlancaIzquierda = true;
      if (piezaSeleccionada === 63) piezasMovidas.torreBlancaDerecha = true;
    }
  }
}