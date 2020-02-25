import React from 'react'
import ProductsListItem from '../product-list-item';
import './Product-list-posts.css';

const ProductListPosts = ({ posts }) => {

    return (
        <div className='posts'>
            {posts.map(post => (
                <ProductsListItem keyID={post.id} post={post.title}></ProductsListItem>
            ))}
        </div>
    )
}

export default ProductListPosts