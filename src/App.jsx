import { useState } from 'react'
import './App.css'
import { movimientosPosibles, promocionPeon } from './functions/movimientosPosibles'
import { initializeBoard } from './functions/initializeBoard'
import { Tablero } from './components/Tablero'
import { Promocion } from './components/Promocion'
import { jaquee } from './functions/isJaque'
import { esJaqueMate } from './functions/isJaqueMate'
import { actualizarPiezasMovidas } from './functions/movimientosPosibles'
import { handleEnroque } from './functions/handleEnroque'
import { Ganador } from './components/Ganador'

function App() {
  const [tablero, setTablero] = useState(() => initializeBoard('blanco'));
  const [turno, setTurno] = useState('blanco');
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null);
  const [promocion, setPromocion] = useState(null);
  const [jaqueMate, setJaqueMate] = useState(false);

  const handleDragStart = (index) => {
    if (tablero[index].color === turno) {
      setPiezaSeleccionada(index)
    }
  }

  const resetGame = () => {
    setTurno('blanco')
    setJaqueMate(false)
    setPromocion(null)
    setPiezaSeleccionada(null)
    setTablero(initializeBoard('blanco'))
  }

  const handlePromocion = (pieza) => {
    const { piezaSeleccionada, index } = promocion
    const newTablero = [...tablero]
    newTablero[piezaSeleccionada] = null
    newTablero[index] = { ...pieza, color: turno }

    setTablero(newTablero)
    setTurno(turno === 'blanco' ? 'negro' : 'blanco')
    setPromocion(null)
  }

  const handleDrop = (index) => {
    if (piezaSeleccionada !== null && piezaSeleccionada !== index && movimientosPosibles(piezaSeleccionada, tablero, index)) {
      if (promocionPeon(piezaSeleccionada, tablero, index)) {
        setPromocion({ piezaSeleccionada, index })
      } else if (promocion === null) {
        const newTablero = [...tablero]

        if (tablero[piezaSeleccionada].tipo === 'rey') {

          //manejoDeEnroque(piezaSeleccionada,tablero,index)
          if (handleEnroque(piezaSeleccionada, newTablero, index, setTurno, setTablero, turno, tablero)) {
          } else {
            newTablero[index] = tablero[piezaSeleccionada]
            newTablero[piezaSeleccionada] = null

            const piezasJaque = jaquee(newTablero)
            if ((turno === 'blanco' && piezasJaque.reyBlancoEnJaque) || (turno === 'negro' && piezasJaque.reyNegroEnJaque)) {
              return null
            }
            actualizarPiezasMovidas(tablero, piezaSeleccionada, index);
            setTurno(turno === 'blanco' ? 'negro' : 'blanco')
            setTablero(newTablero)
            if (esJaqueMate(newTablero, turno === 'blanco' ? 'negro' : 'blanco')) {
              setJaqueMate(true)
              return null
            }
          }
        } else {
          newTablero[index] = tablero[piezaSeleccionada]
          newTablero[piezaSeleccionada] = null

          const piezasJaque = jaquee(newTablero)
          if ((turno === 'blanco' && piezasJaque.reyBlancoEnJaque) || (turno === 'negro' && piezasJaque.reyNegroEnJaque)) {
            return null
          }
          actualizarPiezasMovidas(tablero, piezaSeleccionada, index);
          setTurno(turno === 'blanco' ? 'negro' : 'blanco')
          setTablero(newTablero)
          if (esJaqueMate(newTablero, turno === 'blanco' ? 'negro' : 'blanco')) {
            setJaqueMate(true)
            return null
          }
        }
      }

      setPiezaSeleccionada(null)
    } else { return null }
  }

  return (
    <main>
      <h1>Tablero de Ajedrez</h1>
      <section>

        <div>
          {promocion && <Promocion turno={turno} handlePromocion={handlePromocion} />}
        </div>
        <div>
          <h3>Jugador 2</h3>
        </div>
        <Tablero tablero={tablero} onDragStart={handleDragStart} onDrop={handleDrop} />
        <div>
          <h3>Jugador 1</h3>
        </div>
      </section>
      {
        jaqueMate !== false && (

          <Ganador turno={turno === 'blanco' ? 'negro' : 'blanco'} resetGame={resetGame} />
        )
      }
    </main>
  )
}

export default App
