import React from 'react';
import ProductsListItem from '../product-list-item';
import './Product-list-posts.css';

const ProductListPosts = ({products}) => {

console.log(products);

return (

    <div className="products-items">
        { products.map(({ id, title, description, images, price, msrp }) => (
            <ProductsListItem
            key={id}
            title={title}
            description={description}
            images={images}
            price={price}
            msrp={msrp}
            />
            ))}
    </div>
            )    
;
}

export default ProductListPosts;
