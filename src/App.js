import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "./components/main";
import Solve from "./components/solve";
import Header from "./components/Header";
import "./styles/App.css";
import { updateState } from "./actions/actionCreator";
import solveMatriz from "./utils/utils";

class App extends Component {
  render() {
    const { matriz, oferta, demanda, updateState } = this.props;
    solveMatriz(matriz, oferta, demanda, updateState);
    return (
      <div className="App">
        <Header />
        <h1>Método de Aproximación de Vogel</h1>
        <Main />
        <Solve />
      </div>
    );
  }
}

export default connect(
  ({ matriz }) => ({
    matriz: matriz.datos,
    oferta: matriz.oferta,
    demanda: matriz.demanda
  }),
  { updateState }
)(App);
