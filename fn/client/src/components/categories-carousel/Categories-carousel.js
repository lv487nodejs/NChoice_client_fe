import React from 'react';
import { Carousel } from 'react-bootstrap';
import './Categories-carousel.css';

const CategoriesCarousel = ({ image }) => (
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

export default CategoriesCarousel;
