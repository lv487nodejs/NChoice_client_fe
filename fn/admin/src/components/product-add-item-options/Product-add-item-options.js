import React from 'react';
import { TextField } from '@material-ui/core';
import { PRODUCT_OPTION_NAMES } from '../../config';

const inputCapitalize = {
    style: { textTransform: 'capitalize' },
};

const nativeSelect = {
    native: true,
};

const ProductAddItemOptions = ({ classes, onChangeEvent, values, optionGroups }) => {
    const getGroupOptions = (group, name) =>
        group.map(groupOption => (
            <option key={groupOption[name]} value={groupOption[name]}>
                {groupOption[name]}
            </option>
        ));

    const groupOptions = optionGroups.map((group, index) => {
        const name = PRODUCT_OPTION_NAMES[index];
        const options = getGroupOptions(group, name);
        return options;
    });

    const productOptions = groupOptions.map((option, index) => {
        const optionName = PRODUCT_OPTION_NAMES[index];

        return (
            <TextField
                required
                id={optionName}
                select
                className={classes.textfield}
                label={optionName}
                name={optionName}
                value={values[optionName]}
                onChange={onChangeEvent}
                SelectProps={nativeSelect}
                inputProps={inputCapitalize}
                variant="outlined"
            >
                {option}
            </TextField>
        );
    });

    return productOptions;
};

export default ProductAddItemOptions;
