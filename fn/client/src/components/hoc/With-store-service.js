import React from 'react';
import { StoreServiceConsumer } from '../store-service-context';


const withStoreService = () => (Wrapped) => {

    return (props) => {
        return (
            <StoreServiceConsumer>
                {
                    (storeService) => {
                        return (<Wrapped {...props}
                            storeService={storeService} />)
                    }
                }
            </StoreServiceConsumer>
        );
    }
}


export default withStoreService