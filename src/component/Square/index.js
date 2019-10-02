import React from 'react';
import './style.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Square extends React.Component {
    render() {
        const {board} = this.props;
        return (
            <button type="button" className="square" onClick={() => board.onClick()} id={board.id}>
                {board.value}
            </button>
        );
    }
}