import React from 'react';
import './style.css';

export default class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={() => this.props.onClick()} id={this.props.id}>
                {this.props.value}
            </button>
        );
    }
}