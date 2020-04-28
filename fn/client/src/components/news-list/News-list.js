import React, { useEffect } from 'react'
import './News-list.css';
import { connect } from 'react-redux';
import NewsListItem from '../news-list-item/News-list-item';
import withStoreService from '../hoc';
import {
    productsLoadingStart,
    productsLoadingStop
} from '../../actions';


const NewsList = ({ storeService, loading }) => {
    useEffect(() => {
        productsLoadingStart()
        storeService.getAllNews().then(news => {
            console.log(news);   
        })
    }, [storeService])


    return (
        <div className="news-cardDeck">
            <NewsListItem />
        </div>
    )
}

const mapStateToProps = ({
    productsList: { loading },
}) => ({
    loading
});
const mapDispatchToProps = {
    productsLoadingStart,
    productsLoadingStop
};

export default withStoreService()(
    connect(mapStateToProps, mapDispatchToProps)(NewsList)
);
