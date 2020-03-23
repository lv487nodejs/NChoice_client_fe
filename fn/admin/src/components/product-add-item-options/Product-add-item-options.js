import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { TextField } from '@material-ui/core';
import wrapWithAdminService from '../wrappers';

import { PRODUCT_OPTION_NAMES } from '../../config';
import { setProductGroupedPropetries } from '../../actions';
import LoadingBar from '../loading-bar';

const inputCapitalize = {
    style: { textTransform: 'capitalize' },
};

const INPUT_VARIANT = 'outlined';

const nativeSelect = {
    native: true,
};

const ProductAddItemOptions = ({
    adminService,
    setProductGroupedPropetries,
    classes,
    onChangeEvent,
    productEdit,
    productPropetriesEditGroups,
    loading,
}) => {
    const { productPropetriesService } = adminService;
    useEffect(() => {
        productPropetriesService
            .getProductOptions()
            .then(res => setProductGroupedPropetries(res.productOptions));
    }, [productPropetriesService, setProductGroupedPropetries]);

    if (loading) {
        return <LoadingBar />;
    }

    const getGroupOptions = (group, name) =>
        group.map(groupOption => (
            <option key={groupOption[name]} value={groupOption[name]}>
                {groupOption[name]}
            </option>
        ));

    const groupOptions = productPropetriesEditGroups.map((group, index) => {
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
                value={productEdit[optionName]}
                onChange={onChangeEvent}
                SelectProps={nativeSelect}
                inputProps={inputCapitalize}
                variant={INPUT_VARIANT}
            >
                <option value="" />
                {option}
            </TextField>
        );
    });

    return optionsMenu;
};

const mapStateToProps = ({
    productEditState: { productEdit, productPropetriesEditGroups, loading },
}) => ({
    productEdit,
    productPropetriesEditGroups,
    loading,
});

const mapDispatchToProps = {
    setProductGroupedPropetries,
};

export default wrapWithAdminService()(
    connect(mapStateToProps, mapDispatchToProps)(ProductAddItemOptions)
);
