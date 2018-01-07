import React, { Component } from 'react';

class SudokuCell extends Component {
    // constructor(props) {
    //     super(props);
    //     // console.log(this);
    // }
    getClassName(){
        let cn = "sudokuCell";
        if(this.props && this.props.isSelected){
            cn += " selected"

        }
        if(this.props && this.props.modifiable){
            cn += " modifiable"
        }
        return cn;
    }
    set className(no){}
    render() {
        return (
            <div className={this.getClassName()}
                onClick={() => {
                    if (this.props.modifiable) {
                        this.props.onCellClick(this.props.coords);
                    }
                }
                }>
                {this.props.value}
            </div>
        );
    }
}
export default SudokuCell