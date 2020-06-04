import React, { useEffect, useState } from 'react';
import './Register.css';
import { Form, Button, Modal } from 'react-bootstrap';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUserLogged, setUserLoading } from '../../actions';
import withStoreService from '../hoc';
import { setToLocalStorage } from '../../services/localStoreService';

const addDataToLocalStorage = (token) => {
  setToLocalStorage('userId', token.userId);
  setToLocalStorage('accessToken', token.accessToken);
  setToLocalStorage('refreshToken', token.refreshToken);
};

const formRegExp = {
  email:
    "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
  name: "^(?=.{1,30}$)[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$",
  password: '.{8,30}'
};

const USER_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
};

const Register = ({
  storeService,
  setUserLogged,
  setUserLoading,
  userLogged,
  userLoading,
  cartNumbers,
  cartProducts
}) => {
  const initialUser = { ...USER_DATA, cart: { cartNumbers, cartProducts } };

  const [user, setUser] = useState(initialUser);
  const [errorMsg, setErrorMsg] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [show, setShow] = useState(false);

  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const [confirmPasswordError, setconfirmPasswordError] = useState(true);
  const [emailError, setEmailError] = useState(false);
  const [agreedWithTerms, setAgreedWithTerms] = useState(false);

  const confirmPasswordErrorMessage = confirmPasswordError
    ? 'Please confirm password'
    : '';
  const agreeWithTermsErrorMessage = agreedWithTerms
    ? ''
    : 'Please agree with terms';
  const emailErrorMessage = emailError ? 'Please enter email' : '';
  const passwordEye = passwordShown ? 'fa fa-eye' : 'fa fa-eye-slash';
  const confirmedPasswordEye = confirmPasswordShown
    ? 'fa fa-eye'
    : 'fa fa-eye-slash';

  useEffect(() => {
    setUserLogged(false);
  }, [setUserLogged]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const toggleConfirmPasswordVisiblity = () => {
    setConfirmPasswordShown(!confirmPasswordShown);
  };
  const validateConfirmPassword = () => {
    if (user.password === user.confirmPassword) {
      setconfirmPasswordError(false);
    } else {
      setconfirmPasswordError(true);
    }
  };
  const handleChange = (event) => {
    event.persist();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAgree = () => setAgreedWithTerms(!agreedWithTerms);

  const postUser = async () => {
    try {
      setUserLoading();
      user.confirmPassword = undefined;
      const res = await storeService.registerUser(user);
      if (!res) throw new Error('User with such an email already exist.');
      addDataToLocalStorage(res);
      handleShow();
    } catch (err) {
      setUserLogged(false);
      setErrorMsg(err.message);
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (user.password === user.confirmPassword && agreedWithTerms) {
      postUser();
    }
  };

  if (userLogged) {
    return <Redirect to='/' />;
  }
  const checkEmail = (event) => {
    setEmailError(true);
    if (event.target.value.match(formRegExp.email)) {
      setEmailError(false);
    }
  };
  return (
    <>
      <Form className='register' onSubmit={handleOnSubmit}>
        <Form.Label className='lable'>Register</Form.Label>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type='text'
            name='firstName'
            value={user.firstName}
            onChange={handleChange}
            placeholder='Enter firstname...'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type='text'
            name='lastName'
            value={user.lastName}
            onChange={handleChange}
            placeholder='Enter lastname...'
          />
        </Form.Group>

        <Form.Group controlId='formBasicEmail'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='text'
            name='email'
            value={user.email}
            onChange={handleChange}
            onBlur={checkEmail}
            title='example@gmail.com'
            placeholder='Enter email...'
          />
          <i className='text-danger position-static'>{emailErrorMessage}</i>
          <Form.Text className='text-muted'>
            We&apos;ll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label>Password</Form.Label>
          <Form.Group className='pass-wrapper'>
            <Form.Control
              type={passwordShown ? 'text' : 'password'}
              placeholder='Enter password...'
              name='password'
              value={user.password}
              onChange={handleChange}
              title='min length 8 max 30 characters'
            />
            <i className={passwordEye} onClick={togglePasswordVisiblity} />
          </Form.Group>
        </Form.Group>

        <Form.Group controlId='formBasicPassword'>
          <Form.Label> Confirm Password</Form.Label>
          <Form.Group className='pass-wrapper'>
            <Form.Control
              type={confirmPasswordShown ? 'text' : 'password'}
              placeholder='Enter password...'
              name='confirmPassword'
              value={user.confirmPassword}
              onChange={handleChange}
              onKeyUp={validateConfirmPassword}
              title='min length 8 max 30 characters'
            />
            <i
              className={confirmedPasswordEye}
              onClick={toggleConfirmPasswordVisiblity}
            />
          </Form.Group>
          <i className='text-danger position-static'>
            {confirmPasswordErrorMessage}
          </i>
        </Form.Group>

        <Form.Group>
          <Form.Check
            type='switch'
            id='custom-switch'
            label='Agree with term'
            onChange={handleAgree}
          />
          <i className='text-danger position-static'>
            {agreeWithTermsErrorMessage}
          </i>
        </Form.Group>
        <Form.Group>
          <Button variant='dark' type='submit' block>
            REGISTER
          </Button>
          <span>{errorMsg}</span>
        </Form.Group>

        <Form.Group className='link'>
          <Link to='/login' className='btn btn-link'>
            LOG IN
          </Link>
        </Form.Group>
      </Form>

      <Modal show={show} onHide={handleClose} animation>
        <Modal.Header closeButton>
          <Modal.Title>Registered!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You have successfully registered! Please confirm your email
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

const mapDispatchToProps = { setUserLogged, setUserLoading };

const mapStateToProps = ({
  authReducer: { userLogged, userLoading },
  cartReducer: { cartNumbers, cartProducts }
}) => ({
  userLogged,
  userLoading,
  cartNumbers,
  cartProducts
});

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
