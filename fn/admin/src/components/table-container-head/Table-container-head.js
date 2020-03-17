import React from 'react';

import { TableHead, TableRow, TableCell } from '@material-ui/core';

const TableContainerHead = ({ titles }) => {
    const headRow = titles.map((title, index) => (
        <TableCell key={index}>{title}</TableCell>
    ));

    return (
        <TableHead key="head">
            <TableRow>{headRow}</TableRow>
        </TableHead>
    );
};

export default TableContainerHead;
