const initialState = {
  comments: []
};

const commentsReduser = (state = initialState, action) => {

  let x = [...state.comments]
  console.log(x);
  console.log(action.payload);
  
  switch (action.type) {
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: [...state.comments, action.payload],
      };

    case 'REMOVE_COMMENTS':
      let a = [...state.comments.filter(item => item._id !== action.payload)]
      return {
        ...state,
        comments: a
      };

    default:
      return state;
  }
};

export default commentsReduser;
