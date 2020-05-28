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

const USER_DATA = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
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

  const passwordEye = passwordShown ? 'fa fa-eye' : 'fa fa-eye-slash';

  useEffect(() => {
    setUserLogged(false);
  }, [setUserLogged]);

  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  const handleChange = (event) => {
    event.persist();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    postUser();
  };

  if (userLogged) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <Form className="register" onSubmit={handleOnSubmit}>
        <Form.Label className="lable">Register</Form.Label>
        <Form.Group>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            name={'firstName'}
            value={user.firstName}
            onChange={handleChange}
            placeholder="Enter firstname..."
            pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,20}$"
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            name={'lastName'}
            value={user.lastName}
            onChange={handleChange}
            placeholder="Enter lastname..."
            pattern="^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,20}$"

          />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name={'email'}
            value={user.email}
            onChange={handleChange}
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
            title="example@gmail.com"
            placeholder="Enter email..."
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Group className="pass-wrapper">
            <Form.Control
              type={passwordShown ? 'text' : 'password'}
              placeholder="Enter password..."
              name={'password'}
              value={user.password}
              onChange={handleChange}
              required
              pattern=".{8,16}"
              title="password must be from 8 to 16 characters long"
            />
            <i className={passwordEye} onClick={togglePasswordVisiblity} />
          </Form.Group>
        </Form.Group>

        <Form.Group>
          <Button variant="dark" type="submit" block>
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
