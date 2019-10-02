
import React from 'react';
import Square from '../Square/index';
import './style.css';

export default class Board extends React.Component {
    renderSquare(i) {
        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                id={i}
            />
        );
    }

    render() {
        var board = [];
        for (let i = 0; i < 20; i++) {
            board.push(<div className="board-row">
                {this.renderSquare(0 + 20 * i)}
                {this.renderSquare(1 + 20 * i)}
                {this.renderSquare(2 + 20 * i)}
                {this.renderSquare(3 + 20 * i)}
                {this.renderSquare(4 + 20 * i)}
                {this.renderSquare(5 + 20 * i)}
                {this.renderSquare(6 + 20 * i)}
                {this.renderSquare(7 + 20 * i)}
                {this.renderSquare(8 + 20 * i)}
                {this.renderSquare(9 + 20 * i)}
                {this.renderSquare(10 + 20 * i)}
                {this.renderSquare(11 + 20 * i)}
                {this.renderSquare(12 + 20 * i)}
                {this.renderSquare(13 + 20 * i)}
                {this.renderSquare(14 + 20 * i)}
                {this.renderSquare(15 + 20 * i)}
                {this.renderSquare(16 + 20 * i)}
                {this.renderSquare(17 + 20 * i)}
                {this.renderSquare(18 + 20 * i)}
                {this.renderSquare(19 + 20 * i)}
            </div>)
        }
        return (
            <div>
                {board}
            </div>
        );
    }
}