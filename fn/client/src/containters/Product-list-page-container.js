import React from 'react';

import ProductList from '../components/product-list';
import Filter from '../components/filter';
import Row from '../Row';

const ProductListPageContainer = () => (
    <div>
        <Row left={<Filter />} right={<ProductList />} />
    </div>
);

export default ProductListPageContainer;
