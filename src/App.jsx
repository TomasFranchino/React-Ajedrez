import { useState } from 'react'
import './App.css'
import peonblanco from './utils/peonblanco.png';
import peonnegro from './utils/peonnegro.png';
import alfilblanco from './utils/alfilblanco.png';
import alfilnegro from './utils/alfilnegro.png';
import caballoblanco from './utils/caballoblanco.png';
import caballonegro from './utils/caballonegro.png';
import damablanca from './utils/damablanca.png';
import damanegra from './utils/damanegra.png';
import reyblanco from './utils/reyblanco.png';
import reynegro from './utils/reynegro.png';
import torreblanca from './utils/torreblanca.png';
import torrenegra from './utils/torrenegra.png';


export const Cuadro = ({pieza}) => {
  return (
    <div className='cuadro'>
      <img src={pieza} alt="" />
    </div>
  )
}

const piezas = [
  {tipo: 'peon',color:'blanco',image: peonblanco},
  {tipo:'peon',color:'negro',image: peonnegro},
  {tipo:'torre',color:'negro',image: torrenegra},
  {tipo:'torre',color:'blanco',image: torreblanca},
  {tipo:'alfil',color:'negro',image: alfilnegro},
  {tipo:'alfil',color:'blanco',image: alfilblanco},
  {tipo:'caballo',color:'negro',image: caballonegro},
  {tipo:'caballo',color:'blanco',image: caballoblanco},
  {tipo:'rey',color:'negro',image: reynegro},
  {tipo:'rey',color:'blanco',image: reyblanco},
  {tipo:'dama',color:'negro',image: damanegra},
  {tipo:'dama',color:'blanco',image: damablanca}
];

function App() {


  const [tablero, setTablero] = useState(() => {
    return Array(64).fill(null);
  })



  return (
    <main>
      <img src={piezas.find(pieza => pieza.tipo === "peon" && pieza.color === 'blanco').image} ></img>
      <h1>Tablero de ajedrez</h1>
      
      <section className='tablero'>
        {
          tablero.map((_, index) => {
            return (
              <>
              <Cuadro pieza={peonblanco} key={index}></Cuadro>
              </>
            )
          })
        }
      </section>
      
    </main>
  )
}

export default App
