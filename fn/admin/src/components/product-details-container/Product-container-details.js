import React from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';
import { useStyles } from './Product-container-details-style';

const ProductContainerDetails = ({ ...product }) => {
    const classes = useStyles();

    const productDetails = Object.keys({ ...product }).map(propetry => (
        <TextField
            key={propetry}
            className={classes.textField}
            fullWidth
            id="outlined-name"
            label={propetry}
            value={product[propetry]}
            variant="outlined"
            size="small"
            multiline
            InputProps={{
                readOnly: true,
            }}
        />
    ));

    return (
        <Grid item xs={8}>
            <Paper elevation={3} className={classes.paper}>
                {productDetails}
            </Paper>
        </Grid>
    );
};

export default ProductContainerDetails;
