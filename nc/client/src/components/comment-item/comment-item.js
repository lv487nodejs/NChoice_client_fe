import React from 'react'
import Moment from 'react-moment';
import './comment-item.css'
import withStoreService from "../hoc";
import connect from "react-redux/es/connect/connect";
import {removeComments} from '../../actions';
import {getFromLocalStorage} from "../../services/localStoreService";

const CommentItem = ({text, date, reviewerName, reviewerId, commentId, storeService, removeComments}) => {

  const userId = getFromLocalStorage('userId');
  const deleteHandler = (commentId) => () => {
    storeService.deleteComment(commentId);
    removeComments(commentId);
  };

  return (
    <div>
      <div className='review-field'>
        <div className='review-items'>
          <h6>{reviewerName}</h6>
          <div className='review-date'>
            <Moment format="YYYY/MM/DD ">{date}</Moment>
          </div>
        </div>
        <div className='review-items' >
          <p className='my-1 review-text'> {text} </p>
          {userId === reviewerId && (
            <button onClick={deleteHandler(commentId)}>x</button>
          )}
        </div>
      </div>
    </div>
  )
};

const mapDispatchToProps = {removeComments};

export default withStoreService()(
  connect(null, mapDispatchToProps)(CommentItem)
);
