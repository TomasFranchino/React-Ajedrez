import { backcolor } from '../functions/backcolor'
import { Cuadro } from './Cuadro'
export const Tablero = ({ tablero, onDragStart, onDrop, promocion }) => {
  return (
    <div className='tablero'>

      {tablero.map((pieza, index) => {
        const color = backcolor(index)
        return (
          <Cuadro
            key={index}
            color={color}
            index={index}
            pieza={pieza}
            onDragStart={() => onDragStart(index)}
            onDrop={() => onDrop(index)}
            promocion={promocion}
          />
        )
      })}
    </div>
  )
}
