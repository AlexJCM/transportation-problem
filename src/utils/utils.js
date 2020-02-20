//Este metodo es el principal y es llamado desde App.js
//y utiliza el resto de metodos de este archivo
function solveMatriz(matrizTariffs, oferta, demanda, callback) {
  let state = {};

  state.solve = [];

  state.ofertaVolume = sumarArray(oferta);
  state.demandaVolume = sumarArray(demanda);

  state.closedMatriz = getClosedMatriz(
    matrizTariffs,
    state.ofertaVolume,
    state.demandaVolume
  );

  let starter_demanda = Array.from(demanda);
  if (state.ofertaVolume > state.demandaVolume) {
    starter_demanda[starter_demanda.length] =
      state.ofertaVolume - state.demandaVolume;
  }
  state.starter_demanda = starter_demanda;

  let starter_oferta = Array.from(oferta);
  if (state.ofertaVolume < state.demandaVolume) {
    starter_oferta[starter_oferta.length] =
      state.demandaVolume - state.ofertaVolume;
  }
  state.starter_oferta = starter_oferta;

  const diferencias = encontrarMatrizDiferencias(state.closedMatriz);
  const maxEl = encontrarMaxDiferencia(
    diferencias.rowsDiferencias,
    diferencias.colsDiferencias
  );
  const matr = state.closedMatriz.map(arr => arr.map(el => ""));

  state.solve[0] = {
    matr,
    maxEl,
    ...diferencias,
    curOfertaVolume: state.ofertaVolume,
    curDemandaVolume: state.demandaVolume,
    demanda: starter_demanda,
    oferta: starter_oferta
  };

  while (
    state.solve[state.solve.length - 1].curOfertaVolume > 0 ||
    state.solve[state.solve.length - 1].curDemandaVolume > 0
  ) {
    state.solve = [
      ...state.solve,
      fillBasicPlan(state.closedMatriz, state.solve[state.solve.length - 1])
    ];
  }

  callback(state);
}

function fillBasicPlan(
  tariffs,
  { matr, maxEl, colsDiferencias, rowsDiferencias, demanda, oferta }
) {
  let curMatr = matr.map(el => Array.from(el));
  let curColsDiferencias = [...colsDiferencias];
  let curRowsDiferencias = [...rowsDiferencias];
  let curDemanda = [...demanda];
  let curOferta = [...oferta];

  if (maxEl.arrName === "colsArr") {
    let arr = getColumnArray(tariffs, maxEl.elIndex); //Obtener una matriz de una columna con la máxima diferencia.
    //Ganancia de columna con la máxima diferencia.
    arr = arr
      .map((el, index) => ({
        //Clasificación ascendente. Ordenar la matriz resultante en orden ascendente
        el,
        index
      }))
      .sort((a, b) => a.el - b.el);

    let k = 0;

    while (curOferta[arr[k].index] <= 0) {
      k++;
    }

    curMatr[arr[k].index][maxEl.elIndex] = Math.min(
      curDemanda[maxEl.elIndex],
      curOferta[arr[k].index]
    );
    curDemanda[maxEl.elIndex] =
      curDemanda[maxEl.elIndex] - curMatr[arr[k].index][maxEl.elIndex];
    curOferta[arr[k].index] =
      curOferta[arr[k].index] - curMatr[arr[k].index][maxEl.elIndex];
  } else {
    let arr = tariffs[maxEl.elIndex];
    arr = arr
      .map((el, index) => ({
        el,
        index
      }))
      .sort((a, b) => a.el - b.el);

    let k = 0;

    while (curDemanda[arr[k].index] <= 0) {
      k++;
    }

    curMatr[maxEl.elIndex][arr[k].index] = Math.min(
      curDemanda[arr[k].index],
      curOferta[maxEl.elIndex]
    );
    curDemanda[arr[k].index] =
      curDemanda[arr[k].index] - curMatr[maxEl.elIndex][arr[k].index];
    curOferta[maxEl.elIndex] =
      curOferta[maxEl.elIndex] - curMatr[maxEl.elIndex][arr[k].index];
  }

  curColsDiferencias.forEach((el, index) => {
    curColsDiferencias[index] = getDiferenciaMinEls(
      getColumnArray(tariffs, index).filter((el, ind) => {
        return curOferta[ind] > 0;
      })
    );
    if (curDemanda[index] === 0) {
      curColsDiferencias[index] = null;
    }
  });

  curRowsDiferencias.forEach((el, index) => {
    curRowsDiferencias[index] = getDiferenciaMinEls(
      tariffs[index].filter((el, ind) => {
        return curDemanda[ind] > 0;
      })
    );
    if (curOferta[index] === 0) {
      curRowsDiferencias[index] = null;
    }
  });

  const mEl = encontrarMaxDiferencia(curRowsDiferencias, curColsDiferencias);

  return {
    matr: curMatr,
    maxEl: mEl,
    colsDiferencias: curColsDiferencias,
    rowsDiferencias: curRowsDiferencias,
    curOfertaVolume: sumarArray(curOferta),
    curDemandaVolume: sumarArray(curDemanda),
    demanda: curDemanda,
    oferta: curOferta
  };
}

function encontrarMaxDiferencia(rowsArr, colsArr) {
  const rowsMax = Math.max(...rowsArr);
  const colsMax = Math.max(...colsArr);

  const maxEl = {};
  if (rowsMax > colsMax) {
    maxEl.arrName = "rowsArr";
    maxEl.elIndex = rowsArr.indexOf(rowsMax);
  } else {
    maxEl.arrName = "colsArr";
    maxEl.elIndex = colsArr.indexOf(colsMax);
  }
  return maxEl;
}

//búsqueda de diferencias
function encontrarMatrizDiferencias(matriz) {
  let colsDiferencias = matriz[0].map((el, index) =>
    getDiferenciaMinEls(getColumnArray(matriz, index))
  );
  let rowsDiferencias = matriz.map((el, index) => getDiferenciaMinEls(el));

  return {
    colsDiferencias: colsDiferencias,
    rowsDiferencias: rowsDiferencias
  };
}

//Esta funcion solo es utilizada en los metodos anteriores
//devuelve la diferencia entre los dos elementos mínimos del conjunto.
// devuelve la diferencia de los dos elementos mínimos de la matriz.
function getDiferenciaMinEls(arr) {
  let array = [...arr].sort((a, b) => a - b);
  return array.length > 1 ? array[1] - array[0] : 0;
}

//para crear una serie de columnas.
//crear una matriz a partir de una columna.
function getColumnArray(matriz, j) {
  let arr = [];
  matriz.forEach(element => {
    arr.push(element[j]);
  });
  return arr;
}

function getClosedMatriz(matriz, ofertaVolume, demandaVolume) {
  let matriz_actual = Array.from(matriz);

  if (ofertaVolume > demandaVolume) {
    matriz_actual = matriz_actual.map(arr => {
      return [...arr, 0];
    });
  } else if (ofertaVolume < demandaVolume) {
    matriz_actual[matriz.length] = [...Array(matriz_actual[0].length)].map(
      () => 0
    );
  }
  return matriz_actual;
}

const sumarArray = arr => {
  return arr.reduce((prev, next) => prev + next);
};

export default solveMatriz;
