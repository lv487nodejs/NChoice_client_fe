import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Product-details.css';
import { Card, Row, Col, Image, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import SimularProducts from '../simular-products/Simular-products';
import StarsRating from '../star-rating';
import LoadingSpinner from '../Loading-spinner';

import withStoreService from '../hoc';
import {
  setProduct,
  setProducts,
  catalogLoaded,
  sizesLoaded,
  addToCart,
  addToWishlist,
  productsLoadingStart,
  productsLoadingStop
} from '../../actions';

const ProductDetails = ({
  id,
  product,
  loading,
  setProduct,
  setProducts,
  storeService,
  products,
  addToCart,
  addToWishlist,
  productsLoadingStart,
  productsLoadingStop
}) => {

  const [getSizes, setSizes] = useState([]);
  const [checkSize, setCheckSize] = useState('');

  useEffect(() => {
    productsLoadingStart()
    if (!products.length) {
      storeService.getAllProducts().then((res) => setProducts(res))
    }
    storeService.getProductProperties(id).then((res) => setSizes(res));
    storeService.getProductById(id).then((res) => setProduct(res));
  }, [storeService, id, setProduct, setSizes, productsLoadingStart, productsLoadingStop, setProducts, products.length]);

  const newProducts = products.slice(-3)

  const handleCheck = item => () => {
    setCheckSize(item)
  };

  const handleAddToCart = () => {
    if (!checkSize) return;
    const size = product.propetries.filter((el) => el.size[0] === checkSize)
    const productToSend = { ...product, propetries: size[0] }
    addToCart(productToSend);

  };

  const sizeItem = getSizes
    .reduce((accum, { size }) => [...accum, ...size], [])
    .map((item) => (
      <div key={item} className="sizeItem" onClick={handleCheck(item)} >
        <span className={item === checkSize ? 'check' : ''}> {item} </span>
      </div>
    ));

  if (loading) {
    return <LoadingSpinner />
  }

  return (
    
    <Card className="wrapperDetails">
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
          <StarsRating rating={product.rate} />
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
            >Add to cart </Button>
            <Link to="/checkout" className={checkSize ? 'disp-block' : 'disp-none'}>
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
      <SimularProducts products={newProducts} className="routingImg" />
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
  setProduct,
  setProducts,
  catalogLoaded,
  sizesLoaded,
  addToCart,
  addToWishlist,
  productsLoadingStart,
  productsLoadingStop
};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(ProductDetails)
);
