import React from "react";
import Select from "./select.jsx";
import InputTable from "./inputTable";
import { connect } from "react-redux";
import {
  cambiarCantidadOrigenes,
  cambiarCantidadDestinos,
  actualizarMatriz,
  cambiarDemanda,
  cambiarOferta
} from "../actions/actionCreator";
import "../styles/main.css";

const Main = props => {
  const {
    cantidad_origenes,
    cantidad_destinos,
    matriz,
    demanda,
    oferta
  } = props;

  const cambiarCantidadDestinos = colsCount => {
    const { cambiarCantidadDestinos } = props;
    cambiarCantidadDestinos(colsCount);
  };

  const cambiarCantidadOrigenes = cantidad_origenes => {
    const { cambiarCantidadOrigenes } = props;
    cambiarCantidadOrigenes(cantidad_origenes);
  };

  const cambiarDemanda = (i, j, val) => {
    const { cambiarDemanda } = props;
    demanda[j] = val;
    cambiarDemanda([...demanda]);
  };

  const cambiarOferta = (i, j, val) => {
    const { cambiarOferta } = props;
    oferta[i] = val;
    cambiarOferta([...oferta]);
  };

  const updMatr = (i, j, val) => {
    const { actualizarMatriz } = props;
    let m = Array.from(matriz);
    m[i][j] = val;
    actualizarMatriz(m);
  };

  const clearTable = () => {
    cambiarCantidadOrigenes(cantidad_origenes);
  };

  const checkData = () => {
    if (
      matriz.indexOf("") !== -1 ||
      demanda.indexOf("") !== -1 ||
      oferta.indexOf("") !== -1
    ) {
      alert("Rellene todos los Campos-!");
      return;
    }
  };

  return (
    <div>
      <Select
        handleChange={cambiarCantidadOrigenes}
        val={cantidad_origenes}
        text="Número de Origenes:"
      />
      <Select
        handleChange={cambiarCantidadDestinos}
        val={cantidad_destinos}
        text="Número de Destinos:"
      />
      <InputTable
        matriz={matriz}
        demanda={demanda}
        oferta={oferta}
        updMatr={updMatr}
        cambiarDemanda={cambiarDemanda}
        cambiarOferta={cambiarOferta}
        filas={cantidad_origenes}
        columnas={cantidad_destinos}
      />
      <div className="btns-block">
        <button onClick={clearTable} id="resetTable">
          Limpiar Tabla
        </button>
        <button onClick={checkData} id="resolveTable">
          Calcular
        </button>
      </div>
    </div>
  );
};

export default connect(
  state => ({
    cantidad_origenes: state.matriz.cantidad_origenes,
    cantidad_destinos: state.matriz.cantidad_destinos,
    matriz: state.matriz.datos,
    demanda: state.matriz.demanda,
    oferta: state.matriz.oferta
  }),
  {
    cambiarCantidadOrigenes,
    cambiarCantidadDestinos,
    actualizarMatriz,
    cambiarDemanda,
    cambiarOferta
  }
)(Main);
