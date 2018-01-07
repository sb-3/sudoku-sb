import React, { Component } from 'react';

class SudokuCell extends Component {
    constructor(props) {
        super(props);
        // console.log(this);
    }
    render() {
        return (
            <div className={this.props.modifiable?"sudokuCell modifiable":"sudokuCell"} 
            onClick={() => { this.props.modifiable && this.props.onClick && this.props.onClick() }}>
                {this.props.value}
            </div>
        );
    }
}
export default SudokuCell