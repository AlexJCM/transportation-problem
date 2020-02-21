import React from "react";
import "../styles/outTable.css";

const OutTable = props => {
  const {
    matriz,
    oferta,
    demanda,
    cols_diferencias = [],
    fils_diferencias = [],
    plan = [],
    maxEl
  } = props;

  return (
    <table border="1px">
      <tbody>
        <tr>
          <td className="text" rowSpan="2">
            Origenes
          </td>
          <td className="text" colSpan={matriz[0].length}>
            Destinos
          </td>
          <td className="text" rowSpan="2">
            Oferta
          </td>
          {cols_diferencias.length > 0 && fils_diferencias.length > 0 ? (
            <td className="text" rowSpan="2">
              (Penalización F.)
            </td>
          ) : null}
        </tr>
        <tr>
          {matriz[0].map((item, index) => (
            <td key={index}>
              <i>D</i>
              <sub>{index + 1}</sub>
            </td>
          ))}
        </tr>
        {matriz.map((item, index) => (
          <tr key={index}>
            <td key={index}>
              <i>O</i>
              <sub>{index + 1}</sub>
            </td>
            {matriz[index].map((item, j) => (
              <td
                className={
                  demanda[j] === 0 || oferta[index] === 0 ? "disabled" : null
                }
                datos-price={matriz[index][j]}
                key={`${index}:${j}`}
              >
                <i>{plan.length > 0 ? plan[index][j] : null}</i>
              </td>
            ))}
            <td>
              <i>{oferta[index]}</i>
            </td>
            {cols_diferencias.length > 0 && fils_diferencias.length > 0 ? (
              <td
                className={
                  maxEl.arrName === "rowsArr" && maxEl.elIndex === index
                    ? "maxDiff"
                    : null
                }
              >
                {fils_diferencias[index]}
              </td>
            ) : null}
          </tr>
        ))}
        <tr>
          <td>Demanda</td>
          {matriz[0].map((el, i) => (
            <td key={i}>
              <i>{demanda[i]}</i>
            </td>
          ))}
        </tr>
        {cols_diferencias.length > 0 && fils_diferencias.length > 0 ? (
          <tr>
            <td>(Penalización C.)</td>
            {matriz[0].map((el, index) => (
              <td
                key={index}
                className={
                  maxEl.arrName === "colsArr" && maxEl.elIndex === index
                    ? "maxDiff"
                    : null
                }
              >
                {cols_diferencias[index]}
              </td>
            ))}
          </tr>
        ) : null}
      </tbody>
    </table>
  );
};

export default OutTable;
