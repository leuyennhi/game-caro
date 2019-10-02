import React from 'react';
import Board from './component/Board/index';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(400).fill(null),
        historyCell: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      currentCell: null,
      isStepAsc: true,
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares, this.state.currentCell) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        historyCell: i,
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
      currentCell: i,
    });

  }

  restartClick() {
    this.setState({
      history: [{
        squares: Array(400).fill(null),
        historyCell: null,
      }],
      stepNumber: 0,
      xIsNext: true,
      currentCell: null,
      isStepAsc: true,
    });

    const board = document.getElementsByClassName('square');
    Array.prototype.forEach.call(board, (item) => item.removeAttribute('style'));
  }

  jumpTo(step) {
    const stepCell = this.state.history[step].historyCell;

    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      currentCell: stepCell,
    });

    const board = document.getElementsByClassName('square');
    Array.prototype.forEach.call(board, (item) => item.removeAttribute('style'));
  }

  sortStep() {
    this.setState({
      isStepAsc: !this.state.isStepAsc
    })
  }

  render() {

    const history = this.state.history;
    const current = history[this.state.stepNumber];

    const moves = history.map((step, move) => {
      var move_num = 0;

      if (move) {
        if (this.state.isStepAsc) {
          move_num = move;
        }
        else {
          move_num = history.length - move;
        }
      }

      const desc = move ?
        'Go to move #' + move_num :
        'Go to game start';
      return (
        <li key={move}>
          <button className={this.state.stepNumber === move_num ? "step-active-button" : "step-button"} onClick={() => this.jumpTo(move_num)}>{desc}</button>
        </li>
      );
    });

    const winner = calculateWinner(current.squares, this.state.currentCell);

    let status;
    if (winner) {
      status = 'Winner: ' + winner.winner;
      winner.result.forEach(element => {
        document.getElementById(element).style.color = "#eb0808";
      });
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>GAME CARO</h2>
          <div className="game">
            <div>
              <div className="status-component">
                <div className="status">{status}</div>
                <button className="restart-button" onClick={() => this.restartClick()}>
                  Restart
                </button>
              </div>

              <div>
                <Board
                  squares={current.squares}
                  onClick={(i) => this.handleClick(i)}
                />
              </div>
            </div>
            <div className="step-component">
              <button onClick={() => this.sortStep()}> {this.state.isStepAsc ? "Asc" : "Desc"} </button>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

//kiem tra hang ngang
function checkHorizontal(squares, i) {
  var count_left = 0;
  var count_right = 0;
  var result = [i];
  //di sang trai
  for (let j = i - 1; ; j--) {

    if (j < [parseInt(i / 20) * 20]) {
      break;
    }

    if (squares[j] === squares[i]) {
      result.push(j);
      count_left++;
    }
    else {
      break;
    }

  }
  //di sang phai
  for (let j = i + 1; ; j++) {

    if (j >= [parseInt(i / 20) + 1] * 20) {
      break;
    }

    if (squares[j] === squares[i]) {
      result.push(j);
      count_right++;
    }
    else {
      break;
    }

  }

  if ((count_left + count_right) >= 4) {
    //kiem tra chan 2 dau
    if ((i - count_left) === [parseInt(i / 20) * 20] || (i + count_right) === ([parseInt(i / 20) + 1] * 20 - 1)) {
      return { winner: squares[i], result: result };
    }

    if (squares[i - count_left - 1] === null || squares[i + count_right + 1] === null) {
      return { winner: squares[i], result: result };
    }
  }

  return null;
}
//kiem tra hang doc
function checkVertical(squares, i) {
  var count_up = 0;
  var count_down = 0;
  var result = [i];
  //di len
  for (let j = i - 20; ;) {

    if (j < 0) {
      break;
    }

    if (squares[j] === squares[i]) {
      count_up++;
      result.push(j);
      j -= 20;
    }
    else {
      break;
    }

  }
  //di xuong
  for (let j = i + 20; ;) {

    if (j >= 400) {
      break;
    }

    if (squares[j] === squares[i]) {
      count_down++;
      result.push(j);
      j += 20;
    }
    else {
      break;
    }

  }

  if ((count_up + count_down) >= 4) {
    //kiem tra chan 2 dau
    if ((i - count_up * 20) < 20 || (i + count_down * 20) > 379) {
      return { winner: squares[i], result: result };
    }

    if (squares[i - count_up * 20 - 20] === null || squares[i + count_down * 20 + 20] === null) {
      return { winner: squares[i], result: result };
    }
  }

  return null;
}
//kiem tra duong cheo phu
function checkDiagonal(squares, i) {
  var count_right_up = 0;
  var count_left_down = 0;
  var result = [i];
  //di len sang phai
  for (let j = i - (20 - 1); ;) {

    if (j % 20 === 0 || j < 0) {
      break;
    }

    if (squares[j] === squares[i]) {
      count_right_up++;
      result.push(j);
      j -= (20 - 1);
    }
    else {
      break;
    }

  }
  //di xuong sang trai
  for (let j = i + (20 - 1); ;) {
    if (j % 20 === 19 || j >= 400) {
      break;
    }

    if (squares[j] === squares[i]) {
      count_left_down++;
      result.push(j);
      j += (20 - 1);
    }
    else {
      break;
    }

  }

  if ((count_right_up + count_left_down) >= 4) {
    //kiem tra chan 2 dau
    if ((i - count_right_up * 19) % 20 === 19 || (i + count_left_down * 19) % 20 === 0) {
      return { winner: squares[i], result: result };
    }

    if (squares[i - count_right_up * 19 - 19] === null || squares[i + count_left_down * 19 + 19] === null) {
      return { winner: squares[i], result: result };
    }
  }

  return null;
}
//kiem tra duong cheo chinh
function checkMainDiagonal(squares, i) {
  var count_left_up = 0;
  var count_right_down = 0;
  var result = [i];
  //di len sang trai
  for (let j = i - (20 + 1); ;) {

    if (j % 20 === 19 || j < 0) {
      break;
    }

    if (squares[j] === squares[i]) {
      count_left_up++;
      result.push(j);
      j -= (20 + 1);
    }
    else {
      break;
    }

  }
  //di xuong sang phai
  for (let j = i + (20 + 1); ;) {

    if (j % 20 === 0 || j >= 400) {
      break;
    }

    if (squares[j] === squares[i]) {
      count_right_down++;
      result.push(j);
      j += (20 + 1);
    }
    else {
      break;
    }

  }

  if ((count_left_up + count_right_down) >= 4) {
    //kiem tra chan 2 dau
    if ((i - count_left_up * 19) % 20 === 0 || (i + count_right_down * 19) % 20 === 19) {
      return { winner: squares[i], result: result }
    }

    if (squares[i - count_left_up * 21 - 21] === null || squares[i + count_right_down * 21 + 21] === null) {
      return { winner: squares[i], result: result }
    }
  }

  return null;
}

function calculateWinner(squares, i) {
  if (checkHorizontal(squares, i)) {
    return checkHorizontal(squares, i);
  }
  else if (checkVertical(squares, i)) {
    return checkVertical(squares, i);
  }
  else if (checkDiagonal(squares, i)) {
    return checkDiagonal(squares, i);
  }
  else if (checkMainDiagonal(squares, i)) {
    return checkMainDiagonal(squares, i);
  }
  return null;
}
