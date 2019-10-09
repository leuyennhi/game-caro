/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-use-before-define */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import{ connect } from 'react-redux';
import Board from '../components/Board/index';
import './Game.css';
import {ModifiedHistory, Restart, ChooseStep, ChangeTypeSort } from '../actions/index';

class Game extends React.Component {
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
    const {history, stepNumber, xIsNext, currentCell} = this.state;
    const historyToSave = history.slice(0, stepNumber + 1);
    const current = historyToSave[historyToSave.length - 1];
    const currentSquares = current.squares.slice();

    if (calculateWinner(currentSquares, currentCell) || currentSquares[i]) {
      return;
    }
    currentSquares[i] = xIsNext ? 'X' : 'O';
    /* this.props.modifiedHistory(historyToSave, currentSquares, i); */

    this.setState({
      history: historyToSave.concat([{
        squares: currentSquares,
        historyCell: i,
      }]),
      stepNumber: historyToSave.length,
      xIsNext: !xIsNext,
      currentCell: i,
    });

  }

  restartClick() {
   /* this.props.restart(); */
    
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
   /* this.props.chooseStep(step); */
    
    const {history} = this.state;
    const stepCell = history[step].historyCell;

    
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
      currentCell: stepCell,
    });
  
    const board = document.getElementsByClassName('square');
    Array.prototype.forEach.call(board, (item) => item.removeAttribute('style'));
  }

  sortStep() {
    /*
    this.props.changeTypeSort();
    */
    
    const {isStepAsc} = this.state;
    this.setState({
      isStepAsc: !isStepAsc
    }) 
  }

  render() {
    const {history, stepNumber, isStepAsc, currentCell, xIsNext} = this.state;
    const current = history[stepNumber];
    const stringStep = 'Go to move #';
    const moves = history.map((step, move) => {
      let moveNum = 0;

      if (move) {
        if (isStepAsc) {
          moveNum = move;
        }
        else {
          moveNum = history.length - move;
        }
      }

      const desc = move ?
        stringStep + moveNum :
        'Go to game start';
      return (
        // eslint-disable-next-line react/no-array-index-key
        <li key={move}>
          <button type="button" className={stepNumber === moveNum ? "step-active-button" : "step-button"} onClick={() => this.jumpTo(moveNum)}>{desc}</button>
        </li>
      );
    });

    const winner = calculateWinner(current.squares, currentCell);

    let status;
    if (winner) {
      status = `Winner: ${winner.winner}`;
      winner.result.forEach(element => {
        document.getElementById(element).style.color = "#eb0808";
      });
    } else {
      status = `Next player: ${  xIsNext ? 'X' : 'O'}`;
    }
    return (
      <div className="App">
        <div className="App-header">
          <h2>GAME CARO</h2>
          <div className="game">
            <div>
              <div className="status-component">
                <div>{status}</div>
                <button type="button" className="button" onClick={() => this.restartClick()}>
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
              <button type="button" className="button" onClick={() => this.sortStep()}> {isStepAsc ? "Asc" : "Desc"} </button>
              <ol>{moves}</ol>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  history: state.game.history,
  stepNumber: state.game.stepNumber,
  xIsNext: state.game.xIsNext,
  currentCell: state.game.currentCell,
  isStepAsc: state.game.isStepAsc,
})

const mapDispatchToProps = (dispatch) => ({
  modifiedHistory: (history, squares, i) => dispatch(ModifiedHistory(history, squares, i)),
  restart: () => dispatch(Restart()),
  chooseStep: (step) => dispatch(ChooseStep(step)),
  changeTypeSort: () => dispatch(ChangeTypeSort())
});

export default connect(mapStateToProps, mapDispatchToProps)(Game)

