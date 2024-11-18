export const Ganador = ({ turno, resetGame }) => {
    return (
        <section className="ganador">
            <h1>Ganan las {turno === 'blanco' ? 'Blancas' : 'Negras'}</h1>
            <p>por jaque mate</p>
            <button className="btn success" onClick={resetGame} >Reiniciar el Juego</button>
        </section>
    )
}