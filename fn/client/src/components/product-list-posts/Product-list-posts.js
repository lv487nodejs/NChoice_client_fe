import React from 'react';
import ProductsListItem from '../product-list-item';
import './Product-list-posts.css';

const ProductListPosts = ({ products }) => (
    <div className="posts">
        {products.map(({id, title, description, images}) => (
            <ProductsListItem keyID={id} title={title} description={description} images={images}/>
        ))}
    </div>
);

export default ProductListPosts;
