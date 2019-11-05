import { userConstants } from '../constants/index';

const registration = (state = {}, action) => {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return { 
        registering: true 
      };
    case userConstants.REGISTER_SUCCESS:
      return {};
    case userConstants.REGISTER_FAILURE:
      return {
        message: action.error
      };
    default:
      return state
  }
}
export default registration

