import { updateFilter } from './updateFilter'

const reducer = (state, action) => {
    return {
        ...state,
        ...updateFilter(state, action)
    }
};

export default reducer;
