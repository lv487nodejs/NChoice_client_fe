import React from 'react';
import { Grid, TextField, MenuItem } from '@material-ui/core';
import { useStyles } from './Product-page-style';

const ProductPage = () => {
    const classes = useStyles();

    const photo =
        'https://www.yourwdwstore.net/assets/images/6/60000/7000/600/67670-s1.jpg';
    const descr = 'Description';
    const propetries = 'Propetries';

    return (
        <Grid container spacing={3} className={classes.content}>
            <Grid item xs={6}>
                <img width="300px" src={photo} alt="here is" />
            </Grid>
            <Grid item xs={6}>
                <h2>{descr}</h2>
                <TextField
                    style={{ width: '80%' }}
                    id="filled-select-currency"
                    select
                    label="Select"
                    helperText="Please select your currency"
                    variant="filled"
                >
                    <MenuItem>Men</MenuItem>
                    <MenuItem>Women</MenuItem>
                    ))}
                </TextField>
            </Grid>
            <Grid item xs={12}>
                <h2>{propetries}</h2>
            </Grid>
        </Grid>
    );
};

export default ProductPage;
