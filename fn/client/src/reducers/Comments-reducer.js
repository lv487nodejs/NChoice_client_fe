const initialState = {
  comments: [],
};

const commentsReduser = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COMMENTS':
      let newComments = [...state.comments];
      newComments.unshift(action.payload);
      return {
        ...state,
        comments: newComments,
      };

    case 'REMOVE_COMMENTS':
      return {
        ...state,
        comments: state.comments.filter(item => item._id !== action.payload)
      };

    default:
      return state;
  }
};

export default commentsReduser;
