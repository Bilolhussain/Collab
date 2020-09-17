import axios from 'axios';
import { CSRF_TOKEN, ADD_EVENT, GET_ERRORS } from './types';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

// Get the csrf token
export const getCsrfToken = () => (dispatch) => {
  // dispatch(setPostLoading());
  axios
    .get('/api/users/getCsrfToken')
    .then((res) =>
      dispatch({
        type: CSRF_TOKEN,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch({
        type: CSRF_TOKEN,
        payload: null,
      })
    );
};

//Save assessment data and set firstLogin to true
export const createMeeting = (appointment, history) => (dispatch) => {
  axios
    .post('/api/users/calendar', appointment, { withCredentials: true })
    .then((appointment) => {
      //   dispatch(updateEvent(value));
      history.push('/dashboard');
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
  // axios.get("api/users/dashboard", newAssessment.email).then()
};

export const updateEvent = (value) => {
  return {
    type: ADD_EVENT,
    payload: value,
  };
};
