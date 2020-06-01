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
    const articleId = match.params.id;
    if (news.length === 0) {
      console.log('go to database')
    }
    else {
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
  const newsVideo = '/video/horondi.mp4'
  return (
    <div className="news-article">
      <h3 className="center">{articleToShow.title}</h3>
      <p>{dateNews}</p>
      <img
        src={`/images/news/${articleToShow.newsImage}`}
        alt={`${articleToShow.newsImage}`} ></img>
      <p>{articleToShow.text}</p>
      <video width="320" height="240" controls>
        <source src={newsVideo} type="video/mp4"></source>
      </video>
      <div>{articleToShow.author}</div>
      <img
        src={`/images/news-authors/${articleToShow.authorPhoto}`}
        alt={`${articleToShow.authorPhoto}`} ></img>
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

