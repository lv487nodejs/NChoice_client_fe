import React from 'react';
import filter from '../../Filter-reducer';

import { filterByName } from '../../../actions';


describe('filter-reducer: FILTER_BY_NAME (searchTerm) type:', () => {
    let state, newState, action, fakeAction;

    beforeEach(() => {
        action = filterByName('newName')
        fakeAction = {type: 'FAKE_TYPE'};
        state = {
            brand: [],
            products: [],
            category: [],
            color: [],
            catalogFilter: '',
            searchTerm: '',
            searchValue: '',
        };
        newState = filter(state, action);
    })

    it('should return the object', () => {
        expect(typeof state).toStrictEqual('object');
    })

    it('should to be truthy', () => {
        expect(newState).toBeTruthy();
        expect(filter(state, fakeAction)).toBeTruthy();
    })

    it('shouldn‘t to be falsy', () => {
        newState = filter(undefined, fakeAction);
        expect(newState).not.toBeFalsy();
    })

    it('should to be null', () => {
        newState = filter(null, fakeAction);
        expect(newState).toBeNull();
    })

    it('should return default state without changes', () => {
        newState = filter(state, fakeAction);
        expect(newState).toStrictEqual(state);
    })

    it('should to change state.searchTerm value to the new value', () => {
        expect(newState).toStrictEqual({...state, searchTerm: 'newName'});
        expect(newState.searchTerm.length).toBe('newName'.length);
    })

    it('should to replace from state.searchTerm value to empty string', () => {
        action = filterByName('');
        newState = filter(state, action)
        expect(newState).toStrictEqual({...state})
        expect(newState.searchTerm).toBe('')
        expect(newState.searchTerm).toBeFalsy()
    })

    it('other state fields shouldn‘t to change', () => {
        state = {
            brand: ['Prada'],
            products: ['Jeans'],
            category: ['Women'],
            color: ['Blue'],
            catalogFilter: 'none',
            searchTerm: '',
            searchValue: 'none',
        };

        //ADDING
        newState = filter(state, action);
        expect(newState).toStrictEqual({...state, searchTerm: 'newName'})
        expect(newState.searchTerm).toBe('newName')
        expect(newState.color.length).toBe(1);
        expect(newState.category[0]).toEqual('Women');

        //REMOVING
        action = filterByName('');
        newState = filter(state, action)
        expect(newState).toStrictEqual({...state});
        expect(newState.color.includes('Blue')).toStrictEqual(state.color.includes('Blue'));
        expect(newState.color.length).toBe(1);
    })
})
