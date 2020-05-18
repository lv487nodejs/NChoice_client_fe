import React from 'react';
import './Product-list-page-container.css';
import ProductListPage from '../components/product-list-page';

const ProductListPageContainer = ({ catalog }) => (
    <div className="product-list-container">
        <ProductListPage catalog={catalog} />
    </div>
);

export default ProductListPageContainer;
