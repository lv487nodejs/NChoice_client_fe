import { ROWS_PER_PAGE_OPTIONS } from '../config';

const initialState = {
    pagesCount: 0,
    currentPage: 0,
    rowsPerPage: 10,
    rowsPerPageOptions: ROWS_PER_PAGE_OPTIONS,
};

const paginationState = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PAGES_COUNT':
            return {
                ...state,
                pagesCount: action.payload,
            };

        case 'SET_ROWS_PER_PAGE':
            return {
                ...state,
                rowsPerPage: action.payload,
            };

        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.payload,
            };

        default:
            return state;
    }
};

export default paginationState;
