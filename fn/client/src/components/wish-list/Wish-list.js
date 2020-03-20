import React, { useState } from 'react';
import connect from "react-redux/es/connect/connect";
import './Wishlist.css'
import {Figure} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Wishlist = ({products}) => {
    console.log(products)

    const [product, setProduct] = useState(products)

    const removeFromWishlist = (id) => {
      const newProducts = products.map(el=>
        el.id === id ? products.splice(products.indexOf(el), 1) : el
      );
      setProduct(newProducts)
    }

  return (
    <div className='main-wishlist'>
      <h3>Wishlist</h3>
      <h5>{products.length < 1 && <em> No products in Wishlist</em>}</h5>
      <ul className='wishlist-wrap'>
        {products.map((item) => (
          <li key={item.id} className='wishlist-item'>
            <Container>
              <Row>
                
                <Figure.Caption className='wishlist-title'>
                  <h2 className="item-title">{item.title}</h2>
                  <p className="item-description"><Figure.Image src={`/images/products/${item.images[0]}`} className='wishlist-img'/>
                  {item.description}
                  </p>
                  <FontAwesomeIcon
                    icon = {faTrash}
                    className="delte-wishlist-button"
                    onClick={() => {removeFromWishlist(item.id)}}/>
                </Figure.Caption>
              </Row>
            </Container>
          </li>
        ))}
      </ul>
    </div>
  )
};

const mapStateToProps = ({wishlistReducer: {products}}) => ({products});

export default connect(mapStateToProps)(Wishlist);
