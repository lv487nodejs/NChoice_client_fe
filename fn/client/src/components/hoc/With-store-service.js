import React from 'react';
import { StoreServiceConsumer } from '../store-service-context';

const withStoreService = () => Wrapped => props => (
    <StoreServiceConsumer>{a => <Wrapped {...props} a={a} />}</StoreServiceConsumer>
);

export default withStoreService;
