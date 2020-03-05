import React from 'react';

import { TableRow, TableCell } from '@material-ui/core';

import { DeleteButton, EditButton } from '../../buttons';

const TableRows = ({ id, tableCells, editHandler }) => (
    <TableRow key={id}>
        {tableCells}
        <TableCell>
            <DeleteButton />
            <EditButton eventHandler={editHandler} />
        </TableCell>
    </TableRow>
);

export default TableRows;
