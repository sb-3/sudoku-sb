import React, { Component } from 'react';
class SudokuCell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            editable: false
        }
    }
    getClassName() {
        let cn = "sudokuCell";
        if (this.props && this.props.isSelected) {
            cn += " selected"

        }
        if (this.props && !this.props.isValid) {
            cn += " invalid"
        }
        if (this.props && this.props.modifiable) {
            cn += " modifiable"
        }
        if (this.state && this.state.editable) {
            cn += " editable"
        }
        if (this.props && this.props.coords && this.props.coords.length === 3) {
            cn += this.props.coords[2] % 2 === 0 ? " evenBlock" : " oddBlock";
        }
        return cn;
    }

    render() {

        return (
            <div className={this.getClassName()}
                onClick={(e) => {
                    this.props.onCellClick({ coords: this.props.coords, mousePosition: [e.pageX, e.pageY] });
                }}>
                {this.props.value}
            </div>
        );

    }
}
export default SudokuCell