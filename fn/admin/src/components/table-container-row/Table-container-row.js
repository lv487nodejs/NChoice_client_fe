import React from 'react';

import { TableRow, TableCell, Avatar } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import { DeleteButton, EditButton } from '../buttons';

const TableContainerRow = ({ id, editHandler, deleteHandler, ...rest }) => {
    const propetries = { ...rest };
    const tableCells = Object.values(propetries).map((propetry, index) => (
        <TableCell key={index}>{propetry}</TableCell>
    ));

    return (
        <TableRow key={id} hover>
            <TableCell>
                <Avatar>
                    <ImageIcon />
                </Avatar>
            </TableCell>
            {tableCells}
            <TableCell>
                <DeleteButton eventHandler={deleteHandler} />
                <EditButton eventHandler={editHandler} />
            </TableCell>
        </TableRow>
    );
};

export default TableContainerRow;
