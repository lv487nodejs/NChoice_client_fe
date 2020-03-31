import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Button } from 'react-bootstrap'
import UserChangeData from '../user-page-change-data/user-page-change-data';
import Cart from '../cart'
import './user-page.css';
import {connect} from 'react-redux'
import {postUserSuccess} from '../../actions'

const UserPage = () => {
    const [showValue, setShowValue] = useState(1)
    
    const storageData = JSON.parse(localStorage.getItem('user'));

    
    const buttonOptions = [
        {
            title: 'change settings',
            handler: setShowValue,
            value: 1,
            variant: 'dark',
        },
        {
            title: 'Show orders',
            handler: setShowValue,
            value: 2,
            variant: 'dark',
        }
    ]
    const buttons = buttonOptions.map(({ title, handler, value, variant }) => {

        return <li key={title}><Button variant={variant} value={value} onClick={() => handler(value)}>{title}</Button></li>
    })
    const itemToShow = (showValue === 1) ?
        <div className="user-page-container">
            <ul>{buttons}</ul>
            <div className="container">
                <UserChangeData />
            </div>
        </div> : showValue === 2 ?
            <div className="user-page-container">
                <ul >{buttons}</ul>
                <div className="container">
                    <Cart />
                </div>
            </div> : ""
    if (storageData && storageData.accessToken) {
        return (
            <div className="container">
                {itemToShow}
            </div>
        )
    }
    return (<Redirect to="/" />)
}
const mapStateToProps = ({authReducer:{user}}) =>({user})
const mapDispatchToProps = {
    postUserSuccess
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPage);
