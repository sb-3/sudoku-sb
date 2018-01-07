import React, { Component } from 'react';
// import { ReactRadial } from 'react-radial';
class SudokuCell extends Component {
    constructor(props) {
        super(props);
        // console.log(this);
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
        if(this.props && this.props.coords && this.props.coords.length===3){
            cn += this.props.coords[2] % 2 ==0?" evenBlock":" oddBlock";
        }
        return cn;
    }
    set className(no) { }
    render() {
        const that = this;
        if (this.state.editable) {
            return (
                <div className={this.getClassName()}>
                    <select value={this.props.value} size={this.props.possibleChoices.length} onChange={(evt) => {
                        // console.log("changed", evt.target);
                        this.props.setCell(evt.target.value);

                        this.setState({ editable: false });
                    }}>
                        {this.props.possibleChoices.map(value => (<option value={value}> {value}</option>))}
                    </select>
                </div>);
            // return (
            //     <div className={this.getClassName()}>
            //         <ReactRadial value={this.props.value} buttons={this.props.possibleChoices}
            //             buttonFunctions={
            //                 this.props.possibleChoices.map((value) => () => {
            //                     this.props.setCell(value);

            //                     this.setState({ editable: false });
            //                 }

            //                 )} />

            //     </div>);
        } else {
            return (
                <div className={this.getClassName()}
                    onClick={() => {
                        if (this.props.modifiable) {
                            this.setState({ editable: true });
                            // this.props.onCellClick(this.props.coords);
                        }
                    }
                    }>
                    {this.props.value}
                </div>
            );
        }

    }
}
export default SudokuCell