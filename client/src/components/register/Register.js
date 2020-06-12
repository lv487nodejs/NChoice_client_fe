import React, { useEffect, useState } from "react";
import "./Register.css";
import { Form, Button, Modal } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import {universal} from '../../validators/form-validators'
import { setUserLogged, setUserLoading } from "../../actions";
import withStoreService from "../hoc";
import { setToLocalStorage } from "../../services/localStoreService";
const addDataToLocalStorage = (token) => {
  setToLocalStorage("userId", token.userId);
  setToLocalStorage("accessToken", token.accessToken);
  setToLocalStorage("refreshToken", token.refreshToken);
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
  const [errorMsg, setErrorMsg] = useState('')

  const [firstNameError, setFirstNameError] = useState('')
  const [lastNameError, setLastNameError] = useState('')
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState('')
  const [allFieldsValidated, setAllFieldsValidated] = useState(false)


  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [show, setShow] = useState(false);
  const [agreedWithTerms, setAgreedWithTerms] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);

  const agreeWithTermsErrorMessage = agreedWithTerms
  ? ''
  : 'Please agree with terms';

  const passwordEye = passwordShown ? 'fa fa-eye' : 'fa fa-eye-slash';


  useEffect(() => {
    if ((agreedWithTerms &&
        (emailError === false) &&
        (confirmPasswordError === false) &&
        (passwordError === false) &&
        (lastNameError === false) &&
        (firstNameError === false))) {
      setAllFieldsValidated(true)
    }
    else{
      setAllFieldsValidated(false)
    }
  }, [
      allFieldsValidated,
      agreedWithTerms,
      emailError,
      confirmPasswordError,
      lastNameError,
      firstNameError,
      passwordError
  ])

  useEffect(() => {
    setUserLogged(false);
  }, [setUserLogged]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const validateConfirmPassword = () => {
    if (user.password === user.confirmPassword) {
      setConfirmPasswordError(false)
    }
    else {
      setConfirmPasswordError('Please confirm password')
  }}

  const handleChange = (event) => {
    event.persist();
    setUser({ ...user, [event.target.name]: event.target.value });
    const err = universal(event.target.name, event.target.value)

    if(event.target.name === 'email')
      setEmailError(err)
    else if((event.target.name === 'password')){
      setPasswordError(err)
    }
    else if((event.target.name === 'lastName'))
      setLastNameError(err)
    else if ((event.target.name === 'firstName'))
      setFirstNameError(err)
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleAgree = () => setAgreedWithTerms(!agreedWithTerms);

  const postUser = async () => {
    try {
      setUserLoading();
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

    if ((emailError === false) && agreedWithTerms && !emailError) {
      postUser();
    }
  };

  if (userLogged) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Form
          className="register"
          onSubmit={handleOnSubmit}
      >
        <Form.Label className="lable">Register</Form.Label>
        <Form.Group>
          <Form.Label>First name<sup style = {{ color: "red" }}>*</sup></Form.Label>
          <Form.Control
            type="text"
            name={'firstName'}
            value={user.firstName}
            onChange={handleChange}
            placeholder="Enter firstname..."
          />
          <i className="text-danger position-static">{firstNameError}</i>
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name<sup style = {{ color: "red" }}>*</sup></Form.Label>
          <Form.Control
            type="text"
            name={'lastName'}
            value={user.lastName}
            onChange={handleChange}
            placeholder="Enter lastname..."
          />
          <i className="text-danger position-static">{lastNameError}</i>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address<sup style = {{ color: "red" }}>*</sup></Form.Label>
          <Form.Control
            type="text"
            name={'email'}
            value={user.email}
            onChange={handleChange}
            title="example@gmail.com"
            placeholder="Enter email..."
          />
          <i className="text-danger position-static">{emailError}</i>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password<sup style = {{ color: "red" }}>*</sup></Form.Label>
          <Form.Group className="pass-wrapper">
            <Form.Control
              type={passwordShown ? 'text' : 'password'}
              placeholder="Enter password..."
              name={'password'}
              value={user.password}
              onChange={handleChange}
              title="min length 8 max 30 characters"
            />
            <i className={passwordEye} onClick={togglePasswordVisiblity} />
          </Form.Group>
          <i className="text-danger position-static">{passwordError}</i>

        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label> Confirm Password<sup style = {{ color: "red" }}  >*</sup></Form.Label>
          <Form.Group className="pass-wrapper">
            <Form.Control
              type={passwordShown ? 'text' : 'password'}
              placeholder="Enter password..."
              name={'confirmPassword'}
              value={user.confirmPassword}
              onChange={handleChange}
              onBlur={validateConfirmPassword}
              title="min length 8 max 30 characters"
            />
            <i
              className={passwordEye}
              onClick={togglePasswordVisiblity}
            />
          </Form.Group>
          <i className="text-danger position-static">
            {confirmPasswordError}
          </i>
        </Form.Group>
        <Form.Label style = {{ fontSize: "14px" }}> Required field marked by <sup style = {{ color: "red" }}>*</sup></Form.Label>
        <Form.Group>
          <Form.Check
            type="switch"
            id="custom-switch"
            label="Agree with term"
            onChange={handleAgree}
          />
          <i className="text-danger position-static">
            {agreeWithTermsErrorMessage}
          </i>
        </Form.Group>
        <Form.Group>
          <Button
              disabled={ !allFieldsValidated }
              variant="dark"
              type="submit"
              block>
            REGISTER
          </Button>
          <span>{errorMsg}</span>
        </Form.Group>

        <Form.Group className="link">
          <Link to="/login" className="btn btn-link">
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
          <Button variant="secondary" onClick={handleClose}>
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
  cartReducer: { cartNumbers, cartProducts },
}) => ({
  userLogged,
  userLoading,
  cartNumbers,
  cartProducts,
});

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(Register)
);
