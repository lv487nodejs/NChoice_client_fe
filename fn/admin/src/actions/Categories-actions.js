const categoriesSet = newCategories => ({
    type: 'CATEGORIES_SET',
    payload: newCategories,
});

const categoriesStartLoading = () => ({
    type: 'START_LOADING',
});

const categorySet = newCategory => ({
    type: 'CATEGORY_SET',
    payload: newCategory,
});

const successSet = success => ({
    type: 'SUCCESS_CHANGE',
    payload: success,
});

export { categoriesSet, categoriesStartLoading, categorySet, successSet };
