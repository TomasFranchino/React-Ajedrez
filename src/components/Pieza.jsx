export const Pieza = ({ pieza, onDragStart }) => {
  return (
    <>
      {pieza ? <img onDragStart={onDragStart} src={pieza.image} alt={pieza.tipo} /> : <div className='casillaVacia' />}
    </>
  )
}
