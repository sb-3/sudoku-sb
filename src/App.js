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
      showOnlyValid: true,
      puzzle: this.constructor.puzzles[3]
    }
    // this.state.boardInstance = new SudokuBoard({startSudoku:this.state.startSudoku});
  }
  static get puzzles() {
    return [["974236158638591742125487936316754289742918563589362417867125394253649871491873625", "974236158638591742125487936316754289742918563589362417867125394253649871491873625"]
      , ["2564891733746159829817234565932748617128.6549468591327635147298127958634849362715", "256489173374615982981723456593274861712836549468591327635147298127958634849362715"]
      , ["3.542.81.4879.15.6.29.5637485.793.416132.8957.74.6528.2413.9.655.867.192.965124.8", "365427819487931526129856374852793641613248957974165283241389765538674192796512438"]
      , ["..2.3...8.....8....31.2.....6..5.27..1.....5.2.4.6..31....8.6.5.......13..531.4..", "672435198549178362831629547368951274917243856254867931193784625486592713725316489"]
      , ["43.8...29..27....1....2............3..45.28..7............9....2....76..19...5.78", ""]
      , ["4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......", ""]
      , [`......65..915....7.8...921.41.863.9....2.4....5.197.38.489...2.9....187..72......`, ``]
      , [`..41..3.8.1....62...82..4.....3.28.9....7....7.16.8...562..17.3.3.....4.1....5...`, `294167358315489627678253491456312879983574216721698534562941783839726145147835962`]
      , [`1.......4....1.38.27.9.4...91.7...........5..86.4.5.9..3......8..9....2.4.......7`, `198563274654217389273984615915726843347198562862435791731642958589371426426859137`]
      , [`7..25..98..6....1....61.3..9....1.......8.4.9..75.28.1.94..3.......4923.61.....4.`]
      , ["1................................................................................", ""]
      , ["1....7.9..3..2...8..96..5....53..9...1..8...26....4...3......1..41.....7..7...3..", ""]
      , [".5..3.6.2642895317.37.2.8...235.47..4.6...52.571962483214...9..76.1.92343..24.17.", ""]
      , ["...1.5...14....67..8...24...63.7..1.9.......3.1..9.52...72...8..26....35...4.9...", ""]
      , ["3........97..1....6..583...2.....9..5..621..3..8.....5...435..2....9..56........1", ""]
      , ["5.6.94..3....86925892513647738629.5.154378296629451738987145362...96.......83...9", ""]
      , ["9867213453.4956..7..7.3.96..73.65..969..17..31..39.276...679.3..691437..731582694", ""]
      , ["2....8..1194762835....1..4247.....2...92..1...2.....59658927.1.913654287742183596", ""]
      , ["......6.5...3...9..8...4..1.4..2.97...........31.8..6.9..6...2..1...7...5.4......", ""]
      , ["8..........36......7..9.2...5...7.......457.....1...3...1....68..85...1..9....4..", ""]
      , ["8..........36......7..9.2...5...7.......457.....1...3...1....68..85...1..9....4..", "812753649943682175675491283154237896369845721287169534521974368438526917796318452"]]
  }
  render() {
    const that = this;
    return (
      <div className="App">
        <div>
          <SudokuBoard startSudoku={this.state.puzzle[0]} showOnlyValid={this.state.showOnlyValid} />
        </div>
        <div>
          <ul style={{ "text-align": "left" }}>
            {this.constructor.puzzles.map(puzzle => {
              return (<li onClick={() => {
                console.log("li clicked", puzzle);
                this.setState({ puzzle: puzzle.slice() });
              }}>
                {puzzle[0]}
              </li>)
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default App;
