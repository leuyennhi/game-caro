
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

const createGame = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_HISTORY':
            return {
                ...state,
                history: state.history.concat([{
                    squares: action.data
                }]),
            }
        case 'RESTART':{
            const historyDefault = [{
                squares: Array(400).fill(null),
                historyCell: null,
            }];
            return {
                ...state,
                history: historyDefault
            }
        }
        case 'MODIFIED_HISTORY':
            return {
                ...state,
                history: action.history
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

export default createGame;