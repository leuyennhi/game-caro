
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

export const Registration = () => async dispatch => {
    const response = await dataUsers.get('/users');
    fetch('https://hw6-caro-api.herokuapp.com/user/register', {  
      method: 'post',  
      headers: {  
        'Accept': 'application/json',  
        'Content-Type': 'application/json'  
      },  
      body: JSON.stringify({  
  
  
        displayname: document.getElementById("displayName"),  
        dob: document.getElementById("dob"),  
        gender: document.getElementById("gender"),  
        password: document.getElementById("password"), 
        email: document.getElementById("email"), 
      })  
    }).then((Response) => Response.json())  
      .then((Result) => {  
        if (Result.Status == 'Success')  
                this.props.history.push("/Dashboard");  
        else  
          alert('Sorrrrrry !!!! Un-authenticated User !!!!!')  
      })
    dispatch({ type: 'REGISTRATRION', payload: response });
};  

