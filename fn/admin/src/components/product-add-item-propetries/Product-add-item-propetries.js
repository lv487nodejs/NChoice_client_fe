import React from 'react';
import { TextField, Paper } from '@material-ui/core';
import { SIZES_CLOTHES /* , SIZES_SHOES */ } from '../../config';
import { SaveButton } from '../buttons';

const nativeSelect = {
    native: true,
};

const inputString = 'string';
const inputNumber = 'number';
const inputSize = 'size';
const inputAvailable = 'available';
const buttonLabel = 'ADD SIZE';

const AddProductPropetries = ({ classes, newPropetry, onChangeEvent, onSubmitEvent }) => {
    const sizeOptions = SIZES_CLOTHES.map(size => (
        <option key={size} value={size}>
            {size}
        </option>
    ));

    const propetryTextFields = Object.keys(newPropetry).map(name => {
        const select = name === inputSize;
        const inputType = name !== inputAvailable ? inputString : inputNumber;

        return (
            <TextField
                required
                key={name}
                select={select}
                className={classes.textfield}
                name={name}
                label={name}
                type={inputType}
                value={newPropetry[name]}
                onChange={onChangeEvent}
                SelectProps={nativeSelect}
                variant="outlined"
            >
                <option value="" />
                {sizeOptions}
            </TextField>
        );
    });

    return (
        <Paper className={classes.productPropetries}>
            {propetryTextFields}
            <SaveButton title={buttonLabel} eventHandler={onSubmitEvent} />
        </Paper>
    );
};

export default AddProductPropetries;
