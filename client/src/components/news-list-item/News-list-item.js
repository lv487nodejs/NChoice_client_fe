import React from 'react';
import './News-list-item.css';
import { Card, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const NewsListItem = ({
  text,
  title,
  newsImage,
  authorPhoto,
  date,
  author,
  newsId
}) => {
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  const dateToShow = new Date(date);
  const dateNews = dateToShow.toLocaleString('en-US', options);

  return (
    <section className='news-card'>
      <div className='images-container'>
        <Card.Img
          className='card-img'
          variant='top'
          alt={title}
          src={`/images/news/${newsImage}`}
        />
      </div>
      <hr />
      <small className='text-muted'>{dateNews}</small>
      <Card.Body>
        <Card.Title className='news-card-title'>{title}</Card.Title>
        <Card.Text className='article'>{text}</Card.Text>
        <Link to={`/news/${newsId}`}>
          <Button variant="dark">read more...</Button>
        </Link>
      </Card.Body>
      <div className='news-footer'>
        <small className='author'>
          by {author}
        </small>
        <Image
          className='footer-image'
          src={`/images/news-authors/${authorPhoto}`}
          roundedCircle
          alt={author}
        />
      </div>
    </section>
  );
};

export default NewsListItem;
