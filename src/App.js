import React, { Component } from "react";
import { connect } from "react-redux";
import Main from "./components/main";
import Solve from "./components/solve";
import "./styles/App.css";
import { updateState } from "./actions/actionCreator";
import solveMatrix from "./utils/utils";

class App extends Component {
  render() {
    const { matrix, storage, needs, updateState } = this.props;
    solveMatrix(matrix, storage, needs, updateState);
    return (
      <div className="App">
        <h1>Método de Aproximación de Vogel</h1>
        <Main />
        <Solve />
      </div>
    );
  }
}

export default connect(
  ({ matrix }) => ({
    matrix: matrix.data,
    storage: matrix.storage,
    needs: matrix.needs
  }),
  { updateState }
)(App);
