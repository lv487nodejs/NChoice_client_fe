import { FILTER_OPTIONS } from '../config';

const initialState = {
    filterOptions: FILTER_OPTIONS,
};

const filtersState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            return {
                ...state,
                filterOptions: action.payload,
            };

        default:
            return state;
    }
};

export default filtersState;
