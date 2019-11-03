const registration = (state, action) => {
    switch (action.type) {
        case 'REGISTRATION': {
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
    }
}