import React, { useState, useEffect, useCallback } from 'react';
import { connect } from 'react-redux';
import { FormControl, Form } from 'react-bootstrap';
import './user-page-change-data.css';
import { setUser, setShowSnackbar, setSnackbarText } from '../../actions';
import withStoreService from '../hoc';
import Snackbar from '../snackbar';
import { getFromLocalStorage } from '../../services/localStoreService';

const UserChangeData = ({
  user,
  storeService,
  setUser,
  setShowSnackbar,
  setSnackbarText
}) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [validateEmailError, setValidateEmailError] = useState(false);
  const validateEmailErrorMessage = validateEmailError
    ? 'Please enter email'
    : '';

  const [validatePasswordError, setValidatePasswordError] = useState(false);
  const validatePasswordErrorMessage = validatePasswordError
    ? 'Please enter password'
    : '';
  const emailErrorClassName = validateEmailError ? 'error' : '';
  const passwordErrorClassName = validatePasswordError ? 'error' : '';

  const eyeClassName = passwordShown ? 'fa fa-eye' : 'fa fa-eye-slash';

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const userId = getFromLocalStorage('userId');
  const accessToken = getFromLocalStorage('accessToken');

  const addUserDataToSTore = useCallback(
    (id, token) => {
      storeService
        .getUserById(id, token)
        .then((res) => {
          const { user } = res.data;
          setUser(user);
        })
        .catch((error) => {
          throw new Error(error);
        });
    },
    [storeService, setUser]
  );

  useEffect(() => {
    addUserDataToSTore(userId, accessToken);
  }, [addUserDataToSTore, userId, accessToken]);

  const checkValidations = useCallback(
    (emailValidate, passwordValidate) => {
      setButtonDisabled(true);
      if (emailValidate && passwordValidate) {
        setButtonDisabled(false);
      }
    },
    [validateEmailError, validatePasswordError]
  );
  useEffect(() => {
    checkValidations(validateEmail(), validatePassword());
  }, [user.email, user.password]);
  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    storeService
      .sendUserChangedData(userId, accessToken, { user })
      .then((res) => {
        addUserDataToSTore(userId, accessToken);
        snackbarHandler(res.data.msg);
      })
      .catch((error) => {
        snackbarHandler('Something went wrong');
        throw new Error(error);
      });
  };
  const snackbarHandler = (text) => {
    setSnackbarText(text);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 3000);
  };

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const validateEmail = () => {
    setValidateEmailError(true);
    if (
      user.email.match(
        /^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,4}|[.][\w-]{2,4}[.][a-zA-Z]{2,4})$/g
      )
    ) {
      setValidateEmailError(false);
      return true;
    }
    return false;
  };
  const validatePassword = () => {
    setValidatePasswordError(true);
    if (user.password.length >= 8 && user.password.length <= 30) {
      setValidatePasswordError(false);
      return true;
    }
    return false;
  };

  return (
    <div className='relative'>
      <Form id='user-form' onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label htmlFor='firstname'>Change your firstname</Form.Label>
          <FormControl
            type='text'
            id='firstname'
            name='firstName'
            value={user.firstName}
            onChange={changeHandler}
            placeholder='Enter firstname...'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='lastname'>Change your lastname</Form.Label>
          <FormControl
            type='text'
            id='lastname'
            name='lastName'
            value={user.lastName}
            onChange={changeHandler}
            placeholder='Enter lastname...'
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='email'>Change your email</Form.Label>
          <FormControl
            className={`${emailErrorClassName}`}
            type='text'
            name='email'
            id='email'
            value={user.email}
            placeholder='Enter email...'
            required
            pattern='^[\w]{1,}[\w.+-]{0,}@[\w-]{2,}([.][a-zA-Z]{2,4}|[.][\w-]{2,4}[.][a-zA-Z]{2,4})$'
            title='example@gmail.com'
            onChange={changeHandler}
            onKeyUp={validateEmail}
          />
          <i className='text-danger position-static'>
            {validateEmailErrorMessage}
          </i>
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor='password'>Enter your password</Form.Label>
          <Form.Group className='pass-wrapper'>
            <Form.Control
              className={`${passwordErrorClassName}`}
              type={passwordShown ? 'text' : 'password'}
              name='password'
              onChange={changeHandler}
              required
              pattern='.{8,30}'
              title='min length 8 max 30 characters'
              placeholder='Enter password...'
              value={user.password}
              onKeyUp={validatePassword}
            />
            <i className={eyeClassName} onClick={togglePasswordVisiblity} />
          </Form.Group>
          <i className='text-danger position-static'>
            {validatePasswordErrorMessage}
          </i>
        </Form.Group>
        <input
          disabled={buttonDisabled}
          className='btn btn-dark user-page-button'
          type='submit'
          value='Send changed data'
        />
        <div id='user-page-snackbar' className='col-12'>
          <Snackbar />
        </div>
      </Form>
    </div>
  );
};
const mapStateToProps = ({ authReducer: { user } }) => ({
  user
});
const mapDispatchToProps = {
  setUser,
  setShowSnackbar,
  setSnackbarText
};
export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(UserChangeData)
);
