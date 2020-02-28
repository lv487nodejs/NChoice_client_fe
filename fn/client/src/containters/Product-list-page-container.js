import React from 'react';

import ProductList from '../components/product-list';
import Filter from '../components/filter'
const ProductListPageContainer = () => {
    return (
        <div>
            <Filter />
            <ProductList />
        </div>
    )
}

export default ProductListPageContainer;
