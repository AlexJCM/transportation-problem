import c from "../constants.js";

function getEmptyMatriz(i, j) {
  let matriz = [];
  for (let k = 0; k < i; k++) {
    let cols = new Array(j);
    for (let c = 0; c < j; c++) {
      cols[c] = "";
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
    case c.CHANGE_ROWS_COUNT:
      return {
        ...state,
        cantidad_origenes,
        datos: getEmptyMatriz(cantidad_origenes, state.cantidad_destinos),
        demanda: getEmptyArray(state.cantidad_destinos),
        oferta: getEmptyArray(cantidad_origenes)
      };

    case c.CHANGE_COLUMNS_COUNT:
      return {
        ...state,
        cantidad_destinos,
        datos: getEmptyMatriz(state.cantidad_origenes, cantidad_destinos),
        demanda: getEmptyArray(cantidad_destinos),
        oferta: getEmptyArray(state.cantidad_origenes)
      };

    case c.UPDATE_MATRIX:
      return {
        ...state,
        datos
      };

    case c.CHANGE_NEEDS:
      return {
        ...state,
        demanda
      };

    case c.CHANGE_STORAGE:
      return {
        ...state,
        oferta
      };

    default:
      return state;
  }
};

export default matriz;
