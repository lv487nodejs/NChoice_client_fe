const initialState = {
    catalogs: [],
    catalog: '',
    loading: true,
};

const catalogsState = (state = initialState, action) => {
    switch (action.type) {
        case 'LOADING_STATUS':
            return {
                ...state,
                loading: true,
            };

        case 'GET_CATALOG':
            return {
                ...state,
                catalog: action.payload,
                loading: false,
            };

        case 'GET_CATALOGS':
            return {
                ...state,
                catalogs: action.payload,
                loading: false,
            };

        default:
            return state;
    }
};

export default catalogsState;
