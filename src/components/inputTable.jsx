import React from "react";
import InputTD from "./inputTD";
import "../styles/inputTable.css";

const InputTable = props => {
  const {
    rows,
    columns,
    matrix,
    needs,
    storage,
    updMatr,
    changeNeeds,
    changeStorage
  } = props;

  const cols = [...Array(columns)];
  const rws = [...Array(rows)];

  return (
    <table id="inputTable" border="1px">
      <tbody>
        <tr>
          <td className="text" rowSpan="2">
            Origenes
          </td>
          <td className="text" colSpan={columns}>
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
        {rws.map((row, index) => (
          <tr>
            <td key={index}>
              <i>O</i>
              <sub>{index + 1}</sub>
            </td>
            {cols.map((item, j) => (
              <InputTD
                handleChange={updMatr}
                val={matrix[index][j]}
                i={index}
                j={j}
                key={`${index}:${j}`}
              />
            ))}
            <InputTD
              handleChange={changeStorage}
              val={storage[index]}
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
              handleChange={changeNeeds}
              val={needs[index]}
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
