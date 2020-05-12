import React, { useEffect, useState, useCallback } from 'react'
import { connect } from 'react-redux';
import './comment-form.css'
import { setComments } from "../../actions";
import withStoreService from "../hoc";
import { getFromLocalStorage } from "../../services/localStoreService";
import CommentItem from "../comment-item/comment-item";
import { Link } from 'react-router-dom';
import StarsRating from "../star-rating";

let receivedUser;

const CommentForm = ({ productId, setComments, storeService, comments }) => {
  const [text, setText] = useState('');
  const [reviews, setReviews] = useState([]);
  const userId = getFromLocalStorage('userId');
  const accessToken = getFromLocalStorage('accessToken');

  const getComments = useCallback(() => {
    if (productId && userId) {
      storeService.getCommentsByProductId(productId).then((res) => {
        setReviews(res)
        setComments(res)
      });
      storeService.getUserById(userId, accessToken)
        .then((res) => receivedUser = `${res.data.user.firstName}`)
    }
  }, [comments, userId, accessToken, storeService, productId]);

  useEffect(() => {
    getComments();
  }, [productId]);

  const addComment = (e) => {
    e.preventDefault();
    setComments({ text, productId, user: receivedUser });
    storeService.postComments({ text, productId, user: userId });
    setText('');
  };

  const logged = (
    <form className='form my-1 comments-form'
      onSubmit={addComment}
    >
      <h3> Leave a comment </h3>
      <div className='star'><h6 className='rate'> Rate the product: </h6> <StarsRating /></div>
      <textarea className='feedback-form'
        name='text'
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Share your thoughts with other customers"
        required
      />
      <input type='submit' value='Add a comment' className='comment-submit' />
    </form>
  );

  const notLogged = (
    <div>
      <h3 className='login-link'>To leave a comment please
        <Link to="/login"> <span>login</span> </Link></h3>
    </div>
  );

  const items = reviews.map(comment => {
    return <CommentItem key={comment._id}
      text={comment.text}
      date={comment.date}
      reviewerName={comment.user.firstName}
      id={comment._id} />
  }
  ).sort((a, b) => b.date - a.date).reverse();

  return (
    <div>
      <div>
        {userId === null && notLogged}
      </div>
      <div className='form-textarea'>
        {userId !== null && logged}
      </div>
      <h3 className='review-title'>Customer reviews
        <span className='review-length'> {reviews.length} </span></h3>
      {items}
    </div>
  )
};

const mapStateToProps = ({ commentsReduser: { comments } }) => ({ comments });
const mapDispatchToProps = { setComments };

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(CommentForm)
);
