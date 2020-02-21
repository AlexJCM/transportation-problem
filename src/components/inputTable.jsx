import React from "react";
import InputTD from "./inputTD";
import "../styles/inputTable.css";

const InputTable = props => {
  const {
    filas, //rows
    columnas, //columns
    matriz,
    demanda,
    oferta,
    updMatr,
    cambiarDemanda,
    cambiarOferta
  } = props;

  const cols = [...Array(columnas)];
  const fils = [...Array(filas)]; //rws

  return (
    <table id="inputTable" border="1px">
      <tbody>
        <tr>
          <td className="text" rowSpan="2">
            Origenes
          </td>
          <td className="text" colSpan={columnas}>
            Destinos
          </td>
          <td className="text" rowSpan="2">
            Oferta
          </td>
        </tr>
        <tr>
          {cols.map((item, index) => (
            <td key={index}>
              <i>D</i>
              <sub>{index + 1}</sub>
            </td>
          ))}
        </tr>
        {fils.map((row, index) => (
          <tr key={index + "i"}>
            <td key={index}>
              <i>O</i>
              <sub>{index + 1}</sub>
            </td>
            {cols.map((item, j) => (
              <InputTD
                handleChange={updMatr}
                val={matriz[index][j]}
                i={index}
                j={j}
                key={`${index}:${j}`}
              />
            ))}
            <InputTD
              handleChange={cambiarOferta}
              val={oferta[index]}
              i={index}
              j={100}
              color="green"
              key={`${index}:${100}`}
            />
          </tr>
        ))}
        <tr>
          <td className="text">Demanda</td>
          {cols.map((item, index) => (
            <InputTD
              handleChange={cambiarDemanda}
              val={demanda[index]}
              i={100}
              j={index}
              color="green"
              key={`${100}:${index}`}
            />
          ))}
        </tr>
      </tbody>
    </table>
  );
};
export default InputTable;
