
const initialState = {
    history: [{
        squares: Array(400).fill(null),
        historyCell: null,
    }],
    stepNumber: 0,
    xIsNext: true,
    currentCell: null,
    isStepAsc: true,
}

const game = (state = initialState, action) => {
    switch (action.type) {
        case 'MODIFIED_HISTORY': {
            return {
                ...state,
                history: action.history.concat([{
                    squares: action.squares,
                    historyCell: action.i
                }]),
                stepNumber: action.history.length,
                xIsNext: !state.xIsNext,
                currentCell: action.i,
            }
        }
            
        case 'RESTART':{
            return {
                ...state,
                history: [{
                    squares: Array(400).fill(null),
                    historyCell: null,
                }],
                stepNumber: 0,
                xIsNext: true,
                currentCell: null,
                isStepAsc: true,
            }
        }
        case 'CHOOSE_STEP':
            return {
                ...state,
                stepNumber: action.step,
                xIsNext: (action.step % 2) === 0,
                currentCell: state.history[action.step].historyCell
            }
        case 'CHANGE_TYPE_SORT':
            return {
                ...state,
                isStepAsc: !state.isStepAsc
            }
        default:
            return state;
    }
}

export default game;