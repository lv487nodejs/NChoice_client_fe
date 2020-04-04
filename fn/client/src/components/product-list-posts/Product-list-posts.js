import React from 'react';
import ProductsListItem from '../product-list-item';
import './Product-list-posts.css';

const ProductListPosts = ({ products }) => (
  <div className="products-items">
    {products.map(({ id, title, description, images, price, mrsp }) => (
        <ProductsListItem
          title={title}
          description={description}
          images={images}
          price={price}
          mrsp={mrsp}
          id={id}
          key={id}
        />
    ))}
  </div>
);

export default ProductListPosts;
