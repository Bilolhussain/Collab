import { SET_CURRENT_USER, UPDATE_USER, USER_LOADING } from "../actions/types";

const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        firstLogin: action.payload.firstLogin
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case UPDATE_USER:
      return {
        ...state,
        firstLogin: action.payload
      };
    default:
      return state;
  }
}
