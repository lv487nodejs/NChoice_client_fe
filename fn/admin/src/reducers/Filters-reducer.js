import { FILTER_OPTIONS } from '../config';

const initialState = {
    checkboxStatus: {},
    checkboxLoaded: false,
    filterSelected: FILTER_OPTIONS,
    filterOptionsGroups: [],
    filterOptionsList: {},
};

const filtersState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_CHECKBOX_STATUS':
            return {
                ...state,
                checkboxStatus: action.payload,
                checkboxLoaded: true,
            };

        case 'SET_FILTER_SELECTED':
            return {
                ...state,
                filterSelected: action.payload,
            };

        case 'SET_FILTER_OPTIONS_LIST':
            return {
                ...state,
                filterOptionsList: action.payload,
            };

        case 'SET_FILTER_OPTIONS_GROUPS':
            return {
                ...state,
                filterOptionsGroups: action.payload,
            };

        default:
            return state;
    }
};

export default filtersState;
