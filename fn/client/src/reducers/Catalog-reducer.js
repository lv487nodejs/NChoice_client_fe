const initialState = {
    catalogs: [],
    catalog: '',
};

const catalogs = (state = initialState, action) => {
    switch (action.type) {
        case 'CATALOGS_LOADED':
            return {
                catalogs: action.payload,
            };
        case 'CATALOG_LOADED':
            return {
                catalog: action.payload
            }
        default:
            return state;
    }
};

export default catalogs;
