import React from "react";
import Select from "./select.jsx";
import InputTable from "./inputTable";
import { connect } from "react-redux";
import {
  changeRowsCount,
  changeColumnsCount,
  updateMatriz,
  changeDemanda,
  changeOferta
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

  const changeColumnsCount = colsCount => {
    const { changeColumnsCount } = props;
    changeColumnsCount(colsCount);
  };

  const changeRowsCount = cantidad_origenes => {
    const { changeRowsCount } = props;
    changeRowsCount(cantidad_origenes);
  };

  const changeDemanda = (i, j, val) => {
    const { changeDemanda } = props;
    demanda[j] = val;
    changeDemanda([...demanda]);
  };

  const changeOferta = (i, j, val) => {
    const { changeOferta } = props;
    oferta[i] = val;
    changeOferta([...oferta]);
  };

  const updMatr = (i, j, val) => {
    const { updateMatriz } = props;
    let m = Array.from(matriz);
    m[i][j] = val;
    updateMatriz(m);
  };

  const clearTable = () => {
    changeRowsCount(cantidad_origenes);
  };

  const checkData = () => {
    if (
      matriz.indexOf("") !== -1 ||
      demanda.indexOf("") !== -1 ||
      oferta.indexOf("") !== -1
    ) {
      alert("Rellene Todos los Campos");
      return;
    }
  };

  return (
    <div>
      <Select
        handleChange={changeRowsCount}
        val={cantidad_origenes}
        text="Número de Origenes:"
      />
      <Select
        handleChange={changeColumnsCount}
        val={cantidad_destinos}
        text="Número de Destinos:"
      />
      <InputTable
        matriz={matriz}
        demanda={demanda}
        oferta={oferta}
        updMatr={updMatr}
        changeDemanda={changeDemanda}
        changeOferta={changeOferta}
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
    changeRowsCount,
    changeColumnsCount,
    updateMatriz,
    changeDemanda,
    changeOferta
  }
)(Main);
