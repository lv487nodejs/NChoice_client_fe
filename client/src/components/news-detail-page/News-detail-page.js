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
    if (news.length===0){
      console.log('go to database')
    }
    else {
      const article = news.filter(news => {
        return news._id === articleId
      });
      setArticleToShow(article[0])
    }
  }, [storeService, match.params.id, news])

  return (
  <h1>{articleToShow.title}</h1>
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

