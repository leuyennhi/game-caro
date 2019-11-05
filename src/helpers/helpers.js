import {createBrowserHistory} from 'history';

export const history = createBrowserHistory();

export function authHeader() {
    // return authorization header with jwt token
    const user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return {
             'Content-Type': 'application/json',
            'Authorization': `jwt ${  user.token}` 
        };
    }

    return {};
}

