import { jaquee } from "./isJaque";
import { movimientosPosibles } from "./movimientosPosibles";
export function esJaqueMate(tablero, turno) {
  const colorRey = turno === 'blanco' ? 'blanco' : 'negro';
  const colorOponente = turno === 'blanco' ? 'negro' : 'blanco';

  // Encuentra la posición del rey del turno actual
  const posicionRey = tablero.findIndex(
    (pieza) => pieza && pieza.tipo === 'rey' && pieza.color === colorRey
  );

  // Determina si el rey está en jaque
  const { reyBlancoEnJaque, reyNegroEnJaque } = jaquee(tablero);
  const reyEnJaque = turno === 'blanco' ? reyBlancoEnJaque : reyNegroEnJaque;

  if (!reyEnJaque) {
    // Si el rey no está en jaque, no puede ser jaque mate
    return false;
  }

  // Intenta verificar si alguna pieza puede salvar el jaque
  for (let i = 0; i < 64; i++) {
    const pieza = tablero[i];
    if (pieza && pieza.color === colorRey) {
      // Itera sobre cada posición del tablero para validar movimientos
      for (let j = 0; j < 64; j++) {
        if (movimientosPosibles(i, tablero, j)) {
          // Simula el movimiento para verificar si elimina el jaque
          const tableroSimulado = [...tablero];
          tableroSimulado[j] = tableroSimulado[i];
          tableroSimulado[i] = null;

          // Verifica si el rey sigue en jaque después del movimiento
          const { reyBlancoEnJaque: jaqueBlanco, reyNegroEnJaque: jaqueNegro } = jaquee(
            tableroSimulado,
            turno
          );
          const reyAunEnJaque = turno === 'blanco' ? jaqueBlanco : jaqueNegro;

          if (!reyAunEnJaque) {
            // Si encuentra un movimiento que elimina el jaque, no es jaque mate
            return false;
          }
        }
      }
    }
  }

  // Si ninguna pieza puede eliminar el jaque, es jaque mate
  return true;
}
