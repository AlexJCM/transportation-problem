import React from "react";
import { connect } from "react-redux";
import OutTable from "./outTable";
import "../styles/solve.css";

const Solve = props => {
  const {
    oferta_volume,
    demanda_volume,
    closed_matriz,
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
        Primero determinamos si necesitamos crear un origen o destino ficticio,
        en este caso{" "}
        {oferta_volume !== demanda_volume ? (
          <strong> SI SE NECESITA</strong>
        ) : (
          <strong> NO SE NECESITA</strong>
        )}
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
          {oferta_volume !== demanda_volume ? (
            <strong>DESEQUILIBRADO</strong>
          ) : (
            <strong>EQUILIBRADO</strong>
          )}
        </p>
      </center>

      <center>
        <b>
          <p>Modelo Equilibrado</p>
        </b>
      </center>
      {closed_matriz && (
        <OutTable
          matriz={closed_matriz}
          oferta={starter_oferta}
          demanda={starter_demanda}
        />
      )}
      <h3>Solución paso a paso:</h3>
      {solve.map((solve, i) => (
        <OutTable
          key={i}
          matriz={closed_matriz}
          oferta={solve.oferta}
          demanda={solve.demanda}
          colsDiferencias={solve.colsDiferencias}
          rowsDiferencias={solve.rowsDiferencias}
          plan={solve.matr}
          maxEl={solve.maxEl}
        />
      ))}
      <h3>Solución Degradada :</h3>
      <p>Para conocer si la solución es degradada:</p>
      <center>
        <p>M + N – 1 = Número de Asignaciones Básicas</p>
      </center>
      <p>Siendo:</p>
      <center>
        <p>M = Número de Filas = {starter_oferta.length}</p>
        <p>N = Número de Columnas = {starter_demanda.length}</p>
        {starter_oferta.length + starter_demanda.length - 1}
        {starter_oferta.length + starter_demanda.length - 1 ===
        numAsignaciones(closed_matriz, solve[solve.length - 1].matr)
          ? " ="
          : starter_oferta.length + starter_demanda.length - 1 <
            numAsignaciones(closed_matriz, solve[solve.length - 1].matr)
          ? " <"
          : " >"}{" "}
        {numAsignaciones(closed_matriz, solve[solve.length - 1].matr)}
        <br></br>
        La Solucion{" "}
        {starter_oferta.length + starter_demanda.length - 1 ===
        numAsignaciones(closed_matriz, solve[solve.length - 1].matr)
          ? "NO ES DEGRADADA"
          : "ES DEGRADADA"}
      </center>
      <h3>
        El costo de transporte es igual a :{" "}
        {solve[solve.length - 1].matr
          ? findPrice(closed_matriz, solve[solve.length - 1].matr)
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

function numAsignaciones(tariffs, plan) {
  let num_asignaciones = 0;
  for (let i = 0; i < plan.length; i++) {
    for (let j = 0; j < plan[0].length; j++) {
      if (plan[i][j] !== "") {
        num_asignaciones = num_asignaciones + 1;
      }
    }
  }
  return num_asignaciones;
}

export default connect(state => ({
  oferta_volume: state.solve.oferta_volume,
  demanda_volume: state.solve.demanda_volume,
  closed_matriz: state.solve.closed_matriz,
  starter_demanda: state.solve.starter_demanda,
  starter_oferta: state.solve.starter_oferta,
  solve: state.solve.solve
}))(Solve);
