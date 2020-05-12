import React from 'react'
import Moment from 'react-moment';
import './comment-item.css'
import withStoreService from "../hoc";
import connect from "react-redux/es/connect/connect";
import { removeComments } from '../../actions';
const CommentItem = ({text, date, reviewerName, id, storeService, removeComments}) => {
  const deleteHandler = (id) => {
    storeService.deleteComment(id);
    removeComments(id);
  };
  return (
    <div>
      <div className='review-field'>
        <div className='review-items'>
          <h6>{reviewerName}</h6>
          <div className='review-date'>
            <Moment format="YYYY/MM/DD ">{date}</Moment>
            <button onClick={()=>deleteHandler(id)} >DELETE</button>
          </div>

        </div>
        <p className='my-1 review-text'> {text} </p>

      </div>
    </div>
  )
};
const mapStateToProps = ({commentsReduser: {comments}}) => ({comments});

const mapDispatchToProps = {
  removeComments
}
// export default (CommentItem)
export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(CommentItem)
);
