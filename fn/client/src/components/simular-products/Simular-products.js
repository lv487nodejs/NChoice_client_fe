import React from 'react';
import ProductListItem from '../product-list-item';
import './Simular-products.css';

const SimularProducts = ({ products }) => (
  <div className="simular-products-items">
    {products.map(({ id, title, description, images, price, msrp, rate }) => (
        <ProductListItem
          title={title}
          description={description}
          images={images}
          price={price}
          msrp={msrp}
          id={id}
          key={id}
          rate={rate}
        />
    ))}
  </div>
);

export default SimularProducts;
