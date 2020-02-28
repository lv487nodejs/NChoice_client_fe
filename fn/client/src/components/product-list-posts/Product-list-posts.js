import React from 'react';
import ProductsListItem from '../product-list-item';
import './Product-list-posts.css';

const ProductListPosts = ({ products }) => (
    <div className="posts">
        {products.map(({ _id, title, description, images }) => (
            <ProductsListItem key={_id} title={title} description={description} images={images} />
        ))}
    </div>
);

export default ProductListPosts;
