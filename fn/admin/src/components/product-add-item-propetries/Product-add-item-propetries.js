import React from 'react';
import { connect } from 'react-redux';

import { Paper, Typography, Button } from '@material-ui/core';
import { setProductEdit, setProductPropetriesEdit } from '../../actions';

import { SaveButton } from '../buttons';
import ProductAddPropetriesItem from '../product-add-propetries-item';
import { useStyles } from './Product-add-item-propetries-style';

const ADD_BUTTON_LABEL = 'ADD SIZE';
const REMOVE_BUTTON_LABEL = 'REMOVE SIZE';
const propsKeys = ['size', 'available', 'sku'];

const AddProductPropetries = ({
    setProductPropetriesEdit,
    setProductEdit,
    productPropetriesEdit,
    productEdit,
}) => {
    const classes = useStyles();

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

    const handleRemoveProperty = sizeToRemove => () => {
        const filteredPropetries = productEdit.propetries.filter(
            property => property.size !== sizeToRemove
        );
        setProductEdit({
            ...productEdit,
            propetries: [...filteredPropetries],
        });
    };

    const propetryTextFields = Object.keys(productPropetriesEdit).map(name => (
        <ProductAddPropetriesItem key={name} name={name} handleInputChange={handleInputChange} />
    ));

    const addedPropetries = productEdit.propetries.map(item => (
        <Paper key={item.size} className={classes.productPropetries}>
            {propsKeys.map(key => (
                <Typography
                    className={classes.propsText}
                    key={item[key]}
                >{`${key}: ${item[key]}`}</Typography>
            ))}
            <Button
                size="small"
                variant="contained"
                color="secondary"
                className={classes.button}
                onClick={handleRemoveProperty(item.size)}
            >
                {REMOVE_BUTTON_LABEL}
            </Button>
        </Paper>
    ));

    return (
        <Paper className={classes.productPropetries}>
            {propetryTextFields}
            <div>
                <SaveButton title={ADD_BUTTON_LABEL} eventHandler={handleAddPropetries} />
            </div>
            <div className={classes.addedPropetries}>{addedPropetries}</div>
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
