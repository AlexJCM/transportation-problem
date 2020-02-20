import React from "react";
import { connect } from "react-redux";
import OutTable from "./outTable";
import "../styles/solve.css";

const Solve = props => {
  const {
    storageVolume,
    needsVolume,
    closedMatrix,
    starterNeeds,
    starterStorage,
    solve
  } = props;

  return (
    <section className="solve">
      <h2>La solución:</h2>
      <p>
        Primero determinemos si necesitamos entrar en un proveedor o consumidor
        ficticio:{" "}
        {storageVolume !== needsVolume ? "(necesita)" : "(no necesita)"}
      </p>
      <div className="volume">
        <p>
          Suministro total: <b>{storageVolume}</b>
        </p>
        <p>
          Necesidades totales: <b>{needsVolume}</b>
        </p>
        <p>
          &sum; Oferta{" "}
          {storageVolume > needsVolume
            ? ">"
            : storageVolume < needsVolume
            ? "<"
            : "="}{" "}
          &sum; Demanda = El modelo esta{" "}
          {storageVolume !== needsVolume ? "desequilibrado" : "equilibrado"}
        </p>
      </div>
      <p>
        Como resultado, obtenemos un modelo equilibrado del problema de transporte:{" "}
      </p>
      {closedMatrix && (
        <OutTable
          matrix={closedMatrix}
          storage={starterStorage}
          needs={starterNeeds}
        />
      )}
      <h3>Solución paso a paso:</h3>
      {solve.map(solve => (
        <OutTable
          matrix={closedMatrix}
          storage={solve.storage}
          needs={solve.needs}
          colsDiffs={solve.colsDiffs}
          rowsDiffs={solve.rowsDiffs}
          plan={solve.matr}
          maxEl={solve.maxEl}
        />
      ))}
      <h3>
        El costo de transporte según el plan es igual a:{" "}
        {solve[solve.length - 1].matr
          ? findPrice(closedMatrix, solve[solve.length - 1].matr)
          : "Ninguna solución"}
      </h3>
    </section>
  );
};

function findPrice(tariffs, plan) {
  let price = 0;
  for (let i = 0; i < plan.length; i++) {
    for (let j = 0; j < plan[0].length; j++) {
      if (plan[i][j] !== "") {
        price += plan[i][j] * tariffs[i][j];
      }
    }
  }
  return price;
}

export default connect(state => ({
  storageVolume: state.solve.storageVolume,
  needsVolume: state.solve.needsVolume,
  closedMatrix: state.solve.closedMatrix,
  starterNeeds: state.solve.starterNeeds,
  starterStorage: state.solve.starterStorage,
  solve: state.solve.solve
}))(Solve);
