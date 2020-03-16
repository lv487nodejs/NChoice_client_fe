import axios from 'axios';

const addDataToLocalStorage = (token) => {
    localStorage.setItem('accessToken', JSON.stringify(token.accessToken));
    localStorage.setItem('refreshToken', JSON.stringify(token.refreshToken));
}

const postUserStarted = () => ({
    type: 'ADD_USER_REQUESTED',
});

const postUserSuccess = (data) => ({
    type: 'ADD_USER_RECEIVED',
    payload: data,
});

const postUserError = () => ({
    type: 'ADD_USER_ERROR,'
});

const logoutUser = () => ({
    type: 'LOGOUT_USER'
})

export const postUser = (value, type) => {
    return (dispatch) => {
        dispatch(postUserStarted());
        return axios({
            method: 'post',
            url: `https://stark-headland-06017.herokuapp.com/${type[0]}/${type[1]}`,
            data: value
        }).then(response => {
            const { accessToken, refreshToken } = response.data;
            return { accessToken, refreshToken };
        }).then(json => {
            dispatch(postUserSuccess(json));
            addDataToLocalStorage(json);
        }).catch(e => {
            dispatch(postUserError());
        });
    };
}

export const getProfileFetch = () => {
    return dispatch => {
        const token = localStorage.token;
        if (token) {
            return fetch("http://localhost:3000/api/v1/profile", {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            })
                .then(resp => resp.json())
                .then(data => {
                    if (data.message) {
                        // Будет ошибка если token не дествительный
                        localStorage.removeItem("token")
                    } else {
                        dispatch(loginUser(data.user))
                    }
                })
        }
    }
}

//const mapDispatchToProps = dispatch => ({
//   getProfileFetch: () => dispatch(getProfileFetch())
// })

// {this.props.currentUser.username
//             ? <button onClick={this.handleClick}>Log Out</button>
//             : null
//           }
//КНОПКА В РОУТАХ