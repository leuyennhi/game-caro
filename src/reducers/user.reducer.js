import { userConstants } from '../constants';

const initialState = {
}

const user = (state = initialState, action) => {
  switch (action.type) {
    case userConstants.UPDATE_REQUEST:
      return {
      };
    case userConstants.UPDATE_SUCCESS:
      return {
        ...state,
        successMessage: action.message,
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