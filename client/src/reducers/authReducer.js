import {
  SET_CURRENT_USER,
  GET_USER_COUNT,
  CSRF_TOKEN,
  GET_USERS,
  UPDATE_USER,
  GET_USER,
  GET_USER_DATA,
} from '../actions/types';
import isEmpty from '../validation/is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  singleUser: {},
  userList: [],
  csrfToken: null,
  userCount: null,
};

export default function (state = initialState, action) {
  /**
   * If action.payload is filled with the user, that mean we should be authenticated.
   * So the value of isAuthenticated will be true is action.payload has the value, false otherwise.
   * isEmpty() is our custom function defined in validation/isEmpty.js
   */
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        // type: action.payload.type
        firstLogin: action.payload.firstLogin,
      };
    case GET_USER_COUNT:
      return {
        ...state,
        userCount: action.payload,
      };
    case CSRF_TOKEN:
      return {
        ...state,
        csrfToken: action.payload,
      };
    case GET_USERS:
      return {
        ...state,
        userList: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        singleUser: action.payload,
      };
    case UPDATE_USER:
      return {
        ...state,
        firstLogin: action.payload,
      };
    case GET_USER_DATA:
      return {
        ...state,
        userData: action.payload,
      };
    default:
      return state;
  }
}
// import { SET_CURRENT_USER, UPDATE_USER, USER_LOADING } from "../actions/types";

// const isEmpty = require("is-empty");

// const initialState = {
//   isAuthenticated: false,
//   user: {},
//   loading: false
// };

// export default function(state = initialState, action) {
//   switch (action.type) {
//     case SET_CURRENT_USER:
//       return {
//         ...state,
//         isAuthenticated: !isEmpty(action.payload),
//         user: action.payload,
//         firstLogin: action.payload.firstLogin
//       };
//     case USER_LOADING:
//       return {
//         ...state,
//         loading: true
//       };
//     case UPDATE_USER:
//       return {
//         ...state,
//         firstLogin: action.payload
//       };
//     default:
//       return state;
//   }
// }
