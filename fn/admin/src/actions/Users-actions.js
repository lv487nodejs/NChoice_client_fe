const usersLoaded = newProducts => ({
    type: 'USERS_LOADED',
    payload: newProducts,
});

const usersRequested = () => ({
    type: 'USERS_REQUESTED',
});

export { usersLoaded, usersRequested };
