import React, { useEffect, useState } from 'react';
import './News-detail-page.css';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import withStoreService from '../hoc';


const NewsDetailPage = ({
  news,
  match,
  storeService
}) => {

  const [articleToShow, setArticleToShow] = useState({})

  useEffect(() => {
    window.scrollTo(0, 0);
    //get article id from query
    const articleId = match.params.id;
    //check if the article is in redux store
    if (news.length === 0) {
      //get article from database
      storeService.getNewsById(articleId).then((res) => {
        setArticleToShow(res)
      })
    }
    else {
      //get article from redux store
      const article = news.filter(news => {
        return news._id === articleId
      });
      setArticleToShow(article[0])
    }
  }, [storeService, match.params.id, news])
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const dateToShow = new Date(articleToShow.date);
  const dateNews = dateToShow.toLocaleString('en-US', options);

  return (
    <div className="news-article">
      <div className="news-header">
        <h3 className="center">{articleToShow.title}</h3>
      </div>
      <small>{dateNews}</small>
      <hr className="line" />
      <div className="main-image-container">
        <img
          className="main-img"
          src={`/images/news/${articleToShow.newsImage}`}
          alt={`${articleToShow.newsImage}`} >
        </img>
      </div>
      <p>{articleToShow.text}</p>
      <iframe
        title='articleToShow.title'
        width="100%"
        height="400"
        src={articleToShow.newsVideo}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen>
      </iframe>
      <hr className="line" />
      <div className="ndp-footer">
      <div>created by {articleToShow.author}</div>
      <img
        id="ndp-author-img"
        src={`/images/news-authors/${articleToShow.authorPhoto}`}
        alt={`${articleToShow.authorPhoto}`} >
      </img>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  newsReduser: { news }
}) => ({
  news
});

export default withStoreService()(
  connect(mapStateToProps)(withRouter(NewsDetailPage))
);

