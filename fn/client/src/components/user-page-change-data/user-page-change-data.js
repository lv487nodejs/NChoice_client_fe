import React, {useState, useEffect, useCallback } from 'react'
import { connect } from 'react-redux'
import { InputGroup, FormControl } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom';
import './user-page-change-data.css';
import { setUser, postUserSuccess } from '../../actions'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import withStoreService from '../hoc'
import { axios } from 'axios';

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
const UserChangeData = ({user,storeService,accessToken}) => {
    const local = JSON.parse(localStorage.getItem('user'))
    const {firstName,lastName,email} = user;
    const history = useHistory()


useEffect(()=>{
    storeService.getUserById(local.userId,local.accessToken).then((res)=>{
    console.log(res.data);
    const {accessToken,refreshToken,user} = res.data
    // setUser(res.data)
    // setUser(user)
    postUserSuccess(user)
    
    })
    
},[storeService,postUserSuccess])

    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    })

    // handler for user data
    const changeHandler = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const submitHandler = (e) => {
    storeService.getUserById(local.userId,local.accessToken).then((res)=>{
        setUser(res.data.user)
    })   
    
    history.push('/')
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
                <FormControl type="password" name="password" id="password" ref={register} value={user.password} placeholder="enter password..." onChange={changeHandler} />
                {errors.password && <p className="errorMessage">{errors.password.message}</p>}
            </InputGroup>
            <input className="btn btn-dark user-page-button" type="submit" value="send changed data" />
        </form>
    )
}
return <Redirect to="/login" />

}
const mapStateToProps = (state) => {
    console.log(state);
    
 return {
     user:state.authReducer.user,accessToken:state.authReducer.accessToken
    }   

}
const mapDispatchToProps = {
    setUser
}
export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(UserChangeData));
