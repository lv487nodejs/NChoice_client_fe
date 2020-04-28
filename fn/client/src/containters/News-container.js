import React from 'react'
import NewsList from '../components/news-list'

const NewsContainer = () => {
    return (
        <div>
          <h2 className="text-center">News</h2>
          <NewsList></NewsList>  
        </div>
    )
}
export default NewsContainer;