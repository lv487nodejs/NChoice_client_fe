import React, { useState, useEffect } from 'react';
import './Login.css';
import { Form, Button } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import GoogleLogin from 'react-google-login';
import FacebookLogin from 'react-facebook-login';

import { setUserLogged, setUserLoading, setCart, setUser } from '../../actions';
import LoadingSpinner from '../Loading-spinner';
import withStoreService from '../hoc';
import { setToLocalStorage } from '../../services/localStoreService';

const addDataToLocalStorage = (token) => {
  setToLocalStorage('userId', token.userId);
  setToLocalStorage('accessToken', token.accessToken);
  setToLocalStorage('refreshToken', token.refreshToken);
};

const USER_DATA = {
  email: '',
  password: ''
};

const Login = ({
  storeService,
  setUserLogged,
  setUserLoading,
  userLogged,
  userLoading,
  setCart
}) => {
  const [user, setUser] = useState(USER_DATA);
  const [errorMsg, setErrorMsg] = useState('');

  const [passwordShown, setPasswordShown] = useState(false);
  const eyeClassName = passwordShown ? 'fa fa-eye' : 'fa fa-eye-slash';

  useEffect(() => {
    setUserLogged(false);
  }, [setUserLogged]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (event) => {
    event.persist();
    setUser((prevUser) => ({
      ...prevUser,
      [event.target.name]: event.target.value
    }));
  };

  const postUser = async () => {
    try {
      setUserLoading();
      const response = await storeService.loginUser(user);
      if (!response)
        throw new Error('Wrong email or password, please try again.');
      const { accessToken, refreshToken, cart, userId } = response;
      setUserLogged(true);
      addDataToLocalStorage({ accessToken, refreshToken, userId });
      setCart(cart);
    } catch (err) {
      setUserLogged(false);
      setErrorMsg(err.message);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    postUser();
  };

  if (userLoading) {
    return <LoadingSpinner />;
  }

  if (userLogged) {
    return <Redirect to='/' />;
  }

  const responseGoogle = async (res) => {
    const userFromApi = await storeService.oauthGoogle({
      access_token: res.accessToken
    });
    const { accessToken, refreshToken, cart, userId } = userFromApi;
    setUserLogged(true);
    addDataToLocalStorage({ accessToken, refreshToken, userId });
    setCart(cart);
  };

  const responseFacebook = async (res) => {
    const userFromAPI = await storeService.oauthFacebook({
      access_token: res.accessToken
    });
    const { accessToken, refreshToken, cart, userId } = userFromAPI;
    setUserLogged(true);
    addDataToLocalStorage({ accessToken, refreshToken, userId });
    setCart(cart);
  };

  window.scrollTo(0, 0);

  return (
    <div className='login'>
      <Form noValidate onSubmit={handleOnSubmit}>
        <Form.Label className='lable'>Log In</Form.Label>
        <Form.Group controlId='emailValidate'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            required
            type='email'
            placeholder='Enter email...'
            name='email'
            value={user.email}
            onChange={handleChange}
            title='example@gmail.com'
            pattern={
              "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?"
            }
          />
        </Form.Group>

        <Form.Group controlId='passwordValidate'>
          <Form.Label>Password</Form.Label>
          <Form.Group className='pass-wrapper'>
            <Form.Control
              type={passwordShown ? 'text' : 'password'}
              placeholder='Enter password...'
              name='password'
              value={user.password}
              onChange={handleChange}
              pattern={'.{8,30}'}
              title='min length 8 max 30 characters'
              required
            />
            <i className={eyeClassName} onClick={togglePasswordVisiblity} />
          </Form.Group>
        </Form.Group>
        <Form.Check type='switch' id='custom-switch' label='Remember me' />
        <Form.Group>
          <Button variant='dark' type='submit' block>
            LOG IN
          </Button>
          <span className='errorMessage'>{errorMsg}</span>
        </Form.Group>
        <Form.Group className='link'>
          <Link to='/register' className='btn btn-link'>
            REGISTER
          </Link>
        </Form.Group>
      </Form>
      <div className='login-wrapper'>
        <FacebookLogin
          appId='1189412381401260'
          textButton='Facebook'
          fields='name, email, picture'
          callback={responseFacebook}
        />

        <GoogleLogin
          clientId='303875330429-u4510uka1kogr1k4lqcgpr1eree7p20r.apps.googleusercontent.com'
          buttonText='Google'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
        />
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  setUserLogged,
  setUserLoading,
  setCart,
  setUser
};

const mapStateToProps = ({ authReducer: { userLogged, userLoading } }) => ({
  userLogged,
  userLoading
});

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(Login)
);
