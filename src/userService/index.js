/* eslint-disable no-restricted-globals */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */

import { authHeader } from '../helpers/helpers';
// import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
    getDetail,
    update,
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch('https://hw6-caro-api.herokuapp.com/user/login', requestOptions)
        .then(handleResponse)
        .then(user => {

            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getDetail() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('https://hw6-caro-api.herokuapp.com/user/me', requestOptions).then(handleResponse)
    .then(handleResponse)
    .then(user => {
        return user;
    });
}

function register(user) {
    
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch('https://hw6-caro-api.herokuapp.com/user/register', requestOptions).then(handleResponse);
    
    /*
    axios
                .post('https://hw6-caro-api.herokuapp.com/user/register', {
                    email,
                    password,
                    displayname
                })
                .then(result => {
                    return result.data;
                })
                // eslint-disable-next-line no-unused-vars
                .catch(err => {
                    return err;
                })
                */
}

function update() {
    /*
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
    */
}


function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }

            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}
