import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, UPDATE_USER } from "./types";

// Register User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err => 
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//Save assessment data and set firstLogin to true
export const createAssessment = (newAssessment, history) => dispatch => {
  axios
    .post("/api/users/assessment", newAssessment)
    .then(assessment => {
       const value = true
       dispatch(updateUser(value))
       history.push("/dashboard");
    }).catch(err => 
     dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      }))
    // axios.get("api/users/dashboard", newAssessment.email).then()
    };

// Load data from mongodb

// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      // Save to localStorage

      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//
// export function fetchFirstLogin(userId){
//   return function(dispatch){
//       axios.get("http://localhost:5000/api/users/dashboard").then((response) => {
//       var data = response.data
//       // console.log(data);
//       for(let i =0; i < data.length -1; i++){
//         if(data[i]._id === userId){
//           dispatch(updateUser(data[i].firstLogin));
//         }
//       }
//     }).catch(() => console.log("Error retreiving dashboard info"))
//   }};
//      .then(({ data }) => {
//        dispatch(updateUser(data))
//        });
//      };
// }

export const updateUser = (value) => {
    return{
      type: UPDATE_USER,
      payload: value
    };
  };


// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
