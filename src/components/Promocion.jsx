import alfilblanco from '../utils/alfilblanco.png'
import caballoblanco from '../utils/caballoblanco.png'
import damablanco from '../utils/damablanca.png'
import torreblanco from '../utils/torreblanca.png'
import torrenegro from '../utils/torrenegra.png'
import damanegro from '../utils/damanegra.png'
import caballonegro from '../utils/caballonegro.png'
import alfilnegro from '../utils/alfilnegro.png'

const piezas = [
  { tipo: 'torre', color: 'blanco', image: torreblanco },
  { tipo: 'alfil', color: 'blanco', image: alfilblanco },
  { tipo: 'caballo', color: 'blanco', image: caballoblanco },
  { tipo: 'dama', color: 'blanco', image: damablanco },
  { tipo: 'torre', color: 'negro', image: torrenegro },
  { tipo: 'alfil', color: 'negro', image: alfilnegro },
  { tipo: 'caballo', color: 'negro', image: caballonegro },
  { tipo: 'dama', color: 'negro', image: damanegro }
]
export const Promocion = ({ handlePromocion, turno }) => {
  const dama = turno === 'blanco' ? piezas[3] : piezas[7]
  const torre = turno === 'blanco' ? piezas[0] : piezas[4]
  const alfil = turno === 'blanco' ? piezas[1] : piezas[5]
  const caballo = turno === 'blanco' ? piezas[2] : piezas[6]

  return (

    <div className='promocion'>

      <>
        <div style={{ backgroundColor: '#ececd3' }} className='cuadro'>
          <div className='pieza'>
            <img onClick={() => handlePromocion(alfil)} src={alfil.image} />
          </div>
        </div>
        <div style={{ backgroundColor: '#749454' }} className='cuadro'>
          <div className='pieza'>
            <img onClick={() => handlePromocion(caballo)} src={caballo.image} />
          </div>
        </div>
        <div style={{ backgroundColor: '#ececd3' }} className='cuadro'>
          <div className='pieza'>
            <img onClick={() => handlePromocion(torre)} src={torre.image} />
          </div>
        </div>
        <div style={{ backgroundColor: '#749454' }} className='cuadro'>
          <div className='pieza'>
            <img onClick={() => handlePromocion(dama)} src={dama.image} />
          </div>
        </div>

      </>

    </div>
  )
}
