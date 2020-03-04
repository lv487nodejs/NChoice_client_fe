const userLoaded = newProducts => ({
    type: 'USER_LOADED',
    payload: newProducts,
});

const userRequested = () => ({
    type: 'USER_REQUESTED',
});

export { userLoaded, userRequested };
