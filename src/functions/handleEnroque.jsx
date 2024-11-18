import { actualizarPiezasMovidas } from './movimientosPosibles'

export const handleEnroque = (piezaSeleccionada, newTablero, index, setTurno, setTablero, turno, tablero) => {
    // Enroque blanco corto
    if (piezaSeleccionada === 4 && index === 6) {
        newTablero[6] = newTablero[4];
        newTablero[4] = null;
        newTablero[5] = newTablero[7];
        newTablero[7] = null;
        actualizarPiezasMovidas(newTablero, piezaSeleccionada, index);
        setTablero(newTablero);
        setTurno(turno === 'blanco' ? 'negro' : 'blanco');
        return true
    } else if (piezaSeleccionada === 4 && index === 2) {
        // Enroque blanco largo
        newTablero[2] = newTablero[4];
        newTablero[4] = null;
        newTablero[3] = newTablero[0];
        newTablero[0] = null;
        actualizarPiezasMovidas(tablero, piezaSeleccionada, index);
        setTablero(newTablero);
        setTurno(turno === 'blanco' ? 'negro' : 'blanco');
        return true
    } else if (piezaSeleccionada === 60 && index === 62) {
        newTablero[62] = newTablero[60];
        newTablero[60] = null;
        newTablero[61] = newTablero[63];
        newTablero[63] = null;
        actualizarPiezasMovidas(tablero, piezaSeleccionada, index);
        setTablero(newTablero);
        setTurno(turno === 'blanco' ? 'negro' : 'blanco');
        return true
    } else if (piezaSeleccionada === 60 && index === 58) {
        newTablero[58] = newTablero[60];
        newTablero[60] = null;
        newTablero[59] = newTablero[56];
        newTablero[56] = null;
        actualizarPiezasMovidas(tablero, piezaSeleccionada, index);
        setTablero(newTablero);
        setTurno(turno === 'blanco' ? 'negro' : 'blanco');
        return true
    }
    return false
}