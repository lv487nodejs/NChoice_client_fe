import React from 'react';
import { Grid, Paper, TextField } from '@material-ui/core';
import { useStyles } from './Product-propetries-container-style';

const ProductPropetriesPage = ({ propetries: { _id, ...propetries } }) => {
    const classes = useStyles();
    console.log(_id);
    const productPropetries = Object.keys({ ...propetries }).map(propetry => (
        <TextField
            className={classes.textField}
            id={_id}
            label={propetry}
            value={propetries[propetry]}
            variant="outlined"
            size="small"
            InputProps={{
                readOnly: true,
            }}
        />
    ));

    return (
        <Grid xs>
            <Paper elevation={3} className={classes.paper}>
                {productPropetries}
            </Paper>
        </Grid>
    );
};

export default ProductPropetriesPage;
