const usersLoaded = newProducts => ({
    type: 'USERS_LOADED',
    payload: newProducts,
});

const usersRequested = () => ({
    type: 'USERS_REQUESTED',
});

const userLoaded = userDetails => ({
    type: 'USER_LOADED',
    payload: userDetails,
});

const userRequested = () => ({
    type: 'USER_REQUESTED',
});

const userEdit = userEditDisable => ({
    type: 'USER_EDIT',
    payload: userEditDisable,
});

export { usersLoaded, usersRequested, userLoaded, userRequested, userEdit };
