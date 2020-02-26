const initialState = {
    catalogs: [],
    catalog: {},
}

const catalogReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'CATALOGS_LOADED':
            return {
                catalogs: action.payload
            };

        default:
            return state;
    }
}

export default catalogReducer