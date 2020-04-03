import React, { useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { InputGroup, FormControl } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
import './user-page-change-data.css';
import { setUser } from '../../actions'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import withStoreService from '../hoc'

// validation
const SignupSchema = yup.object().shape({
    firstName: yup.string().matches(/\w+/, 'enter firstname'),
    lastName: yup.string().matches(/\w+/, 'enter lastName'),
    email: yup.string()
        .email()
        .required("Required")
        .matches(/^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/, "Email must be correct. Example: nick@mail.com"),

    password: yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/(?=.*[0-9])/, "Password must contain a number.")
});

// component
const UserChangeData = ({ user, storeService,setUser }) => {
    const local = JSON.parse(localStorage.getItem('user'))
    const { firstName, lastName, email } = user;


   const addUserDataToSTore =  useCallback((id,token) => {
        storeService.getUserById(id, token).then((res) => {
            const { user } = res.data
            setUser(user)
        })

    }, [storeService,setUser])

    useEffect(()=>{
addUserDataToSTore(local.userId,local.accessToken)
    },[addUserDataToSTore])

    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    })

    // handler for user data
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
        storeService.sendUserChangedData(local.userId, local.accessToken,{userToChange: user}).then((res) => {
            setUser(res.data.user)
            addUserDataToSTore(local.userId,local.accessToken)
        })
    }

    if (user) {
        return (
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="firstname">change your firstname</label>
                <InputGroup className="mb-3">
                    <FormControl id="firstname" name="firstName" ref={register} value={firstName} placeholder="enter firstname..." onChange={changeHandler} />
                </InputGroup>
                {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                <label htmlFor="lastname">change your lastname</label>
                <InputGroup>
                    <FormControl id="lastname" name="lastName" ref={register} value={lastName} placeholder="enter lastname..." onChange={changeHandler} />
                </InputGroup>
                {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                <label htmlFor="email">change your email</label>
                <InputGroup>
                    <FormControl type="text" name="email" id="email" ref={register} value={email} placeholder="enter email..." onChange={changeHandler} />
                </InputGroup>
                {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                <label htmlFor="password">change your password</label>
                <InputGroup>
                    <FormControl type="password" name="password" id="password" ref={register} placeholder="enter password..." onChange={changeHandler} />
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                </InputGroup>
                <input className="btn btn-dark user-page-button" type="submit" value="send changed data" />
            </form>
        )
    }
    return <Redirect to="/login" />

}
const mapStateToProps = ({authReducer:{user}}) => ({
        user
    })
const mapDispatchToProps = ({
        setUser 
    })
export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(UserChangeData));
