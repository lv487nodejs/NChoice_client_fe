import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom';
import './Welcome-page.css';
import { Link, Redirect } from 'react-router-dom';
import { Button, Card, Image } from 'react-bootstrap';
import withStoreService from '../hoc';
import LoadingSpinner from "../Loading-spinner";



const Welcome = props => {
    const [confirmed, setConfirmed] = useState(false);
    const [redirect, setRedirect] = useState(false);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date().toLocaleDateString("en-US", options);
    const { match, storeService } = props;
    const { token } = match.params;

    useEffect(() => {
        (async()=>{
            try {
                const res = await storeService.confirmEmail(token);
                if(res) {
                    setConfirmed(true);
                } 
            } catch (error) {
                setConfirmed(false);
                setRedirect(true);      
            }
        })();
       
    });

    const success = (
        <Card className=" text-center">
            <Image className="welcome-logo" src="/images/welcome.png" />
            <Link to="/login" >
                <Button className="thanks-button" variant="dark">Go to login!</Button>
            </Link>
            <h3>{date}</h3>
        </Card>
    )

    if (redirect) {
        return <Redirect to='/error-page' />;
    }
    const loading = <LoadingSpinner />
    return confirmed ? success : loading;
}

export default withStoreService()(withRouter(Welcome));
