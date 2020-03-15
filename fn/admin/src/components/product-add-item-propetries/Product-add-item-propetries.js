import React from 'react';
import { connect } from 'react-redux';

import { Paper, Typography } from '@material-ui/core';
import { setNewPropetries, setNewProduct } from '../../actions';

import { SaveButton } from '../buttons';
import ProductAddPropetriesItem from '../product-add-propetries-item';

const buttonLabel = 'ADD SIZE';
const propsKeys = ['size', 'available', 'sku'];

const AddProductPropetries = ({
    setNewPropetries,
    setNewProduct,
    newPropetries,
    newProduct,
    classes,
}) => {
    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewPropetries({ ...newPropetries, [name]: value });
    };

    const handleAddPropetries = () => {
        setNewProduct({ ...newProduct, propetries: [...newProduct.propetries, newPropetries] });
    };

    const propetryTextFields = Object.keys(newPropetries).map(name => (
        <ProductAddPropetriesItem
            key={name}
            classes={classes}
            name={name}
            handleInputChange={handleInputChange}
        />
    ));

    const addedPropetries = newProduct.propetries.map(item =>
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

const mapStateToProps = ({ productsState: { newProduct, newPropetries, loading } }) => ({
    newProduct,
    newPropetries,
    loading,
});

const mapDispatchToProps = {
    setNewPropetries,
    setNewProduct,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPropetries);
