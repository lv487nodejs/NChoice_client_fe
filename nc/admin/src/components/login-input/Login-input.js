import React from 'react';
import { useStyles } from './Login-input-styles';
import { TextField } from '@material-ui/core';

const LoginInput = props => {
    const { name, lable, focus, value } = props;
    const classes = useStyles();

    return (
        <TextField
            className={classes.input}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id={name}
            label={lable}
            value={value}
            name={name}
            autoFocus={focus}
            type={name}
        />
    );
};

export default LoginInput;