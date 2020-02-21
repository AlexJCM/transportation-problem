//Para asignar al estado una matriz para que cuando cargue la página sea utilizado
//Sol. Optima
// const state = {
//   matriz: {
//     cantidad_origenes: 3,
//     cantidad_destinos: 4,
//     datos: [
//       [8, 9, 10, 11],
//       [10, 15, 7, 6],
//       [8, 10, 14, 20]
//     ],
//     demanda: [250, 450, 250, 600],
//     oferta: [450, 550, 300]
//   }
// };

//Sol. Optima
const state = {
  matriz: {
    cantidad_origenes: 2,
    cantidad_destinos: 3,
    datos: [
      [10, 30, 10],
      [20, 10, 10]
    ],
    demanda: [20, 22, 14],
    oferta: [26, 30]
  }
};

/*Ejercicio 7.2.2*/
// const state = {
//   matriz: {
//     //matrix
//     cantidad_origenes: 2, //rowsCount
//     cantidad_destinos: 3, //columnsCount
//     datos: [
//       [3, 5, 7],
//       [4, 7, 11]
//     ], //data
//     demanda: [20, 25, 35], //needs
//     oferta: [30, 50] //storage
//   }
// };

//Lit. 1-Ejercicio B Sol. Optima
// const state = {
//   matriz: {
//     cantidad_origenes: 3,
//     cantidad_destinos: 5,
//     datos: [
//       [4, 3, 5, 2, 2],
//       [6, 7, 5, 5, 4],
//       [5, 5, 7, 3, 4]
//     ],
//     demanda: [8, 4, 6, 10, 12],
//     oferta: [15, 15, 10]
//   }
// };

/*Lit. 1-Ejercicio C Sol. optima
const state = {
  matriz: {
    cantidad_origenes: 3,
    cantidad_destinos: 5,
    datos: [
      [8,10,9,8,7],
      [9,5,4,6,9],
      [10,8,5,8,8]
    ],
    demanda: [5,6,4,8,7],
    oferta: [8,10,12]
  }
};
*/

/*Lit. 1-Ejercicio A Sol. Factible Con MODI=205
const state = {
  matriz: {
    cantidad_origenes: 3,
    cantidad_destinos: 4,
    datos: [
      [5, 6, 7, 5],
      [9, 10, 9, 6],
      [3, 4, 4, 2]
    ],
    demanda: [9,8,11,8],
    oferta: [12,14,10]
  }
};
*/

/*Lit. 3-Ejercicio A Sol. Factible Con MODI = 173
const state = {
  matriz: {
    cantidad_origenes: 3,
    cantidad_destinos: 4,
    datos: [
      [5,6,7,5],
      [9,10,9,6],
      [3,4,4,2]
    ],
    demanda: [9,8,11,8],
    oferta: [15,10,15]
  }
};
*/
export default state;
