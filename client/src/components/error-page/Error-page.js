import React from 'react'
import './Error-page.css';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'react-bootstrap'

const ErrorPage = () => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString("en-US", options)
    return (
        <Card className=" text-center">
            <Image className="thanks-logo" src="/images/oops.jpg" />
            <Link to="/" >
                <Button className="thanks-button" variant="dark">Go to home page</Button>
            </Link>
            <h3>{date}</h3>
        </Card>
    )
}

export default ErrorPage
