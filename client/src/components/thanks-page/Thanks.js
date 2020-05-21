import React, {useEffect}from 'react'
import './Thanks.css';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap'

const Thanks = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString("en-US", options)

    useEffect(() => {
        window.scrollTo(0,0)
      }, []);

    const message = `Dear Customer, \n
    Thank you for visiting us and making your purchase!
    We’re glad that you found what you were looking for.
    It is our goal that you are always happy with what you bought from us,
    so please let us know if your buying experience was anything short of excellent.
    We look forward to seeing you again.Have a great day!\n
    Best Regards, Your friends at NChoice`;

    return (
        <Card className=" text-center">
            <Card.Body >
                <Card.Title >Thank You for Your Order</Card.Title>
                <Card.Text className="text">
                    {message}
                </Card.Text>
                <Link to="/" >
                    <Button className="thanks-button" variant="dark">Lets go shop some more!</Button>
                </Link>
            </Card.Body>
            {date}
        </Card>
    )
}

export default Thanks