// kiem tra hang ngang
function checkHorizontal(squares, i) {
  let countLeft = 0;
  let countRight = 0;
  const result = [i];
  // di sang trai
  for (let j = i - 1; ; j-=1) {

    if (j < [parseInt(i / 20, 10) * 20]) {
      break;
    }

    if (squares[j] === squares[i]) {
      result.push(j);
      countLeft+=1;
    }
    else {
      break;
    }

  }
  // di sang phai
  for (let j = i + 1; ; j+=1) {

    if (j >= [parseInt(i / 20, 10) + 1] * 20) {
      break;
    }

    if (squares[j] === squares[i]) {
      result.push(j);
      countRight+=1;
    }
    else {
      break;
    }

  }

  if ((countLeft + countRight) >= 4) {
    // kiem tra chan 2 dau
    if ((i - countLeft) === [parseInt(i / 20, 10) * 20] || (i + countRight) === ([parseInt(i / 20, 10) + 1] * 20 - 1)) {
      return { winner: squares[i], result };
    }

    if (squares[i - countLeft - 1] === null || squares[i + countRight + 1] === null) {
      return { winner: squares[i], result };
    }
  }

  return null;
}
// kiem tra hang doc
function checkVertical(squares, i) {
  let countUp = 0;
  let countDown = 0;
  const result = [i];
  // di len
  for (let j = i - 20; ;) {

    if (j < 0) {
      break;
    }

    if (squares[j] === squares[i]) {
      countUp+=1;
      result.push(j);
      j -= 20;
    }
    else {
      break;
    }

  }
  // di xuong
  for (let j = i + 20; ;) {

    if (j >= 400) {
      break;
    }

    if (squares[j] === squares[i]) {
      countDown+=1;
      result.push(j);
      j += 20;
    }
    else {
      break;
    }

  }

  if ((countUp + countDown) >= 4) {
    // kiem tra chan 2 dau
    if ((i - countUp * 20) < 20 || (i + countDown * 20) > 379) {
      return { winner: squares[i], result };
    }

    if (squares[i - countUp * 20 - 20] === null || squares[i + countDown * 20 + 20] === null) {
      return { winner: squares[i], result };
    }
  }

  return null;
}
// kiem tra duong cheo phu
function checkDiagonal(squares, i) {
  let countRightUp = 0;
  let countLeftDown = 0;
  const result = [i];
  // di len sang phai
  for (let j = i - (20 - 1); ;) {

    if (j % 20 === 0 || j < 0) {
      break;
    }

    if (squares[j] === squares[i]) {
      countRightUp+=1;
      result.push(j);
      j -= (20 - 1);
    }
    else {
      break;
    }

  }
  // di xuong sang trai
  for (let j = i + (20 - 1); ;) {
    if (j % 20 === 19 || j >= 400) {
      break;
    }

    if (squares[j] === squares[i]) {
      countLeftDown+=1;
      result.push(j);
      j += (20 - 1);
    }
    else {
      break;
    }

  }

  if ((countRightUp + countLeftDown) >= 4) {
    // kiem tra chan 2 dau
    if ((i - countRightUp * 19) % 20 === 19 || (i + countLeftDown * 19) % 20 === 0) {
      return { winner: squares[i], result };
    }

    if (squares[i - countRightUp * 19 - 19] === null || squares[i + countLeftDown * 19 + 19] === null) {
      return { winner: squares[i], result };
    }
  }

  return null;
}
// kiem tra duong cheo chinh
function checkMainDiagonal(squares, i) {
  let countLeftUp = 0;
  let countRightDown = 0;
  const result = [i];
  // di len sang trai
  for (let j = i - (20 + 1); ;) {

    if (j % 20 === 19 || j < 0) {
      break;
    }

    if (squares[j] === squares[i]) {
      countLeftUp+=1;
      result.push(j);
      j -= (20 + 1);
    }
    else {
      break;
    }

  }
  // di xuong sang phai
  for (let j = i + (20 + 1); ;) {

    if (j % 20 === 0 || j >= 400) {
      break;
    }

    if (squares[j] === squares[i]) {
      countRightDown+=1;
      result.push(j);
      j += (20 + 1);
    }
    else {
      break;
    }

  }

  if ((countLeftUp + countRightDown) >= 4) {
    // kiem tra chan 2 dau
    if ((i - countLeftUp * 19) % 20 === 0 || (i + countRightDown * 19) % 20 === 19) {
      return { winner: squares[i], result }
    }

    if (squares[i - countLeftUp * 21 - 21] === null || squares[i + countRightDown * 21 + 21] === null) {
      return { winner: squares[i], result }
    }
  }

  return null;
}

function calculateWinner(squares, i) {
  if (checkHorizontal(squares, i)) {
    return checkHorizontal(squares, i);
  }
  if (checkVertical(squares, i)) {
    return checkVertical(squares, i);
  }
  if (checkDiagonal(squares, i)) {
    return checkDiagonal(squares, i);
  }
  if (checkMainDiagonal(squares, i)) {
    return checkMainDiagonal(squares, i);
  }
  return null;
}
