
import {
    AUTH_REGISTER,
    AUTH_REGISTER_SUCCESS,
    AUTH_REGISTER_FAILURE,
    AUTH_LOGIN,
    AUTH_LOGIN_SUCCESS,
    AUTH_LOGIN_FAILURE
} from './ActionTypes'; //로그인 관련 ActionTypes 불러오고

/* LOGIN */
export function loginRequest(username, password) { //thunk 함수
  return (dispatch) => {
      // Inform Login API is starting
      dispatch(login()); //reducer로 actions 객체를 보냄
 
      // API REQUEST
      return axios.post('/api/account/signin', { username, password })
      .then((response) => {
          // SUCCEED
          dispatch(loginSuccess(username));
      }).catch((error) => {
          // FAILED
          dispatch(loginFailure());
      });
  };
}
//액션 생성자 함수로 액션객체를 리턴함
export function login() {
    return {
        type: AUTH_LOGIN
    };
}
 
export function loginSuccess(username) {
    return {
        type: AUTH_LOGIN_SUCCESS,
        username
    };
}
 
export function loginFailure() {
    return {
        type: AUTH_LOGIN_FAILURE
    };
}
