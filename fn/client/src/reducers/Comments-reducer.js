const initialState = {
  comments: [],
};

const commentsReduser = (state = initialState, action) => {
  console.log(state)
  switch (action.type) {
    case 'SET_COMMENTS':
      let newComments = [...state.comments];
      newComments.unshift(action.payload);
      return {
        ...state,
        comments: newComments,
      };

    case 'REMOVE_COMMENTS':
      let a = [...state.comments.filter(item => item._id !== action.payload)]
      console.log(a);
      return {
        ...state,
        comments: a
      };

    default:
      return state;
  }
};

export default commentsReduser;
