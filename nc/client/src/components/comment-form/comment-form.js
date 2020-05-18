import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import './comment-form.css'
import {setComments} from "../../actions";
import withStoreService from "../hoc";
import {getFromLocalStorage} from "../../services/localStoreService";
import CommentItem from "../comment-item/comment-item";
import {Link} from 'react-router-dom';
import StarsRating from "../star-rating";

const CommentForm = ({productId, setComments, storeService, comments, rate}) => {
  const [text, setText] = useState('');
  const userId = getFromLocalStorage('userId');
  const [tempText, setTempText] = useState(null);

  useEffect(() => {
    if (productId) {
      storeService.getCommentsByProductId(productId).then((res) => {
        setComments(res)
      });
    }
  }, [tempText, userId, storeService, productId, setComments]);

  const addComment = (e) => {
    e.preventDefault();
    storeService.postComments({text, productId, user: userId});
    setText('');
    setTempText(text);
  };

  const logged = (
    <form className='form my-1 comments-form'
          onSubmit={addComment}
    >
      <h3> Leave a comment </h3>
      <div className='star'><h6 className='rate'> Rate the product: </h6> <StarsRating rating={rate} id={productId}/></div>
      <textarea className='feedback-form'
                name='text'
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Share your thoughts with other customers"
                required
      />
      <input type='submit' value='Add a comment' className='comment-submit'/>
    </form>
  );

  const notLogged = (
    <div>
      <h3 className='login-link'>To leave a comment please
        <Link to="/login"> <span>login</span> </Link></h3>
    </div>
  );

  const items = comments.filter(comment => comment.user != null).map(comment => {
      return <CommentItem key={comment._id}
                          text={comment.text}
                          date={comment.date}
                          reviewerName={comment.user.firstName}
                          reviewerId={comment.user._id}
                          commentId={comment._id} />
    }
  ).sort((a, b) => b.date - a.date).reverse();

  let comentsNumber = comments.filter(comment => comment.user != null).length;

  return (
    <div>
      <div>
        {userId === null && notLogged}
      </div>
      <div className='form-textarea'>
        {userId !== null && logged}
      </div>
      <h3 className='review-title'>Customer reviews
        <span className='review-length'> {comentsNumber} </span></h3>
      {items}
    </div>
  )
};

const mapStateToProps = ({commentsReduser: {comments}}) => ({comments});
const mapDispatchToProps = {setComments};

export default withStoreService()(
  connect(mapStateToProps, mapDispatchToProps)(CommentForm)
);
