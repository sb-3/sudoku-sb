import React, { Component } from 'react';
import SudokuCell from './SudokuCell';
import PieMenu, { Slice } from 'react-pie-menu';

class SudokuBoard extends Component {
    static generateBoardArray(str) {
        const arr = []
        let row = -1;
        str.split("").forEach((value, index) => {
            if (index % 9 === 0) {
                row++
                arr[row] = [];
            }
            arr[row].push(value === "." ? this.blankDisplay : value);
        });
        return arr;
    }
    constructor(props) {
        super(props);
        const cells = this.constructor.generateBoardArray(props.startSudoku);
        this.state = {
            startSudoku: props.startSudoku||".................................................................................",
            cells: cells.slice(),
            originalCells: this.constructor.generateBoardArray(props.startSudoku),//we want this to never change
            possibleChoices: [this.blankDisplay, "1", "2", "3", "4", "5", "6", "7", "8", "9"],
            renderSelect: false,
            mousePosition: [0, 0]
        }
        // console.log(this);
    }
    static getBlockCoords([rowIndex, columnIndex]) {
        return [Math.floor(rowIndex / 3), Math.floor(columnIndex / 3)];
    }
    static getBlockIndex(coords) {
        const blockCoords = this.getBlockCoords(coords);
        return (blockCoords[0] * 3) + (blockCoords[1])
    }
    static get blankDisplay() {
        return "-"
    }
    get blankDisplay() {
        return this.constructor.blankDisplay;
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
        const blockIndex = this.constructor.getBlockIndex([rowIndex, columnIndex]);
        for (let r = 0; r < 9; r++) {
            for (let c = 0; c < 9; c++) {
                if (rowIndex !== r &&
                    columnIndex !== c &&
                    blockIndex === this.constructor.getBlockIndex([r, c])) {
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
        return [this.blankDisplay].concat(["1", "2", "3", "4", "5", "6", "7", "8", "9"].filter(pv => {
            return rowValues.indexOf(pv) === -1
                &&
                columnValues.indexOf(pv) === -1
                &&
                blockValues.indexOf(pv) === -1
        }))
    }
    isCellValid(coords) {
        const cellValue = this.state.cells[coords[0]][coords[1]];
        if (cellValue === this.blankDisplay) {
            return true;
        }
        return this.getPossibleValues(coords).indexOf(cellValue) !== -1;
    }
    onCellClick(coords) {
        console.log(this.getBlockValues(coords));
        if (this.props.showOnlyValid) {
            this.setState({ selectedCellCoords: coords, possibleChoices: this.getPossibleValues(coords) });
        } else {
            this.setState({ selectedCellCoords: coords, possibleChoices: [this.blankDisplay].concat(["1", "2", "3", "4", "5", "6", "7", "8", "9"]) })
        }
    }
    setSelectedCell(value) {
        const cells = this.state.cells.slice();
        cells[this.state.selectedCellCoords[0]][this.state.selectedCellCoords[1]] = value;
        this.setState({ cells: cells });
    }
    setCellAtCoords(coords, value) {
        const cells = this.state.cells.slice();
        cells[coords[0]][coords[1]] = value;
        this.setState({ cells: cells });
    }
    renderPossibleChoices() {


        return (<PieMenu
            radius='125px'
            centerRadius='50px'
            centerX={this.state.mousePosition[0] + "px"}
            centerY={this.state.mousePosition[1]-40 + "px"}
        >
            {this.state.possibleChoices.map(v => {
                return (
                    <Slice
                        contentStyle={{ color: 'black' }}
                        onSelect={() => {
                            console.log("pie select", v);
                            this.setSelectedCell(v);
                            this.setState({ renderSelect: false });
                        }}>{v}</Slice>
                );
            })}
        </PieMenu>);
    }
    renderGameBoard() {
        if (this.state.startSudoku !== this.props.startSudoku) {
            this.setState({
                cells: this.constructor.generateBoardArray(this.props.startSudoku),
                originalCells: this.constructor.generateBoardArray(this.props.startSudoku),
                possibleChoices: [this.blankDisplay, "1", "2", "3", "4", "5", "6", "7", "8", "9"],
                renderSelect: false,
                startSudoku: this.props.startSudoku,
                selectedCellCoords: undefined
            })
        }
        return (
            <div className="sudokuBoard">
                {this.state.cells.map((row, rowIndex) => {
                    return (
                        <div className="sudokuRow" key={rowIndex}>
                            {row.map((value, columnIndex) => {
                                return (<SudokuCell key={columnIndex + "" + rowIndex}
                                    coords={[rowIndex, columnIndex, this.constructor.getBlockIndex([rowIndex, columnIndex])]}
                                    isSelected={this.state.selectedCellCoords && this.state.selectedCellCoords[0] === rowIndex && this.state.selectedCellCoords[1] === columnIndex}
                                    value={value}
                                    isValid={this.isCellValid([rowIndex, columnIndex])}
                                    possibleChoices={this.state.possibleChoices}
                                    modifiable={
                                        isNaN(this.state.originalCells[rowIndex][columnIndex]) === true
                                    }
                                    onCellClick={(cellClickArgs) => {
                                        this.setState({ mousePosition: cellClickArgs.mousePosition, renderSelect: isNaN(this.state.originalCells[rowIndex][columnIndex]) === true })
                                        this.onCellClick(cellClickArgs.coords);
                                    }}
                                    setCell={value => {
                                        this.setCellAtCoords([rowIndex, columnIndex], value)
                                    }}
                                />)
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
            {this.state.renderSelect ? this.renderPossibleChoices() : undefined}
        </div>);
    }
}
export default SudokuBoard