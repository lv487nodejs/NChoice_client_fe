import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import {  FormControl, Form } from 'react-bootstrap'
import './user-page-change-data.css';
import { setUser, setShowSnackbar, setSnackbarText } from '../../actions'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import withStoreService from '../hoc'
import Snackbar from '../snackbar';


const firstnameRegex = /\w+/;
const firstnameValidationText = 'enter firstname';
const firstNameMinElementCount = 2;
const firstNameMinMessage = `First name is too short - should be ${firstNameMinElementCount} chars minimum`;
const lastnameRegex = /\w+/;
const lastnameValidationText = 'enter lastname';
const lastNameMinElementCount = 2;
const lastNameMinMessage = `Last name is too short - should be ${lastNameMinElementCount} chars minimum`;
const emailRegEx = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const emailValidationText = "Email must be correct. Example: nick@mail.com";

const SignupSchema = yup.object().shape({
    firstName: yup.string()
        .required("No firstname provided.")
        .matches(firstnameRegex, firstnameValidationText)
        .min(firstNameMinElementCount, firstNameMinMessage),
    lastName: yup.string()
        .required("No lastname provided.")
        .matches(lastnameRegex, lastnameValidationText)
        .min(lastNameMinElementCount, lastNameMinMessage),
    email: yup.string()
        .required("No email provided.")
        .email()
        .matches(emailRegEx, emailValidationText),

    password: yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
});

const UserChangeData = ({ user,
    storeService,
    setUser,
    setShowSnackbar,
    setSnackbarText,

}) => {
    const userId = JSON.parse(localStorage.getItem('userId'))
    const accessToken = JSON.parse(localStorage.getItem('accessToken'))


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
    }, [addUserDataToSTore, accessToken, userId])




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
            console.log(error);
            snackbarHandler(error.response.data.msg)
        })
    }
    const snackbarHandler = (text) => {
        setSnackbarText(text)
        setShowSnackbar(true)
        setTimeout(() => {
            setShowSnackbar(false)
        }, 3000)
    }

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
                    <FormControl type="password" name="password" id="password" ref={register}
                        onChange={changeHandler} />
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
