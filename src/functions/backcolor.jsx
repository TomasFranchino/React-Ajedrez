export function backcolor (index) {
  const fila = Math.floor(index / 8)
  return (fila % 2 === 0) ? (index % 2 === 0 ? '#ececd3' : '#749454') : (index % 2 === 0 ? '#749454' : '#ececd3')
}
