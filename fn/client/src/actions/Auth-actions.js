

const setUserLogged = newStatus => ({
  type: 'SET_USER_LOGGED',
  payload: newStatus,
});

const setUserLoading = () => ({
  type: 'SET_USER_LOADING',
});


export { setUserLogged, setUserLoading };
