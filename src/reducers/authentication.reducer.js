import { userConstants } from '../constants';

const initialState = {
  loggedIn: false,
  user: null,
  message: undefined
}

const authentication = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        message: undefined,
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        user: action.user,
        message:undefined,
      };
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        message: action.error
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        user: null,
        message: undefined,
      };
    default:
      return state
  }
}
export default authentication;