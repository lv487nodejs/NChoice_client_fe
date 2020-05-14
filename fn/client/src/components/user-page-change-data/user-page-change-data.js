import React, { useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { FormControl, Form } from 'react-bootstrap'
import './user-page-change-data.css';
import { setUser, setShowSnackbar, setSnackbarText } from '../../actions'
import { useForm } from 'react-hook-form';
import withStoreService from '../hoc'
import Snackbar from '../snackbar';
import { SignupSchema } from './validation';
import { getFromLocalStorage } from '../../services/localStoreService';


const UserChangeData = ({ user,
    storeService,
    setUser,
    setShowSnackbar,
    setSnackbarText,

}) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const eyeClassName = passwordShown?'fa fa-eye':'fa fa-eye-slash';
    const userId = getFromLocalStorage('userId')
    const accessToken = getFromLocalStorage('accessToken')

    const addUserDataToSTore = useCallback((id, token) => {
        storeService.getUserById(id, token).then((res) => {
            const { user } = res.data
            setUser(user)
        }).catch((error) => {
            throw new Error(error)
        })
    }, [storeService, setUser])

    useEffect(() => {
        addUserDataToSTore(userId, accessToken)
    }, [addUserDataToSTore, userId, accessToken])

    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    })

    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        storeService.sendUserChangedData(userId, accessToken, { user }).then((res) => {
            addUserDataToSTore(userId, accessToken)
            snackbarHandler(res.data.msg)
        }).catch((error) => {
            snackbarHandler(error.message)
            throw new Error(error);
        })
    }
    const snackbarHandler = (text) => {
        setSnackbarText(text)
        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false)
        }, 3000)
    }

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="relative">
            <Form id="user-form" onSubmit={handleSubmit(submitHandler)}>
                <Form.Group>
                    <Form.Label htmlFor="firstname">Change your firstname</Form.Label>
                    <FormControl id="firstname" name="firstName" ref={register} value={user.firstName}
                        onChange={changeHandler} />
                </Form.Group>
                {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                <Form.Group>
                    <Form.Label htmlFor="lastname">Change your lastname</Form.Label>
                    <FormControl id="lastname" name="lastName" ref={register} value={user.lastName}
                        onChange={changeHandler} />
                </Form.Group>
                {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                <Form.Group>
                    <Form.Label htmlFor="email">Change your email</Form.Label>
                    <FormControl type="text" name="email" id="email" ref={register} value={user.email}
                        onChange={changeHandler} />
                </Form.Group>
                {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                <Form.Group>
                    <Form.Label htmlFor="password">Enter your password</Form.Label>
                    <Form.Group className="pass-wrapper">
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            name={'password'}
                            onChange={changeHandler}
                            ref={register}
                            autoComplete="on"
                        />
                        <i className={eyeClassName} onClick={togglePasswordVisiblity} />
                    </Form.Group>
                        {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                </Form.Group>
                <input className="btn btn-dark user-page-button" type="submit" value="Send changed data" />
                <div id="user-page-snackbar" className="col-12">
                    <Snackbar />
                </div>
            </Form>
        </div>
    )

}
const mapStateToProps = ({ authReducer: { user } }) => ({
    user
})
const mapDispatchToProps = ({
    setUser, setShowSnackbar, setSnackbarText
})
export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(UserChangeData));
