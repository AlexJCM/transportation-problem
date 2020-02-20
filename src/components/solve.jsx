import React from "react";
import { connect } from "react-redux";
import OutTable from "./outTable";
import "../styles/solve.css";

const Solve = props => {
  const {
    ofertaVolume,
    demandaVolume,
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
        {ofertaVolume !== demandaVolume ? "(SE NECESITA)" : "(NO SE NECESITA)"}
      </p>
      <center>
        <p>
          &sum; Oferta <sub>Total</sub>=<b>{ofertaVolume}</b>
        </p>
        <p>
          &sum; Demanda <sub>Total</sub>=<b>{demandaVolume}</b>
        </p>
      </center>

      <center>
        <p>
          &sum; Oferta <sub>T</sub>{" "}
          {ofertaVolume > demandaVolume
            ? ">"
            : ofertaVolume < demandaVolume
            ? "<"
            : "="}{" "}
          &sum; Demanda <sub>T</sub> - El modelo esta{" "}
          {ofertaVolume !== demandaVolume ? "DESEQUILIBRADO " : "EQUILIBRADO"}
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
  ofertaVolume: state.solve.ofertaVolume,
  demandaVolume: state.solve.demandaVolume,
  closedMatriz: state.solve.closedMatriz,
  starter_demanda: state.solve.starter_demanda,
  starter_oferta: state.solve.starter_oferta,
  solve: state.solve.solve
}))(Solve);
