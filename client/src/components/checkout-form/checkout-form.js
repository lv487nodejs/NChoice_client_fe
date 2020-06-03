import React, { useState, useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Jumbotron, Form, Button, Col, Row, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import {
  countries,
  paymentMethods,
  deliveryType,
  placeholder
} from '../../configs/frontend-config';
import {
  setShowSnackbar,
  setSnackbarText,
  clearCart,
  setOrderToStore
} from '../../actions';
import CheckoutTable from '../checkout-table';
import CheckoutSelect from '../checkout-select';
import withStoreService from '../hoc';
import './checkout-form.css';
import Snackbar from '../snackbar';
import {
  getFromLocalStorage,
  setToLocalStorage
} from '../../services/localStoreService';
import {universal} from "../../validators/form-validators";

const snackBarMsg = (
  notAvailableItem
) => `We dont have enough ${notAvailableItem.name}
There are just ${notAvailableItem.available}.
Please go to cart and change amount of ${notAvailableItem.name}`;

const CheckoutForm = ({
  cartProducts,
  orderStore,
  clearCart,
  storeService,
  setShowSnackbar,
  setSnackbarText,
  setOrderToStore
}) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [emailError, setEmailError] = useState({
    email: '',
    firstName: '',
    lastName:'',
    contactPhone: '',
    country: '',
    city: '',
    street: '',
    buildingNumber: '',
    deliveryType: '',
    paymentMethod: ''});

  const [validated, setValidated] = useState(false);
  const [order, setOrder] = useState(orderStore);
  const [successOrder, setSuccessOrder] = useState(false);

  const userId = getFromLocalStorage('userId');

  const clearLocalStorage = () => {
    setToLocalStorage('cart_numbers', null);
    setToLocalStorage('products_collection', null);
  };

  const productsForOrder = cartProducts.map((product) => {
    return {
      item: product.id,
      quantity: product.quantity
    };
  });

  // Create object with form data to send to server
  const orderToServer = {
    firstName: order.firstName,
    lastName: order.lastName,
    orderItems: productsForOrder,
    userId: userId,
    email: order.email,
    deliveryAddress: {
      country: order.country,
      city: order.city,
      street: order.street,
      buildingNumber: order.buildingNumber
    },
    deliveryType: order.deliveryType,
    contactPhone: order.contactPhone,
    paymentMethod: order.paymentMethod,
    status: 'pending'
  };

  if (successOrder) {
    return <Redirect to="/thanks" />;
  }

  if (cartProducts.length === 0) {
    return <Redirect to="/" />;
  }

  const snackbarHandler = (text) => {
    setSnackbarText(text);
    setShowSnackbar(true);
    setTimeout(() => {
      setShowSnackbar(false);
    }, 10000);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    setOrderToStore(order);

    applyOrder();
  };

  // Check the database for quantity of products in order
  const applyOrder = async () => {
    const notAvailable = [];
    const productsPromises = await Promise.all(
      cartProducts.map((product) =>
        storeService.getOneProductPropertie(product.propetries._id)
      )
    );
    productsPromises.forEach((product, index) => {
      const inCart = cartProducts[index];
      const { available } = product[0];
      if (inCart.quantity > available) {
        notAvailable.push({
          available,
          name: inCart.title
        });
      }
    });

    if (notAvailable.length) {
      const snackbarMessages = notAvailable.map((notAvailableItem) => {
        return snackBarMsg(notAvailableItem);
      });
      snackbarHandler(snackbarMessages);
      return;
    }
    setSuccessOrder(true);
    clearLocalStorage();
    clearCart();
    storeService.postOrder(orderToServer);
  };

  const handleChange = (event) => {
    const erora = universal(event.target.name, event.target.value)
    event.persist();
    setOrder({ ...order, [event.target.name]: event.target.value });
    setOrderToStore(order);
    setEmailError({...emailError, [event.target.name]: erora})
    setValidated(true)
    Object.entries(emailError).forEach(([key, value]) => {
      console.log(`${key} -- ${value}`);
      if (value !== false) {
        setValidated(false)
      }
    });
  };

  return (
    <Container>
      <Row id="checkout-row">
        <Col>
          <Jumbotron className="jumbo">
            <h2>Order Form</h2>
            <Form
              onSubmit={handleSubmit}
              id="checkout-form"
            >
              <fieldset className="field">
                <h3 className="text-center">Please tell us about yourself</h3>
                <Form.Group controlId="firstNameValidate">
                  <Form.Label>Firstname</Form.Label>
                  <Form.Control
                    placeholder={placeholder}
                    name={'firstName'}
                    onChange={handleChange}
                    value={order.firstName}
                    //onBlur = {validationState}
                  />
                  <i className="text-danger position-static">{emailError.firstName}</i>

                </Form.Group>
                <Form.Group controlId="lastNameValidate">
                  <Form.Label>Lastname</Form.Label>
                  <Form.Control
                    placeholder={placeholder}
                    name={'lastName'}
                    onChange={handleChange}
                    value={order.lastName}
                    //onBlur = {validationState}
                  />
                  <i className="text-danger position-static">{emailError.lastName}</i>
                </Form.Group>
                <Form.Group controlId="emailValidate">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    placeholder={placeholder}
                    name={'email'}
                    type="email"
                    onChange={handleChange}
                    value={order.email}
                    //onBlur = {validationState}
                  />
                  <i className="text-danger position-static">{emailError.email}</i>
                </Form.Group>
                <Form.Group controlId="phoneValidate">
                  <Form.Label>Contact Phone Number</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={placeholder}
                    name="contactPhone"
                    onChange={handleChange}
                    value={order.contactPhone}
                    //onBlur = {validationState}
                  />
                  <i className="text-danger position-static">{emailError.phone}</i>
                </Form.Group>
                <Form.Group>
                  <CheckoutSelect
                    selectOptions={countries}
                    name="country"
                    handleChange={handleChange}
                    // onBlur = {validationState}
                    value={order.country}
                  />
                  <i className="text-danger position-static">{emailError.country}</i>
                </Form.Group>
                <Form.Group controlId="cityValidate">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    placeholder={placeholder}
                    name={'city'}
                    onChange={handleChange}
                    value={order.city}
                    //onBlur = {validationState}
                  />
                  <i className="text-danger position-static">{emailError.city}</i>
                </Form.Group>
                <Form.Group controlId="streetValidate">
                  <Form.Label required>Street</Form.Label>
                  <Form.Control
                    placeholder={placeholder}
                    name="street"
                    onChange={handleChange}
                    value={order.street}
                    //onBlur = {validationState}
                  />
                  <i className="text-danger position-static">{emailError.street}</i>
                </Form.Group>
                <Form.Group controlId="buildingValidate">
                  <Form.Label>Building number</Form.Label>
                  <Form.Control
                    placeholder={placeholder}
                    name="buildingNumber"
                    onChange={handleChange}
                    value={order.buildingNumber}
                    //onBlur = {validationState}
                  />
                  <i className="text-danger position-static">{emailError.buildingNum}</i>
                </Form.Group>
              </fieldset>
              <Form.Group className="form-space">
                <fieldset className="field">
                  <h3 className="text-center">
                    Please coose delivery type and payment method
                  </h3>
                  <CheckoutSelect
                      name='deliveryType'
                    selectOptions={deliveryType}
                    handleChange={handleChange}
                    //onChange = {validationState}
                    value={order.deliveryType}
                  />

                  <CheckoutSelect
                      name='paymentMethods'
                    selectOptions={paymentMethods}
                    handleChange={handleChange}
                    //onChange = {validationState}
                    value={order.paymentMethod}
                  />

                </fieldset>
              </Form.Group>
              <Button variant="dark" type="submit" disabled={!validated}>
                Create order
              </Button>
              <div id="user-page-snackbar" className="col-12">
                <Snackbar className="snackbar" />
              </div>
            </Form>
          </Jumbotron>
        </Col>
        <Col>
          <Jumbotron className="jumbo" id="checkout-table">
            <h2>Your Items</h2>
            <CheckoutTable />
            <Link to="/cart">
              <Button variant="dark">Go to cart to make changes</Button>
            </Link>
            <div id="user-page-snackbar" className="col-12">
              <Snackbar className="snackbar" />
            </div>
          </Jumbotron>
        </Col>
      </Row>
    </Container>
  );
};

const mapStateToProps = ({
  cartReducer: { cartProducts },
  checkoutReduser: { orderStore }
}) => ({
  orderStore,
  cartProducts
});

const mapDispatchToProps = {
  setShowSnackbar,
  setSnackbarText,
  clearCart,
  setOrderToStore
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
);
