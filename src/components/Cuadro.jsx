import { Pieza } from './Pieza'
export const Cuadro = ({ index, color, pieza, onDragStart, onDrop }) => {
  return (

    <div
      key={index}
      style={{ backgroundColor: color }}
      className='cuadro'
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      <Pieza pieza={pieza} onDragStart={onDragStart} />
    </div>

  )
}
