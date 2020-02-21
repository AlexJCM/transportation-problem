//Este metodo es el principal y es llamado desde App.js
//y utiliza el resto de metodos de este archivo
function solveMatriz(matrizTariffs, oferta, demanda, callback) {
  let state = {};

  state.solve = [];

  state.oferta_volume = sumarArray(oferta);
  state.demanda_volume = sumarArray(demanda);

  state.closed_matriz = getClosedMatriz(
    matrizTariffs,
    state.oferta_volume,
    state.demanda_volume
  );

  let starter_demanda = Array.from(demanda);
  if (state.oferta_volume > state.demanda_volume) {
    starter_demanda[starter_demanda.length] =
      state.oferta_volume - state.demanda_volume;
  }
  state.starter_demanda = starter_demanda;

  let starter_oferta = Array.from(oferta);
  if (state.oferta_volume < state.demanda_volume) {
    starter_oferta[starter_oferta.length] =
      state.demanda_volume - state.oferta_volume;
  }
  state.starter_oferta = starter_oferta;

  const diferencias = encontrarMatrizDiferencias(state.closed_matriz);
  const maxEl = encontrarMaxDiferencia(
    diferencias.fils_diferencias,
    diferencias.cols_diferencias
  );
  const matr = state.closed_matriz.map(arr => arr.map(el => ""));

  state.solve[0] = {
    matr,
    maxEl,
    ...diferencias,
    curOfertaVolume: state.oferta_volume,
    curDemandaVolume: state.demanda_volume,
    demanda: starter_demanda,
    oferta: starter_oferta
  };

  while (
    state.solve[state.solve.length - 1].curOfertaVolume > 0 ||
    state.solve[state.solve.length - 1].curDemandaVolume > 0
  ) {
    state.solve = [
      ...state.solve,
      fillBasicPlan(state.closed_matriz, state.solve[state.solve.length - 1])
    ];
  }

  callback(state);
}

function fillBasicPlan(
  tariffs,
  { matr, maxEl, cols_diferencias, fils_diferencias, demanda, oferta }
) {
  let curMatr = matr.map(el => Array.from(el));
  let curColsDiferencias = [...cols_diferencias];
  let curRowsDiferencias = [...fils_diferencias];
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
    cols_diferencias: curColsDiferencias,
    fils_diferencias: curRowsDiferencias,
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
  let cols_diferencias = matriz[0].map((el, index) =>
    getDiferenciaMinEls(getColumnArray(matriz, index))
  );
  let fils_diferencias = matriz.map((el, index) => getDiferenciaMinEls(el));

  return {
    cols_diferencias: cols_diferencias,
    fils_diferencias: fils_diferencias
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

function getClosedMatriz(matriz, oferta_volume, demanda_volume) {
  let matriz_actual = Array.from(matriz);

  if (oferta_volume > demanda_volume) {
    matriz_actual = matriz_actual.map(arr => {
      return [...arr, 0];
    });
  } else if (oferta_volume < demanda_volume) {
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
