import React, { useEffect } from 'react'
import './News-list.css';
import { connect } from 'react-redux';
import NewsListItem from '../news-list-item/News-list-item';
import withStoreService from '../hoc';
import {
    productsLoadingStart,
    productsLoadingStop,
    storeSetNews
} from '../../actions';


const NewsList = ({ storeService, storeSetNews, news }) => {
    useEffect(() => {
        productsLoadingStart()
        storeService.getAllNews().then(newsArray => {
            storeSetNews(newsArray);   
        })
    }, [storeService,storeSetNews])

    const newsItems = news.map(({ _id, text, title, newsImage, authorPhoto, date, author }) => (
        <NewsListItem
          title={title}
          text={text}
          newsImage={newsImage}
          key={_id}
          author={author}
          authorPhoto = {authorPhoto}
          date = {date}
        />
      ))

    return (
        <React.Fragment>
        <h2 className="text-center" id="news-title">News</h2>
        <div className="news-cardDeck">
            {newsItems}
        </div>
        </React.Fragment>
    )
}

const mapStateToProps = ({
    productsList: { loading },
    newsReduser: {news}
}) => ({
    loading,
    news
});
const mapDispatchToProps = {
    productsLoadingStart,
    productsLoadingStop,
    storeSetNews
};

export default withStoreService()(
    connect(mapStateToProps, mapDispatchToProps)(NewsList)
);
