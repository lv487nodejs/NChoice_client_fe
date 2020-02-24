import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Category-carousel.css';

const CategoryCarousel = ({ image }) => (
    <Carousel>
        <Carousel.Item>
            <img className="d-block w-100" src={`/images/categories/${image}`} alt="First slide" />
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" src={`/images/categories/${image}`} alt="Third slide" />
        </Carousel.Item>
        <Carousel.Item>
            <img className="d-block w-100" src={`/images/categories/${image}`} alt="Third slide" />
        </Carousel.Item>
    </Carousel>
);

export default CategoryCarousel;
