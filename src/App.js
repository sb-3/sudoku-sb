import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SudokuBoard from './components/SudokuBoard';

class App extends Component {
  constructor() {
    super();
    // console.log(this);
    // this._value = "nothing";
    // this.state = { value: "nothing" };
    this.state = {
      startSudoku:
        "3.542.81.4879.15.6.29.5637485.793.416132.8957.74.6528.2413.9.655.867.192.965124.8"
        
    }
    this.state.boardInstance = new SudokuBoard({startSudoku:this.state.startSudoku});
  }
  render() {
    return (
      <div className="App">
        {this.state.boardInstance.render()}
      </div>
    )
  }
}

export default App;
