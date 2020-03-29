const postUserStarted = () => ({
  type: 'ADD_USER_REQUESTED',
});

const postUserSuccess = (data) => ({
  type: 'ADD_USER_RECEIVED',
  payload: data,
});
const postUserLoginSuccess = (data) => ({
  type: 'ADD_USER_LOGIN_RECEIVED',
  payload: data,
});
const postUserError = () => ({
  type: 'ADD_USER_ERROR,',
});

const logoutUser = () => ({
  type: 'LOGOUT_USER',
});

export { postUserError, postUserStarted, postUserSuccess, logoutUser, postUserLoginSuccess };
