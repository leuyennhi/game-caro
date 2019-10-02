/* eslint-disable react/destructuring-assignment */
import React from 'react';
import './style.css';

// eslint-disable-next-line react/prefer-stateless-function
export default class Square extends React.Component {
    render() {
        const {id, value, onClick} = this.props;
        return (
            <button type="button" className="square" onClick={() => onClick()} id={id}>
                {value}
            </button>
        );
    }
}