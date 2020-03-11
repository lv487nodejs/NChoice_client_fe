import React from 'react';
import { TextField, Paper, Button } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import { SIZES_CLOTHES, SIZES_SHOES } from '../../config';

const SKU_FIELD_RULES = { maxLength: 12, minLength: 8 };

const AddProductPropetries = ({ classes, newPropetry, onChangeEvent, onSubmitEvent }) => {
    const sizeOptions = SIZES_CLOTHES.map(size => (
        <option key={size} value={size}>
            {size}
        </option>
    ));

    console.log(newPropetry);
    return (
        <Paper>
            <TextField
                required
                id="size"
                select
                className={classes.textfield}
                name="size"
                label="Choose size"
                value={newPropetry.size}
                onChange={onChangeEvent}
                SelectProps={{
                    native: true,
                }}
                variant="outlined"
            >
                {sizeOptions}
            </TextField>
            <TextField
                required
                className={classes.textfield}
                id="available"
                label="Choose available"
                name="available"
                value={newPropetry.available}
                onChange={onChangeEvent}
                type="number"
                variant="outlined"
            />
            <TextField
                required
                className={classes.textfield}
                id="sku"
                label="Choose sku"
                name="sku"
                value={newPropetry.sku}
                onChange={onChangeEvent}
                variant="outlined"
                inputProps={SKU_FIELD_RULES}
            />
            <Button
                variant="contained"
                color="primary"
                size="large"
                className={classes.button}
                startIcon={<SaveIcon />}
                onClick={onSubmitEvent}
            >
                ADD PROPETRY
            </Button>
        </Paper>
    );
};

export default AddProductPropetries;
