const addUserToStore = (value) => {
    return {
        type: 'ADD_USER',
        payload: value
    }
}

export { addUserToStore };