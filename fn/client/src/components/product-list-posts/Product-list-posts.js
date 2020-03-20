import React from 'react';
import ProductsListItem from '../product-list-item';
import './Product-list-posts.css';
import { Link } from 'react-router-dom';

const ProductListPosts = ({ products }) => (
  <div className="products-items">
    {products.map(({ id, title, description, images, price, msrp }) => (
      <Link key={id} to={`/products/${id}`}>
        <ProductsListItem
          title={title}
          description={description}
          images={images}
          price={price}
          msrp={msrp}
          id={id}
          key={id}
        />
      </Link>
    ))}
  </div>
);

export default ProductListPosts;
