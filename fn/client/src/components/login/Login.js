import React, { useState, useEffect } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';

import { setUserLogged, setUserLoading, setCart } from "../../actions";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import LoadingSpinner from "../Loading-spinner";
import { SignupSchemaLogin } from '../../configs/login-register-config'
import withStoreService from '../hoc';
import { setToLocalStorage  } from '../../services/localStoreService';

const addDataToLocalStorage = (token) => {
    setToLocalStorage('userId',token.userId)
    setToLocalStorage('accessToken',token.accessToken)
    setToLocalStorage('refreshToken',token.refreshToken)
}

const USER_DATA = {
    email: '',
    password: ''
};
const eye = <FontAwesomeIcon icon={faEye} />;

const Login = ({ storeService, setUserLogged, setUserLoading, userLogged, userLoading, setCart }) => {
    const [user, setUser] = useState(USER_DATA);
    const [errorMsg, setErrorMsg] = useState('');

    const { register, errors, handleSubmit } = useForm({
        validationSchema: SignupSchemaLogin
    });
    const [passwordShown, setPasswordShown] = useState(false);

    useEffect(() => {
        setUserLogged(false)
    }, [setUserLogged])

    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };

    const handleChange = (event) => {
        event.persist();
        setUser(prevUser => ({ ...prevUser, [event.target.name]: event.target.value }));
    };

    const setInitialCart = (res) => {
        const { accessToken, refreshToken, userId } = res
        const cart = { cartNumbers: 0, cartProducts: [] }
        axios.put(`https://lv487node-backend.herokuapp.com/users/cart/${userId}`, { cart });
        setUserLogged(true);
        addDataToLocalStorage({ accessToken, refreshToken, userId });
        setCart(cart)
    }

    const postUser = async () => {
        try {
            setUserLoading();
            const response = await storeService.loginUser(user); 
            if (!response) throw new Error('Wrong email or password, please try again.')
            const { accessToken, refreshToken, cart, userId } = response
            if (cart.cartNumbers === undefined || !cart.cartProducts) {
                setInitialCart(response);
                return
            }
            setUserLogged(true);
            addDataToLocalStorage({ accessToken, refreshToken, userId });
            setCart(cart)
        } catch (err) {
            setUserLogged(false)
            setErrorMsg(err.message)
        }
    }
    const handleOnSubmit = event => {
        postUser();
    };

    if (userLoading) {
        return <LoadingSpinner />
    }

    if (userLogged) {
        return <Redirect to='/' />
    }


    return (
        <div className={'login'}>
            <Form onSubmit={handleSubmit(handleOnSubmit)} >
                <Form.Label className="lable">Log In</Form.Label>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter email"
                        name={'email'}
                        value={user.email}
                        onChange={handleChange}
                        ref={register}
                    />
                    {errors.email && <p className="errorMessage">{errors.email.message}</p>}
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                            </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword" >
                    <Form.Label>Password</Form.Label>
                    <Form.Group className="pass-wrapper">
                        <Form.Control
                            type={passwordShown ? "text" : "password"}
                            placeholder="Password"
                            name={'password'}
                            value={user.password}
                            onChange={handleChange}
                            ref={register}
                            autoComplete="on"
                        />
                        <i onClick={togglePasswordVisiblity}>{eye}</i>
                    </Form.Group>
                    {errors.password && <p className="errorMessage">{errors.password.message}</p>}

                </Form.Group>
                <Form.Check
                    type="switch"
                    id="custom-switch"
                    label="Remember me"
                />
                <Form.Group >
                    <Button variant="dark" type="submit" block>
                        LOG IN
                        </Button>
                    <span className="errorMessage">{errorMsg}</span>
                </Form.Group>
                <Form.Group className="link">
                    <Link to="/register" className="btn btn-link" >REGISTER</Link>
                </Form.Group>
            </Form>
        </div>
    )
};


const mapDispatchToProps = { setUserLogged, setUserLoading, setCart };

const mapStateToProps = ({ authReducer: { userLogged, userLoading } }) => ({
    userLogged, userLoading
});

export default withStoreService()(connect(mapStateToProps, mapDispatchToProps)(Login));
