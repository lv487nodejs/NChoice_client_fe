import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Product-details.css';
import { Card, Row, Col, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import ProductListPosts from '../product-list-posts';
import StarsRating from '../star-rating';
 
import withStoreService from '../hoc';
import {
  productLoaded,
  productsLoaded,
  productsRequested,
  catalogLoaded,
  sizesLoaded,
  addToCart,
  addToWishlist
} from '../../actions';

const ProductDetails = ({
  id,
  product,
  productLoaded,
  productsLoaded,
  productsRequested,
  storeService,
  products,
  addToCart,
  addToWishlist
}) => {

  const [getSizes, setSizes] = useState([]);
  const [checkSize, setCheckSize] = useState('');

  useEffect(() => {
    productsRequested();
    storeService.getProductById(id).then((res) => productLoaded(res));
  }, [productsRequested, storeService, id, productLoaded]);

  useEffect(() => {
    storeService.getProductProperties(id).then((res) => setSizes(res));
  }, [id, storeService]);

  useEffect(() => {
    productsRequested();
    storeService.getAllProducts().then((res) => productsLoaded(res));
  }, [productsLoaded, productsRequested, storeService]);


  const newProducts = products.filter(elem => elem.category === product.category).slice(-3)

  const handleCheck = item => () => {
    setCheckSize(item)
  };

  const handleAddToCart = () => {
      product.propetries.filter((el) => {
        if (el.size[0] === checkSize) {
        let productToSend = {...product, propetries: el};
          if (checkSize) {
            addToCart(productToSend);
          }
        }
      })
  };

  const sizeItem = getSizes
    .reduce((accum, { size }) => [...accum, ...size], [])
    .map((item) => (
      <div key={item} className="sizeItem" onClick={handleCheck(item)} >
        <span className={item === checkSize ? 'check' : ''}> {item} </span>
      </div>
    ));

  return (
    <Card className="wrapper">
      <Card.Body className="cardBody">
        <Row className="justify-content-md-center">
          <Col className="images">
            <Col className="zoom">
              <Image
                src={`/images/products/${product.images}`}
                className="img"
                rounded
              />
            </Col>
            <Col className="zoom">
              <Image
                src={`/images/products/${product.images}`}
                className="img"
                rounded
              />
            </Col>
            <Col className="zoom">
              <Image
                src={`/images/products/${product.images}`}
                className="img"
                rounded
              />
            </Col>
          </Col>
          <Col className="mainImgWrapper">
            <Image
              src={`/images/products/${product.images}`}
              className="mainImg"
              rounded
            />
          </Col>
        </Row>
        <Col className="text">
          <StarsRating />
          <Card.Title className="title">{product.title}</Card.Title>
          <Card.Text className="productDescription">
            {product.description}
          </Card.Text>
          <Card.Text
            style={{ backgroundColor: product.color }}
            className="color"
          ></Card.Text>
          <Col className="size">{sizeItem}</Col>
          <Card.Body className="buttons">
            <FontAwesomeIcon icon={faHeart} className="heart button"
              onClick={() => addToWishlist(product)} />
            <Button 
            variant="dark" 
            className={checkSize ? 'button' : 'button disabled'}
            onClick={handleAddToCart}
            >Add to card </Button>
            <Link to="/checkout" className={checkSize ? 'disp-block' : 'disp-none' }>
              <Button
                variant="dark"
                onClick={handleAddToCart}
              >Buy now</Button>
            </Link>
          </Card.Body>
        </Col>
      </Card.Body>
      <hr />
      <div className="similarItems">Similar items</div>
      <hr />
      <ProductListPosts products={newProducts} className="routingImg" />
    </Card>
  );
};

const mapStateToProps = ({
  productsList: { product, products, loading, propetries },
}) => ({
  products,
  product,
  loading,
  propetries,
});
const mapDispatchToProps = {
  productLoaded,
  productsLoaded,
  productsRequested,
  catalogLoaded,
  sizesLoaded,
  addToCart,
  addToWishlist
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
