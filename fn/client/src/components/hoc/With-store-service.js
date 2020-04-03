import React from 'react';
import { StoreServiceConsumer } from '../store-service-context';

const withStoreService = () => Wrapped => props => (
    <StoreServiceConsumer>{cartAndStoreService => <Wrapped {...props} cartAndStoreService={cartAndStoreService} />}</StoreServiceConsumer>
);

export default withStoreService;
