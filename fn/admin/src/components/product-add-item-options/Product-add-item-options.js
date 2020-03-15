import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import { PRODUCT_OPTION_NAMES } from '../../config';
import { setProductOptions } from '../../actions';
import LoadingBar from '../loading-bar';

const inputCapitalize = {
    style: { textTransform: 'capitalize' },
};

const nativeSelect = {
    native: true,
};

const ProductAddItemOptions = ({
    adminService,
    setProductOptions,
    classes,
    onChangeEvent,
    newProduct,
    productOptions,
    loading,
}) => {
    useEffect(() => {
        adminService.getProductOptions().then(res => setProductOptions(res));
    }, [adminService, setProductOptions]);

    if (loading) {
        return <LoadingBar />;
    }

    const getGroupOptions = (group, name) =>
        group.map(groupOption => (
            <option key={groupOption[name]} value={groupOption[name]}>
                {groupOption[name]}
            </option>
        ));

    const groupOptions = productOptions.map((group, index) => {
        const name = PRODUCT_OPTION_NAMES[index];
        const options = getGroupOptions(group, name);
        return options;
    });
    const optionsMenu = groupOptions.map((option, index) => {
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

    return optionsMenu;
};

const mapStateToProps = ({ productsState: { newProduct, productOptions, loading } }) => ({
    newProduct,
    productOptions,
    loading,
});

const mapDispatchToProps = {
    setProductOptions,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(ProductAddItemOptions)
);
