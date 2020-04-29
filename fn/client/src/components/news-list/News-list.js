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


const NewsList = ({ storeService, loading, storeSetNews, news }) => {
    useEffect(() => {
        productsLoadingStart()
        storeService.getAllNews().then(newsArray => {
            storeSetNews(newsArray);   
        })
    }, [storeService,storeSetNews])

    // console.log(news)
    // const newsItems = news.map(newsItem =>{
    //     <NewsListItem />
    // })
    return (
        <div className="news-cardDeck">
            <NewsListItem />
        </div>
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
