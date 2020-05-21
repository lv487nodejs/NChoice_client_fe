import React from 'react'
import './News-list-item.css';
import { Card, Image } from 'react-bootstrap'

const NewsListItem = ({ text, title, newsImage, authorPhoto, date, author }) => {
    const options = {  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    const dateToShow = new Date(date)
    const dateNews = dateToShow.toLocaleString("en-US", options)

    return (
            <section className="news-card">
                <div className="images-container">
                <Card.Img className="card-img" variant="top" src={`/images/news/${newsImage}`} />
                </div>
                <hr/>
                <small className="text-muted">{dateNews}</small>
                <Card.Body>
                    <Card.Title className="news-card-title">{title}</Card.Title>
                    <Card.Text className = "article">
                        {text}
                    </Card.Text>
                </Card.Body>
                <div className="news-footer">
                    <small id="loading" className="author">by {author}</small>
                    <Image className="footer-image" src={`/images/news-authors/${authorPhoto}`} roundedCircle />
                </div>
            </section>
    )
}

export default NewsListItem
