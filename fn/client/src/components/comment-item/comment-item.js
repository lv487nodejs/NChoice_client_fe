import React from 'react'
import Moment from 'react-moment';
import './comment-item.css'

const CommentItem = ({text, date, firstName}) => {
  return (
    <div>
      <div className='review-field'>
        <div className='review-items'>
          <h6>{firstName}</h6>
          <div className='review-date'>
            <Moment format="YYYY/MM/DD">{date}</Moment>
          </div>
        </div>
        <p className='my-1 review-text'> {text} </p>
      </div>
    </div>
  )
};

export default (CommentItem)

