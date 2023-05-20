import { LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from "../constants/constants";
import AuthHelper from "../helpers/AuthHelper";

const user = AuthHelper.getAuth() || null;

const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };

const Auth = (state = initialState, action: any) => {
  const { type, payload } = action;

  switch (type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggedIn: true,
        user: payload.user,
      };
    case LOGIN_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        user: null,
      };
    default:
      return state;
  }
};

export default Auth;
