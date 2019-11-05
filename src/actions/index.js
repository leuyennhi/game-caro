
export const ModifiedHistory = (history, squares, i )=> ({
    type: 'MODIFIED_HISTORY',
    history,
    squares,
    i
})

export const Restart = () => ({
    type: 'RESTART'
})


export const ChooseStep= step => ({
    type: 'CHOOSE_STEP', 
    step
})

export const ChangeTypeSort = () => ({
    type: 'CHANGE_TYPE_SORT'
})


