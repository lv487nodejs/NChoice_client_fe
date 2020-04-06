import React from 'react'
import CheckoutForm from '../components/checkout-form'
import './Checkout-container.css'

const CheckoutContainer = () => {
    return (
        <div>
          <h1 className="text-center">Please, fill in the checkout form</h1> 
          <CheckoutForm/> 
        </div>
    )
}
export default CheckoutContainer;