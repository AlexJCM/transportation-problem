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
     <center><h2>SOLUCIÓN</h2></center>
      <p>
        Primero determinamos si necesitamos crear en un origen o un destino ficticio en este caso :{" "}
        {storageVolume !== needsVolume ? "(SE NECESITA)" : "(NO SE NECESITA)"}
      </p>
      <div className="volume">
        <p>
         &sum; Oferta <sub>Total</sub>: <b>{storageVolume}</b>
        </p>
        <p>
         &sum; Demanda <sub>Total</sub>: <b>{needsVolume}</b>
        </p>
        <p>
        &sum; Oferta <sub>T</sub>{" "}
          {storageVolume > needsVolume
            ? ">"
            : storageVolume < needsVolume
            ? "<"
            : "="}{" "}
          &sum; Demanda <sub>T</sub> = El modelo esta{" "}
          {storageVolume !== needsVolume ? "DESEQUILIBRADO" : "EQUILIBRADO"}
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
        El costo de transporte es igual a:{" "}
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
