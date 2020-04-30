import React from 'react'
import './Welcome-page.css';
import { Link } from 'react-router-dom';
import { Button, Card, Image } from 'react-bootstrap'

const Welcome = () => {
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString("en-US", options)
    return (
        <Card className=" text-center">
            <Image className="welcome-logo" src="/images/welcome.png" />
            <Link to="/" >
                <Button className="thanks-button" variant="dark">Let's go shopping!</Button>
            </Link>
            <h3>{date}</h3>
        </Card>
    )
}

export default Welcome
