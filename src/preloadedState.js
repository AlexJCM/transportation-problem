//Para asignar al estado una matriz para que cuando cargue la página sea utilizado
/*Sol. Optima
const state = {
  matrix: {
    rowsCount: 3,
    columnsCount: 4,
    data: [
      [8, 9, 10, 11],
      [10, 15, 7, 6],
      [8, 10, 14, 20]
    ],
    needs: [250, 450, 250, 600],
    storage: [450, 550, 300]
  }
};
*/
/*Sol. Optima
const state = {
  matrix: {
    rowsCount: 2,
    columnsCount: 3,
    data: [
      [10, 30, 10],
      [20, 10, 10]
    ],
    needs: [20, 22, 14],
    storage: [26, 30]
  }
};
*/

/*Ejercicio 7.2.2*/
const state = {
  matrix: {
    rowsCount: 2,
    columnsCount: 3,
    data: [
      [3, 5, 7],
      [4, 7, 11]
    ],
    needs: [20,25,35],
    storage: [30,50]
  }
};
/**/

/*Lit. 1-Ejercicio B Sol. Optima
const state = {
  matrix: {
    rowsCount: 3,
    columnsCount: 5,
    data: [
      [4,3,5,2,2],
      [6,7,5,5,4],
      [5,5,7,3,4]
    ],
    needs: [8,4,6,10,12],
    storage: [15,15,10]
  }
};
*/

/*Lit. 1-Ejercicio C Sol. optima

const state = {
  matrix: {
    rowsCount: 3,
    columnsCount: 5,
    data: [
      [8,10,9,8,7],
      [9,5,4,6,9],
      [10,8,5,8,8]
    ],
    needs: [5,6,4,8,7],
    storage: [8,10,12]
  }
};
*/




/*Lit. 1-Ejercicio A Sol. Factible Con MODI=205
const state = {
  matrix: {
    rowsCount: 3,
    columnsCount: 4,
    data: [
      [5, 6, 7, 5],
      [9, 10, 9, 6],
      [3, 4, 4, 2]
    ],
    needs: [9,8,11,8],
    storage: [12,14,10]
  }
};
*/

/*Lit. 3-Ejercicio A Sol. Factible Con MODI = 173
const state = {
  matrix: {
    rowsCount: 3,
    columnsCount: 4,
    data: [
      [5,6,7,5],
      [9,10,9,6],
      [3,4,4,2]
    ],
    needs: [9,8,11,8],
    storage: [15,10,15]
  }
};
*/
export default state;
