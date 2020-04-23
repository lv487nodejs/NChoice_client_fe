import React, { useEffect, useState } from "react";
import connect from "react-redux/es/connect/connect";
import './Wishlist.css'
import {Figure} from 'react-bootstrap'
import Row from "react-bootstrap/Row";
import Container from "@material-ui/core/Container/Container";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { addToWishlist, removeFromWishlist } from "../../actions";
import { getFromLocalStorage } from "../../services/localStoreService";

const Wishlist = ({removeFromWishlist}) => {

  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    if (getFromLocalStorage('wishlist_collection')) {
      setProducts(getFromLocalStorage('wishlist_collection'));
    }
  }, []);

  const handleRemoveFromWishlist = (item) => {
    removeFromWishlist(item);
    let foundIncreaseItems = products.findIndex(value => value.id === item.id);
    products.splice(foundIncreaseItems, 1)
  };

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
                    onClick={() => {handleRemoveFromWishlist(item)}}/>
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

export default connect(mapStateToProps, {addToWishlist,removeFromWishlist})(Wishlist);
