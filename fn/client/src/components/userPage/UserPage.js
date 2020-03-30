import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'

import { InputGroup, FormControl } from 'react-bootstrap'
import { Redirect} from 'react-router-dom';
import axios from 'axios';
import './UserPage.css';

import {postUserSuccess} from '../../actions'
const UserPage = ({user,user:{firstName,lastName,email},userTokens, postUserSuccess}) => {

    const [userChangedData, setUserChangedData] = useState({ firstName, lastName, email, password: '' })


    // handler for user data
    const changeHandler = (e) => {
        setUserChangedData({ ...userChangedData, [e.target.name]: e.target.value  })
    }
    const submitHandler = (e) => {
        e.preventDefault()
        axios({ method: 'put', url: 'no route yet' }).then((res) => console.log(res));
        localStorage.setItem('user',JSON.stringify(userChangedData))
        postUserSuccess(userChangedData)
    }
    console.log(user&&userTokens);
    
    if (user) {
        return (
            <form>
                <label htmlFor="firstname">change your firstname</label>
                <InputGroup className="mb-3">
                    <FormControl id="firstname" name="firstName" value={userChangedData.firstName} placeholder="enter firstname..." onChange={changeHandler}  />
                </InputGroup>
                <label htmlFor="lastname">change your lastname</label>
                <InputGroup>
                    <FormControl id="lastname" name="lastName" value={userChangedData.lastName} placeholder="enter lastname..." onChange={changeHandler}  />
                </InputGroup>
                <label htmlFor="email">change your email</label>
                <InputGroup>
                    <FormControl type="email" name="email" id="email" value={userChangedData.email} placeholder="enter email..." pattern='/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/' onChange={changeHandler} required />
                </InputGroup>
                <label htmlFor="password">change your password</label>
                <InputGroup>
                    <FormControl type="password" name="password" id="password" value={userChangedData.password} placeholder="enter password..." onChange={changeHandler} required />
                </InputGroup>
                <input className="btn btn-dark user-page-button" type="button" value="send changed data" onClick={submitHandler} />
            </form>
        )
    }
    return <Redirect to="/login" />

}
const mapStateToProps = ({ authReducer: { user, userTokens } }) => ({ 
        user,userTokens,
    
})
const mapDispatchToProps = {
    postUserSuccess
}
export default connect(mapStateToProps, mapDispatchToProps)(UserPage);
