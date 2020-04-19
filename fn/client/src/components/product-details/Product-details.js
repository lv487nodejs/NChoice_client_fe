import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import './Product-details.css';
import { Card, Col, Image, Button, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import SimularProducts from '../simular-products/Simular-products';
import StarsRating from '../star-rating';
import LoadingSpinner from '../Loading-spinner';
import ImgsViewer from 'react-images-viewer'

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
  productsLoadingStop,
  currency,
  currencyIcon
}) => {

  const [getSizes, setSizes] = useState([]);
  const [checkSize, setCheckSize] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const [currImg, setCurrImg] = useState(0);

  const imgUrl = `/images/products/${product.images}`
  const imgs = [
    {
      src: imgUrl
    },
    {
      src: imgUrl
    },
    {
      src: imgUrl
    },
    {
      src: imgUrl
    }
  ]

  useEffect(() => {
    productsLoadingStart()
    if (!products.length) {
      storeService.getAllProducts().then((res) => setProducts(res))
    }
    storeService.getProductProperties(id).then((res) => setSizes(res));
    storeService.getProductById(id).then((res) => setProduct(res));
  }, [storeService, id, setProduct, setSizes, productsLoadingStart, productsLoadingStop, setProducts, products.length]);

  const simularProducts = products.filter(elem => elem.catalog === product.catalog)


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

    <Card className="wrapper">
      <Card.Body className="cardBody">
        <Col className="images">
          <Col className="one"><Image
            src={`/images/products/${product.images}`}
            className="img"
            rounded
            onClick={e => {
              setIsOpen(true)
              setCurrImg(0)
            }}
          />
          </Col>
          <Col className="two"> <Image
            src={`/images/products/${product.images}`}
            className="img"
            rounded
            onClick={e => {
              setIsOpen(true)
              setCurrImg(1)
            }}
          />
          </Col>
          <Col className="three"> <Image
            src={`/images/products/${product.images}`}
            className="img"
            rounded
            onClick={e => {
              setIsOpen(true)
              setCurrImg(2)
            }}
          />
          </Col>
          <Col className="four">
            <Image
              src={`/images/products/${product.images}`}
              className="img"
              rounded
              onClick={e => {
                setIsOpen(true)
                setCurrImg(3)
              }}
            />
          </Col>
          <ImgsViewer
            imgs={imgs}
            currImg={currImg}
            showThumbnails={true}
            isOpen={isOpen}
            onClickPrev={e => setCurrImg(currImg - 1)}
            onClickNext={e => setCurrImg(currImg + 1)}
            onClickThumbnail={index => setCurrImg(index)}
            onClose={e => setIsOpen(false)}
          />
        </Col>
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
            <Row className="pdpPrice">
                    <Card.Text className="cardPrice">{(parseFloat(product.price * currency).toFixed(2))} {currencyIcon}</Card.Text>
                    <Card.Text className="cardPrice msrp-price">{(parseFloat(product.mrsp * currency).toFixed(2))} {currencyIcon}</Card.Text>
                </Row>
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
      <SimularProducts products={simularProducts} className="routingImg" />
    </Card>
  );
};

const mapStateToProps = ({
  productsList: { product, products, loading, propetries, currency, currencyIcon },
}) => ({
  products,
  product,
  loading,
  propetries,
  currency,
  currencyIcon
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
