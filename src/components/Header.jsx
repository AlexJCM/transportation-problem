import React from "react";
import logo from "../assets/logo.svg";

const Header = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>Investigación de operaciones</p>
    <a className="App-link" href="/" rel="noopener noreferrer">
      Problema del transporte
    </a>
    <br />
  </header>
);

export default Header;
