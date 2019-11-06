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
                .post('https://hw6-caro-api.herokuapp.com/user/login', {
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

export const loginWithFBGG = (data) => {
    // console.log('user.token', data);
    return dispatch => {
        localStorage.setItem('jwt_token', data.token.token);
        dispatch(success(data.token.user));
        history.push('/home');
    };

    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user} }
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


const update = ({_id, displayname}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post('https://hw6-caro-api.herokuapp.com/user/update', {
                    _id,
                    displayname
                })
                .then( result => { 
                        dispatch(success(result.data.message, result.data.user));
                    }
                )
                .catch(error => {
                    dispatch(failure(error.response.data.message));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.UPDATE_REQUEST} }
    function success(message, user) { return { type: userConstants.UPDATE_SUCCESS, message, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}

const changepass = ({_id, passpresent, password}) => {
    return dispatch => {
        dispatch(request());
        setTimeout(() => {
            axios
                .post('https://hw6-caro-api.herokuapp.com/user/changepass', {
                    _id,
                    passpresent,
                    password
                })
                // eslint-disable-next-line no-unused-vars
                .then( result => { 
                        dispatch(success(result.data.message));
                    }
                )
                .catch(error => {
                    dispatch(failure(error.response.data.message));
                })
        }, 1000)
    };

    function request() { return { type: userConstants.CHANGEPASS_REQUEST} }
    function success(message) { return { type: userConstants.CHANGEPASS_SUCCESS, message } }
    function failure(error) { return { type: userConstants.CHANGEPASS_FAILURE, error } }
}

export const userActions = {
    login,
    loginWithFBGG,
    logout,
    register,
    update,
    changepass,

};