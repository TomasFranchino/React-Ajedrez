import { useState } from 'react'
import './App.css'
import { movimientosPosibles, promocionPeon } from './functions/movimientosPosibles'
import { initializeBoard } from './functions/initializeBoard'
import { Tablero } from './components/Tablero'
import { Promocion } from './components/Promocion'
import { hackee } from './functions/isHacke'
import { esJaqueMate } from './functions/isHackeMate'

function App () {
  const [piezaSeleccionada, setPiezaSeleccionada] = useState(null)
  const [turno, setTurno] = useState('blanco')
  const [promocion, setPromocion] = useState(null)
  const [tablero, setTablero] = useState(() => initializeBoard(turno))
  const [hackeMate, setHackeMate] = useState(false)

  const handleDragStart = (index) => {
    if (tablero[index].color === turno) {
      setPiezaSeleccionada(index)
    }
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
        newTablero[index] = tablero[piezaSeleccionada]
        newTablero[piezaSeleccionada] = null

        if (esJaqueMate(newTablero, turno === 'blanco' ? 'negro' : 'blanco')) {
          setHackeMate(true)
          return null
        }
        const piezasHacke = hackee(newTablero)
        console.log(turno + ' ' + piezasHacke.reyBlancoEnJaque + ' ' + piezasHacke.reyNegroEnJaque)
        if ((turno === 'blanco' && piezasHacke.reyBlancoEnJaque) || (turno === 'negro' && piezasHacke.reyNegroEnJaque)) {
          return null
        }
        setTurno(turno === 'blanco' ? 'negro' : 'blanco')
        setTablero(newTablero)
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
        <Tablero tablero={tablero} onDragStart={handleDragStart} onDrop={handleDrop} />
        <h1>Turno de las: </h1>{turno === 'blanco' ? <img src='./src/utils/peonblanco.png' alt='' /> : <img src='./src/utils/peonnegro.png' alt='' />}
      </section>
      {
        hackeMate !== false && (
          <h1>gano el blanco</h1>
        )
}
    </main>
  )
}

export default App
