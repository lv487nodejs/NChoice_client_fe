const postUserStarted = () => ({
  type: 'ADD_USER_REQUESTED',
});

const postUserSuccess = (data, type) => ({
  type: 'ADD_USER_RECEIVED',
  payload: {data, type}
});

const postUserError = (type) => ({
  type: 'ADD_USER_ERROR',
  payload: {type}
});

const logoutUser = () => {
  localStorage.removeItem('Token');
  return {
  type: 'LOGOUT_USER',
}};

export { postUserError, postUserStarted, postUserSuccess, logoutUser };
