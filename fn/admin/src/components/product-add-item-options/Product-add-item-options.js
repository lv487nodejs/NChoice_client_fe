import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import { PRODUCT_OPTION_NAMES } from '../../config';
import { setOptions } from '../../actions';
import LoadingBar from '../loading-bar';

const inputCapitalize = {
    style: { textTransform: 'capitalize' },
};

const nativeSelect = {
    native: true,
};

const ProductAddItemOptions = ({
    adminService,
    setOptions,
    classes,
    onChangeEvent,
    newProduct,
    options,
    loading,
}) => {
    useEffect(() => {
        adminService.getProductOptions().then(res => setOptions(res));
    }, [adminService, setOptions]);

    if (loading) {
        return <LoadingBar />;
    }

    const getGroupOptions = (group, name) =>
        group.map(groupOption => (
            <option key={groupOption[name]} value={groupOption[name]}>
                {groupOption[name]}
            </option>
        ));

    const groupOptions = options.map((group, index) => {
        const name = PRODUCT_OPTION_NAMES[index];
        const options = getGroupOptions(group, name);
        return options;
    });

    const productOptions = groupOptions.map((option, index) => {
        const optionName = PRODUCT_OPTION_NAMES[index];

        return (
            <TextField
                required
                key={optionName}
                select
                className={classes.textfield}
                label={optionName}
                name={optionName}
                value={newProduct[optionName]}
                onChange={onChangeEvent}
                SelectProps={nativeSelect}
                inputProps={inputCapitalize}
                variant="outlined"
            >
                <option value="" />
                {option}
            </TextField>
        );
    });

    return productOptions;
};

const mapStateToProps = ({ newProductState: { newProduct, options, loading } }) => ({
    newProduct,
    options,
    loading,
});

const mapDispatchToProps = {
    setOptions,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(ProductAddItemOptions)
);
