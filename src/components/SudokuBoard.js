import React, { Component } from 'react';
import SudokuCell from './SudokuCell';

class SudokuBoard extends Component {
    static generateBoardArray(str) {
        const arr = []
        let row = -1;
        str.split("").forEach((value, index) => {
            if (index % 9 === 0) {
                row++
                arr[row] = [];
            }
            arr[row].push(value);
        });
        return arr;
    }
    constructor(props) {
        super(props);
        const cells = this.constructor.generateBoardArray(props.startSudoku);
        //   debugger
        // this.originalCells = cells.slice()
        this.state = {
            cells: cells.slice(),
            originalCells: this.constructor.generateBoardArray(props.startSudoku)//we want this to never change
        }
        console.log(this);
    }
    static getBlockCoords([rowIndex, columnIndex]) {
        return [Math.floor(rowIndex / 3), Math.floor(columnIndex / 3)];
    }
    getRowValues([rowIndex, columnIndex]) {
        const values = [];
        this.state.cells[rowIndex].forEach((v, columnIndexInLoop) => {
            if (columnIndex !== columnIndexInLoop) {
                values.push(v);
            }
        });
        return values;
    }
    getColumnValues([rowIndex, columnIndex]) {
        const values = [];
        this.state.cells.forEach((row, rowIndexInLoop) => {
            if (rowIndex !== rowIndexInLoop) {
                values.push(row[columnIndex]);
            }
        });
        return values;
    }

    getBlockValues([rowIndex, columnIndex]) {
        const values = [];
        const blockIndex = this.constructor.getBlockCoords([rowIndex, columnIndex]);
        for (let r = 0; r < 9; r++) {
            for (let c; c < 9; c++) {
                if (rowIndex !== r &&
                    columnIndex !== c &&
                    blockIndex === this.constructor.getBlockCoords([r, c])) {
                    values.push(this.state.cells[r][c]);
                }
            }
        }
        return values;
    }
    getPossibleValues(coords) {
        const rowValues = this.getRowValues(coords);
        const columnValues = this.getColumnValues(coords);
        const blockValues = this.getBlockValues(coords);
        console.log(rowValues, columnValues, blockValues);
        return ["."].concat(["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(pv => {
            return rowValues.indexOf(pv) === -1
                &&
                columnValues.indexOf(pv) === -1
                &&
                blockValues.indexOf(pv) === -1
        }))
    }
    onCellClick(coords) {
        console.log(coords);
        this.state.possibleChoices = this.getPossibleValues(coords);
        this.state.selectedCellCoords = coords;
        this.setState(this.state);
    }
    setSelectedCell(value) {
        this.state.cells[this.state.selectedCellCoords[0]][this.state.selectedCellCoords[1]] = value;
        this.setState(this.state);
    }
    renderPossibleChoices() {
        if (this.state.possibleChoices) {
            return (
                <div className="possibleChoicesContainer">
                    <select className="possibleChoices" size={this.state.possibleChoices.length}>
                        {this.state.possibleChoices.map(value => (<option onClick={() => { this.setSelectedCell(value) }} value={value}> {value}</option>))}
                    </select>
                </div>);
        }

    }
    renderGameBoard() {
        return (
            <div className="sudokuBoard">
                {this.state.cells.map((row, rowIndex) => {
                    return (
                        <div className="sudokuRow" >
                            {row.map((value, columnIndex) => {
                                // console.log(columnIndex + "" + rowIndex);
                                return (<SudokuCell key={columnIndex + "" + rowIndex}
                                    value={value}
                                    modifiable={
                                        isNaN(this.state.originalCells[rowIndex][columnIndex])
                                    }
                                    possibleValues={this.getPossibleValues([rowIndex,columnIndex])}
                                    onClick={() => { this.onCellClick([rowIndex, columnIndex]) }} />)
                            })}
                        </div>
                    )
                })}
            </div>
        );
    }

    render() {
        return (<div>
            {this.renderGameBoard()}
            {this.renderPossibleChoices()}
        </div>);
    }
}
export default SudokuBoard