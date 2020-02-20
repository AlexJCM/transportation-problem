import constantes from "../constants.js";

function getEmptyMatriz(i, j) {
  let matriz = [];
  for (let k = 0; k < i; k++) {
    let cols = new Array(j);
    for (let constantes = 0; constantes < j; constantes++) {
      cols[constantes] = "";
    }
    matriz.push(cols);
  }
  return matriz;
}

function getEmptyArray(i) {
  let cols = [];
  for (let k = 0; k < i; k++) {
    cols.push("");
  }
  return cols;
}

const matriz = (
  state = {},
  { type, cantidad_origenes, cantidad_destinos, datos, demanda, oferta }
) => {
  switch (type) {
    case constantes.CAMBIAR_CANTIDAD_ORIGENES:
      return {
        ...state,
        cantidad_origenes,
        datos: getEmptyMatriz(cantidad_origenes, state.cantidad_destinos),
        demanda: getEmptyArray(state.cantidad_destinos),
        oferta: getEmptyArray(cantidad_origenes)
      };

    case constantes.CAMBIAR_CANTIDAD_DESTINOS:
      return {
        ...state,
        cantidad_destinos,
        datos: getEmptyMatriz(state.cantidad_origenes, cantidad_destinos),
        demanda: getEmptyArray(cantidad_destinos),
        oferta: getEmptyArray(state.cantidad_origenes)
      };

    case constantes.ACTUALIZAR_MATRIZ:
      return {
        ...state,
        datos
      };

    case constantes.CAMBIAR_DEMANDAS:
      return {
        ...state,
        demanda
      };

    case constantes.CAMBIAR_OFERTAS:
      return {
        ...state,
        oferta
      };

    default:
      return state;
  }
};

export default matriz;
