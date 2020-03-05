import React from 'react';
import { withRouter } from 'react-router-dom';

import { TableCell } from '@material-ui/core';

import { TableRows } from '../tables';

const ProductListItem = ({
    id,
    category,
    brand,
    title,
    msrp,
    price,
    history,
}) => {
    const productPropetries = [category, brand, title, msrp, price];

    const editHandler = () => {
        history.push(`/product/${id}`);
    };

    const productCells = productPropetries.map(propetry => (
        <TableCell>{propetry}</TableCell>
    ));

    return (
        <TableRows
            id={id}
            tableCells={productCells}
            editHandler={editHandler}
        />
    );
};
export default withRouter(ProductListItem);
