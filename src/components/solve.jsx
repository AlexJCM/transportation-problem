import React from "react";
import { connect } from "react-redux";
import OutTable from "./outTable";
import "../styles/solve.css";

const Solve = props => {
  const {
    oferta_volume,
    demanda_volume,
    closedMatriz,
    starter_demanda,
    starter_oferta,
    solve
  } = props;

  return (
    <section className="solve">
      <center>
        <h2>SOLUCIÓN</h2>
      </center>

      <p>
        Primero determinamos si necesitamos crear en un origen o un destino
        ficticio en este caso :{" "}
        {oferta_volume !== demanda_volume
          ? "(SE NECESITA)"
          : "(NO SE NECESITA)"}
      </p>
      <center>
        <p>
          &sum; Oferta <sub>Total</sub>=<b>{oferta_volume}</b>
        </p>
        <p>
          &sum; Demanda <sub>Total</sub>=<b>{demanda_volume}</b>
        </p>
      </center>

      <center>
        <p>
          &sum; Oferta <sub>T</sub>{" "}
          {oferta_volume > demanda_volume
            ? ">"
            : oferta_volume < demanda_volume
            ? "<"
            : "="}{" "}
          &sum; Demanda <sub>T</sub> - El modelo esta{" "}
          {oferta_volume !== demanda_volume ? "DESEQUILIBRADO " : "EQUILIBRADO"}
        </p>
      </center>

      <center>
        <b>
          <p>Modelo Equilibrado</p>
        </b>
      </center>
      {closedMatriz && (
        <OutTable
          matriz={closedMatriz}
          oferta={starter_oferta}
          demanda={starter_demanda}
        />
      )}
      <h3>Solución paso a paso:</h3>
      {solve.map(solve => (
        <OutTable
          matriz={closedMatriz}
          oferta={solve.oferta}
          demanda={solve.demanda}
          colsDiferencias={solve.colsDiferencias}
          rowsDiferencias={solve.rowsDiferencias}
          plan={solve.matr}
          maxEl={solve.maxEl}
        />
      ))}
      <h3>
        El costo de transporte es igual a :{" "}
        {solve[solve.length - 1].matr
          ? findPrice(closedMatriz, solve[solve.length - 1].matr)
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
  oferta_volume: state.solve.oferta_volume,
  demanda_volume: state.solve.demanda_volume,
  closedMatriz: state.solve.closedMatriz,
  starter_demanda: state.solve.starter_demanda,
  starter_oferta: state.solve.starter_oferta,
  solve: state.solve.solve
}))(Solve);
