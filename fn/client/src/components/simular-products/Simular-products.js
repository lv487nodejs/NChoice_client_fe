import React from 'react';
import ProductListItem from '../product-list-item';
import './Simular-products.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1
};
const settings2 = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};
const SimularProducts = ({ products }) => (
  <>
    <Slider {...settings} className="simular-products-items">
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
    </Slider>
    <Slider {...settings2} className="secondSimularProducts">
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
    </Slider>
  </>
);

export default SimularProducts;
