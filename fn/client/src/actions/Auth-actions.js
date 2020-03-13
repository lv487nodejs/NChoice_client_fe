const addUserToStore = (value) => {
    return {
        type: 'ADD_USER',
        payload: value
    }
}

const loginUser = userObj => ({
    type: 'LOGIN_USER',
    payload: userObj
})
export { addUserToStore, loginUser };