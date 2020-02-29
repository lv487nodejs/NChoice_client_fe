import React from 'react';
import './Product-list-page-container.css';
import ProductList from '../components/product-list';
import Filter from '../components/filter';
import Row from '../Row';

const ProductListPageContainer = () => (
    <div className="product-list-container">
        <ProductList />
    </div>
);

export default ProductListPageContainer;
