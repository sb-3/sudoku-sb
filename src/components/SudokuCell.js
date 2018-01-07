import React, { Component } from 'react';
// import { ReactRadial } from 'react-radial';
// import PieMenu, { Slice } from 'react-pie-menu';

// function PieSelelect(values, onSelect) {
//     <PieMenu
//         radius='125px'
//         centerRadius='30px'
//         centerX={mouseX}
//         centerY={mouseY}
//     >
//         {values.map(v => {
//             return (
//                 <Slice onSelect={() => {
//                     onSelect(v);
//                 }}></Slice>
//             );
//         })}
//     </PieMenu>
// }
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
        if (this.props && this.props.coords && this.props.coords.length === 3) {
            cn += this.props.coords[2] % 2 === 0 ? " evenBlock" : " oddBlock";
        }
        return cn;
    }
    set className(no) { }
    // renderPieMenu() {
    //     console.log(this.state.mousePosition)
    //     return (<PieMenu
    //         radius='125px'
    //         centerRadius='20px'
    //         centerX={this.state.mousePosition[0]+"px"}
    //         centerY={this.state.mousePosition[1]+"px"}
    //     >
    //         {this.props.possibleChoices.map(v => {
    //             return (
    //                 <Slice 
    //                 contentStyle={{ color: 'black'}}
    //                 // containerStyle={{background:"lightgrey"}}
    //                 onMouseOver={() => {
    //                     console.log("pie select", v);
    //                     this.props.setCell(v);
    //                     this.setState({ editable: false });
    //                 }}>{v}</Slice>
    //             );
    //         })}
    //     </PieMenu>);
    // }
    render() {
        const that = this;
        // if (this.state.editable) {
        //     return (<PieMenu
        //         radius='125px'
        //         centerRadius='30px'
        //     // centerX={this.props.mousePosition[0]}
        //     // centerY={this.props.mousePosition[1]}
        //     >
        //         {this.props.possibleChoices.map(v => {
        //             return (
        //                 <Slice onSelect={() => {
        //                     console.log("pie select", v);
        //                     this.props.setCell(v);
        //                     this.setState({ editable: false });
        //                 }}></Slice>
        //             );
        //         })}
        //     </PieMenu>);

        //     // return (
        //     //     <div className={this.getClassName()}>
        //     //         <select value={this.props.value} size={this.props.possibleChoices.length} onChange={(evt) => {
        //     //             // console.log("changed", evt.target);
        //     //             this.props.setCell(evt.target.value);

        //     //             this.setState({ editable: false });
        //     //         }}>
        //     //             {this.props.possibleChoices.map(value => (<option value={value}> {value}</option>))}
        //     //         </select>
        //     //     </div>);


        // } else {
        return (
            <div className={this.getClassName()}
                onClick={(e) => {
                    // console.log(e.target);
                    if (this.props.modifiable) {
                        // this.setState({ editable: true, mousePosition: [e.clientX, e.clientY] });
                        this.props.onCellClick({ coords: this.props.coords, mousePosition: [e.clientX, e.clientY] });
                    }
                }}>
                {this.props.value}
                {/* {(() => {
                    if (this.state.editable) {
                        return this.renderPieMenu();
                    }
                })()} */}
            </div>
        );
        // }

    }
}
export default SudokuCell