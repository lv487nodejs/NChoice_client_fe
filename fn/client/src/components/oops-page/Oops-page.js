import React from 'react'
import './Oops-page.css';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'react-bootstrap'

const OopsPage = () => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString("en-US", options)
    return (
        <Card className=" text-center">
            <Card.Header className=" bg-dark text-white">
                <Image className="thanks-logo bg-danger" src="/images/logo.svg" />
            </Card.Header>
            <Card.Body >
                <Card.Title >Warning!</Card.Title>
                <Card.Text className="text">
                    <h2><pre>Oops! Something went wrong!</pre></h2>
                </Card.Text>
                <Link to="/" >
                    <Button className="thanks-button" variant="dark">Lets go shop some more!</Button>
                </Link>
            </Card.Body>
            <Card.Footer className="bg-dark text-white">{date}</Card.Footer>
        </Card>
    )
}

export default OopsPage
