import React from 'react';
import { connect } from 'react-redux';

import { Paper, Typography } from '@material-ui/core';
import { setProductEdit, setProductPropetriesEdit } from '../../actions';

import { SaveButton } from '../buttons';
import ProductAddPropetriesItem from '../product-add-propetries-item';

const buttonLabel = 'ADD SIZE';
const propsKeys = ['size', 'available', 'sku'];

const AddProductPropetries = ({
    setProductPropetriesEdit,
    setProductEdit,
    productPropetriesEdit,
    productEdit,
    classes,
}) => {
    const handleInputChange = event => {
        const { name, value } = event.target;
        setProductPropetriesEdit({ ...productPropetriesEdit, [name]: value });
    };

    const handleAddPropetries = () => {
        setProductEdit({
            ...productEdit,
            propetries: [...productEdit.propetries, productPropetriesEdit],
        });
    };

    const propetryTextFields = Object.keys(productPropetriesEdit).map(name => (
        <ProductAddPropetriesItem
            key={name}
            classes={classes}
            name={name}
            handleInputChange={handleInputChange}
        />
    ));

    const addedPropetries = productEdit.propetries.map(item =>
        propsKeys.map(key => <Typography key={item[key]}>{`${key}: ${item[key]}`}</Typography>)
    );

    return (
        <Paper className={classes.productPropetries}>
            {propetryTextFields}
            <SaveButton title={buttonLabel} eventHandler={handleAddPropetries} />
            {addedPropetries}
        </Paper>
    );
};

const mapStateToProps = ({
    productEditState: { productEdit, productPropetriesEdit, loading },
}) => ({
    productEdit,
    productPropetriesEdit,
    loading,
});

const mapDispatchToProps = {
    setProductPropetriesEdit,
    setProductEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPropetries);
