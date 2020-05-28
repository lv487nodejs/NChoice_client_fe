import filter from '../../Filter-reducer';

import {filterAddColor, filterRemoveColor,} from '../../../actions';


describe('filter-reducer ADD/REMOVE_COLOR type:', () => {
    let state, addAction, removeAction, fakeAction, color, newState;

    beforeEach(() => {
        color = 'Green'
        addAction = filterAddColor(color);
        removeAction = filterRemoveColor(color);
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
        newState = filter(state, addAction);
    })

    it('should return object', () => {
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

    it('should add to state color new value', () => {
        expect(newState).toStrictEqual({...state, color: [color]});
        expect(newState.color.length).toBe(1);
    })

    it('should remove from state color value', () => {
        state = filter(state, addAction)
        expect(state).toStrictEqual({...state, color: [color]});
        expect(state.color.length).toBe(1);

        newState = filter(state, removeAction);
        expect(newState).toStrictEqual({...state, color: []});
        expect(newState.color.length).toBe(0);
    })

    it('other state fields shouldn‘t to change', () => {
        state = {
            brand: ['Prada'],
            products: ['Jeans'],
            category: ['Women'],
            color: ['Blue'],
            catalogFilter: 'none',
            searchTerm: 'none',
            searchValue: 'none',
        };

        //ADDING
        newState = filter(state, addAction);
        expect(newState).toStrictEqual({...state, color: ['Blue', 'Green']})
        expect(newState.color.length).toBe(2);
        expect(newState.category[0]).toEqual('Women');

        //REMOVING
        newState = filter(state, removeAction);
        expect(newState).toStrictEqual({...state});
        expect(!newState.color.includes(color)).not.toStrictEqual(state.color.includes(color));
        expect(newState.color.length).toBe(1);
    })

})
