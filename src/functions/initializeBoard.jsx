import peonblanco from '../utils/peonblanco.png'
import peonnegro from '../utils/peonnegro.png'
import alfilblanco from '../utils/alfilblanco.png'
import alfilnegro from '../utils/alfilnegro.png'
import caballoblanco from '../utils/caballoblanco.png'
import caballonegro from '../utils/caballonegro.png'
import damablanco from '../utils/damablanca.png'
import damanegro from '../utils/damanegra.png'
import reyblanco from '../utils/reyblanco.png'
import reynegro from '../utils/reynegro.png'
import torreblanco from '../utils/torreblanca.png'
import torrenegro from '../utils/torrenegra.png'

export function initializeBoard (color) {
  const tablero = Array(64).fill(null)
  const piezas = [
    { tipo: 'peon', color: 'blanco', image: peonblanco },
    { tipo: 'peon', color: 'negro', image: peonnegro },
    { tipo: 'torre', color: 'negro', image: torrenegro },
    { tipo: 'torre', color: 'blanco', image: torreblanco },
    { tipo: 'alfil', color: 'negro', image: alfilnegro },
    { tipo: 'alfil', color: 'blanco', image: alfilblanco },
    { tipo: 'caballo', color: 'negro', image: caballonegro },
    { tipo: 'caballo', color: 'blanco', image: caballoblanco },
    { tipo: 'rey', color: 'negro', image: reynegro },
    { tipo: 'rey', color: 'blanco', image: reyblanco },
    { tipo: 'dama', color: 'negro', image: damanegro },
    { tipo: 'dama', color: 'blanco', image: damablanco }
  ]

  if (color === 'blanco') {
    tablero[0] = piezas[2]
    tablero[1] = piezas[6]
    tablero[2] = piezas[4]
    tablero[3] = piezas[10]
    tablero[4] = piezas[8]
    tablero[5] = piezas[4]
    tablero[6] = piezas[6]
    tablero[7] = piezas[2]
    for (let i = 8; i < 16; i++) {
      tablero[i] = piezas[1]
    }
    tablero[56] = piezas[3]
    tablero[57] = piezas[7]
    tablero[58] = piezas[5]
    tablero[59] = piezas[11]
    tablero[60] = piezas[9]
    tablero[61] = piezas[5]
    tablero[62] = piezas[7]
    tablero[63] = piezas[3]
    for (let i = 48; i < 56; i++) {
      tablero[i] = piezas[0]
    }
    return tablero
  } else {
    tablero[56] = piezas[2]
    tablero[57] = piezas[6]
    tablero[58] = piezas[4]
    tablero[59] = piezas[10]
    tablero[60] = piezas[8]
    tablero[61] = piezas[4]
    tablero[62] = piezas[6]
    tablero[63] = piezas[2]
    for (let i = 8; i < 16; i++) {
      tablero[i] = piezas[0]
    }
    tablero[0] = piezas[3]
    tablero[1] = piezas[7]
    tablero[2] = piezas[5]
    tablero[3] = piezas[11]
    tablero[4] = piezas[9]
    tablero[5] = piezas[5]
    tablero[6] = piezas[7]
    tablero[7] = piezas[3]
    for (let i = 48; i < 56; i++) {
      tablero[i] = piezas[1]
    }
    return tablero
  }
}
