/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import { userConstants } from '../constants/index';
import { history } from '../helpers/helpers';

const login = ({email, password}) => {
    return dispatch => {
        dispatch(request());

        setTimeout(() => {
            axios
                .post('http://localhost:4500/user/login', {
                    email,
                    password,
                })
                .then(result => {
                    localStorage.setItem('token', result.data.token);
                    dispatch(success(result.data.user));
                    history.push('/home');
                })
                .catch(error => {
                    dispatch(failure(error.response.data.message));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.LOGIN_REQUEST} }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user} }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

const logout = () => {
    return dispatch => {
        dispatch({ type: userConstants.LOGOUT });
        localStorage.removeItem('token');
    }
}

const register = ({email,password,displayname}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post('https://hw6-caro-api.herokuapp.com/user/register', {
                    email,
                    password,
                    displayname
                })
                .then( result => { 
                        dispatch(success(result.data));
                        history.push('/login');
                    }
                )
                .catch(error => {
                    dispatch(failure(error.response.data.message));
                })
        }, 1000)

    };

    function request() { return { type: userConstants.REGISTER_REQUEST} }
    function success(newUser) { return { type: userConstants.REGISTER_SUCCESS, newUser } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}


const update = (displayname) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post('https://hw6-caro-api.herokuapp.com/user/update', {
                    displayname
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success(result.data.message));
                        history.push('/home');
                    }
                )
                .catch(error => {
                    dispatch(failure(error.response.data.message));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message) { return { type: userConstants.UPDATE_SUCCESS, message } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

const changepass = (password) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post('https://hw6-caro-api.herokuapp.com/user/changepass', {
                    password
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success(result.data.message));
                        history.push('/home');
                    }
                )
                .catch(error => {
                    dispatch(failure(error.response.data.message));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message) { return { type: userConstants.UPDATE_SUCCESS, message } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

export const userActions = {
    login,
    logout,
    register,
    update,
    changepass,
};

// prefixed function name with underscore because delete is a reserved word in javascript

/*
export const Registration = () => async dispatch => {
    //const response = await dataUsers.get('/users');
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
*/