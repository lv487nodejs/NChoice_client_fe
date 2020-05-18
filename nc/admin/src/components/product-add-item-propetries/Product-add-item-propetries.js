import React from 'react';
import { connect } from 'react-redux';

import { Paper, Typography } from '@material-ui/core';
import { setProductModel, setSizeModel } from '../../actions';

import { SaveButton, StandardButton } from '../buttons';
import ProductAddPropetriesItem from '../product-add-propetries-item';
import { useStyles } from './Product-add-item-propetries-style';

const ADD_BUTTON_LABEL = 'ADD SIZE';
const REMOVE_BUTTON_LABEL = 'REMOVE SIZE';
const propsKeys = ['size', 'available', 'sku'];

const AddProductPropetries = ({ setSizeModel, setProductModel, sizeModel, productModel }) => {
    const classes = useStyles();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setSizeModel({ ...sizeModel, [name]: value });
    };

    const handleAddPropetries = () => {
        setProductModel({
            ...productModel,
            propetries: [...productModel.propetries, sizeModel],
        });
    };

    const handleRemoveProperty = sizeToRemove => () => {
        const filteredPropetries = productModel.propetries.filter(
            property => property.size !== sizeToRemove
        );
        setProductModel({
            ...productModel,
            propetries: [...filteredPropetries],
        });
    };

    const propetryTextFields = Object.keys(sizeModel).map(name => (
        <ProductAddPropetriesItem key={name} name={name} handleInputChange={handleInputChange} />
    ));

    const addedPropetries = productModel.propetries.map(item => (
        <Paper key={item.size} className={classes.productPropetries}>
            {propsKeys.map(key => (
                <Typography
                    className={classes.propsText}
                    key={item[key]}
                >{`${key}: ${item[key]}`}</Typography>
            ))}
            <StandardButton
                size="small"
                color="secondary"
                className={classes.button}
                eventHandler={handleRemoveProperty(item.size)}
                title={REMOVE_BUTTON_LABEL}
                id={item.size}
            />
        </Paper>
    ));

    return (
        <Paper className={classes.productPropetries}>
            {propetryTextFields}
            <div>
                <SaveButton id="add" title={ADD_BUTTON_LABEL} eventHandler={handleAddPropetries} />
            </div>
            <div className={classes.addedPropetries}>{addedPropetries}</div>
        </Paper>
    );
};

const mapStateToProps = ({ productModelState: { productModel, sizeModel, loading } }) => ({
    productModel,
    sizeModel,
    loading,
});

const mapDispatchToProps = {
    setSizeModel,
    setProductModel,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddProductPropetries);
