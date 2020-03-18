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

const userSave = userData => ({
    type: 'USER_SAVE',
    payload: userData,
});

const userSetRole = role => ({
    type: 'USER_SET_ROLE',
    payload: role,
});

export {
    usersLoaded,
    usersRequested,
    userLoaded,
    userRequested,
    userEdit,
    userSave,
    userSetRole,
};
