import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { InputGroup, FormControl } from 'react-bootstrap'
import { Redirect, useHistory } from 'react-router-dom';
import axios from 'axios';
import './user-page-change-data.css';
import { postUserSuccess } from '../../actions'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

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
const local = JSON.parse(localStorage.getItem('user'))||{}
const {firstName,lastName,email} = local
const UserChangeData = ({ user }) => {
    const [userChangedData, setUserChangedData] = useState({ firstName, lastName, email, password: '' })

    
    const history = useHistory()

    const { register, handleSubmit, errors } = useForm({
        validationSchema: SignupSchema
    })
    // handler for user data
    const changeHandler = (e) => {
        setUserChangedData({ ...userChangedData, [e.target.name]: e.target.value })
    }        
    
    const submitHandler = (e) => {
        axios({
            method: "get",
            url: `http://localhost:5000/users/${local.user._id}`,
            data: { userChangedData },
            headers: { "x-auth-token": local.user.tokens[0] }
        }).then(response => {
            console.log('response',response);
            const { accessToken, refreshToken, user } = response.data
            return { accessToken, refreshToken, user };
        }).then(json => {
            postUserSuccess(json);
            localStorage.setItem('user', JSON.stringify(json));
        }).catch(e => {
            console.log(e.message);
        });
        // const { user: prevUser } = JSON.parse(localStorage.getItem('user'));
        localStorage.setItem('user', JSON.stringify({ ...JSON.parse(localStorage.getItem('user')), ...{ user: { ...local.user, ...userChangedData } } }))
     console.log('changed data',userChangedData);
     
        history.push('/')
        console.log('submit handler');        
    }

    if (user) {
        return (
            <form onSubmit={handleSubmit(submitHandler)}>
                <label htmlFor="firstname">change your firstname</label>
                <InputGroup className="mb-3">
                    <FormControl id="firstname" name="firstName" ref={register} value={userChangedData.firstName} placeholder="enter firstname..." onChange={changeHandler} />
                </InputGroup>
                {errors.firstName && <p className="errorMessage">{errors.firstName.message}</p>}
                <label htmlFor="lastname">change your lastname</label>
                <InputGroup>
                    <FormControl id="lastname" name="lastName" ref={register} value={userChangedData.lastName} placeholder="enter lastname..." onChange={changeHandler} />
                </InputGroup>
                {errors.lastName && <p className="errorMessage">{errors.lastName.message}</p>}
                <label htmlFor="email">change your email</label>
                <InputGroup>
                    <FormControl type="text" name="email" id="email" ref={register} value={userChangedData.email} placeholder="enter email..." onChange={changeHandler} />
                </InputGroup>
                {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                <label htmlFor="password">change your password</label>
                <InputGroup>
                    <FormControl type="password" name="password" id="password" ref={register} value={userChangedData.password} placeholder="enter password..." onChange={changeHandler} />
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}
                </InputGroup>
                <input className="btn btn-dark user-page-button" type="submit" value="send changed data" />
            </form>
        )
    }
    return <Redirect to="/login" />

}
const mapStateToProps = ({ authReducer: { user, userTokens } }) => ({
    user, userTokens,

})
const mapDispatchToProps = {
    postUserSuccess
}
export default connect(mapStateToProps, mapDispatchToProps)(UserChangeData);
