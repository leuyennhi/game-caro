import { userConstants } from '../constants';

const initialState = {
  loggedIn: false,
  user: null,
  message: undefined,
  errMessage: undefined,
  successMessage: undefined,
}

const user = (state = initialState, action) => {
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
        errMessage: undefined,
        successMessage: undefined,
      };
    case userConstants.UPDATE_REQUEST:
      return {
        ...state
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        successMessage: action.message,
        user: action.user,
        errMessage: undefined,
      };
    case userConstants.UPDATE_FAILURE:
      return {
        ...state,
        errMessage: action.error,
        successMessage: undefined
      };
    case userConstants.CHANGEPASS_REQUEST:
        return {
          ...state
        };
    case userConstants.CHANGEPASS_SUCCESS:
        return {
          ...state,
          successMessage: action.message,
          errMessage: undefined,
        };
    case userConstants.CHANGEPASS_FAILURE:
        return {
          ...state,
          errMessage: action.error,
          successMessage: undefined
        };
    default:
      return state
  }
}
export default user;