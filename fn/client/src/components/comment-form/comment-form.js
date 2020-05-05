import React, {useEffect, useState} from 'react'
import {connect} from 'react-redux';
import {setComments} from "../../actions";

const CommentForm = ({ setComments}) => {
  const [text, setText] = useState('');

  return (
    <div className='post-form'>
      <div>
        <h3>Leave a comment</h3>
      </div>
      <form className='form my-1'
            onSubmit={e => {
              e.preventDefault();
              setComments({text});
              setText();
            }}
      >
        <textarea
          name='text'
          rows='5'
          cols='30'
          value={text}
          onChange={e => setText(e.target.value)}
        />
        <input type='submit' value='Submit'/>

      </form>


    </div>
  )
}

const mapDispatchToProps = {setComments}
export default connect(mapDispatchToProps)(CommentForm)
