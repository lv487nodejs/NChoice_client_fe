import React from 'react';

import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

const ProductListItem = ({ id, category, brand, title, msrp, price }) => (
    <TableRow key={id}>
        <TableCell>{title}</TableCell>
        <TableCell>{category}</TableCell>
        <TableCell>{brand}</TableCell>
        <TableCell>{msrp}</TableCell>
        <TableCell>{price}</TableCell>
    </TableRow>
);
export default ProductListItem;
