import React from 'react';
import ProductListItem from '../product-list-item';
import './Simular-products.css';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1146, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 810, min: 0 },
    items: 1
  }
};
const SimularProducts = ({ products }) => (
    <Carousel responsive={responsive}  swipeable={false}>
      {products.map(({ id, title, description, images, price, mrsp, rate }) => (
        <ProductListItem
          title={title}
          description={description}
          images={images}
          price={price}
          mrsp={mrsp}
          id={id}
          key={id}
          rate={rate}
        />
      ))}
    </Carousel>
);

export default SimularProducts;
