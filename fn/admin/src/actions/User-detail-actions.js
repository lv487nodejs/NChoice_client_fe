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

export { userLoaded, userRequested, userEdit };
