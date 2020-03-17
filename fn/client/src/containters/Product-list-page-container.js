import React from 'react';
import './Product-list-page-container.css';
import ProductList from '../components/product-list';

const ProductListPageContainer = ({catalog}) => (
    <div className="product-list-container">
        <ProductList catalog={catalog}/>
    </div>
);

export default ProductListPageContainer;
