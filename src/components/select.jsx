import React from "react";
import "../styles/select.css";

let options = [];

for (let i = 1; i <= 10; i++) {
  options.push(React.createElement("option", { value: i, key: i }, i));
}

const Select = ({ val, id, text, handleChange }) => (
  <div className="select">
    <center>
      <label htmlFor={id}>{text} </label>
      <select
        value={val}
        onChange={e => handleChange(+e.target.value)}
        name={id}
        id={id}
      >
        {[...options]}
      </select>
    </center>
  </div>
);

export default Select;
