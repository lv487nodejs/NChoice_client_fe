import React, { Fragment } from 'react';
import { TextField } from '@material-ui/core';
import { useStyles } from './Product-propetries-container-style';

const ProductPropetriesPage = ({ propetries: { _id, ...propetries } }) => {
    const classes = useStyles();
    const productPropetries = Object.keys({ ...propetries }).map(propetry => (
        <TextField
            key={propetry}
            className={classes.textField}
            label={propetry}
            value={propetries[propetry]}
            variant="outlined"
            size="small"
            InputProps={{
                readOnly: true,
            }}
        />
    ));

    return <Fragment>{productPropetries}</Fragment>;
};

export default ProductPropetriesPage;
