const validate = values => {
    const errors = {};
    if (!values.catalog) {
        errors.catalog = 'Please choose product Catalog';
    }
    if (!values.category) {
        errors.catalog = 'Please choose product Category';
    }
    if (!values.brand) {
        errors.catalog = 'Please choose product Brand';
    }
    if (!values.color) {
        errors.catalog = 'Please choose product Color';
    }
    return errors;
};

export default validate;
