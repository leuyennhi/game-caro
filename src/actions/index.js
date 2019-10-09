
export const addHistory = data => ({
    type: 'ADD_HISTORY',
    data
})

export const restart = () => ({
    type: 'RESTART'
})

export const ModifiedHistory = history => ({
    type: 'MODIFIED_HISTORY',
    history
})

export const ChooseStep= step => ({
    type: 'CHOOSE_STEP', 
    step
})

export const ChangeTypeSort = () => ({
    type: 'CHANGE_TYPE_SORT'
})
