import filter from '../../Filter-reducer';

import { filterAddBrand, filterRemoveBrand } from '../../../actions';


describe('filter-reducer ADD/REMOVE_BRAND type:', () => {
    let state, addAction, removeAction, fakeAction, brand, newState;

    beforeEach(() => {
        brand = 'Gucci'
        addAction = filterAddBrand(brand);
        removeAction = filterRemoveBrand(brand);
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

    it('should add to state brand new value', () => {
        expect(newState).toStrictEqual({...state, brand: [brand]});
        expect(newState.brand.length).toBe(1);
    })

    it('should remove from state brand value', () => {
        state = filter(state, addAction)
        expect(state).toStrictEqual({...state, brand: [brand]});
        expect(state.brand.length).toBe(1);

        newState = filter(state, removeAction);
        expect(newState).toStrictEqual({...state, brand: []});
        expect(newState.brand.length).toBe(0);
    })

    it('other state fields shouldn‘t to change', () => {
        state = {
            brand: ['Prada'],
            products: ['Jeans'],
            category: ['Men'],
            color: ['Red'],
            catalogFilter: 'none',
            searchTerm: 'none',
            searchValue: 'none',
        };

        //ADDING
        newState = filter(state, addAction);
        expect(newState).toStrictEqual({...state, brand: ['Prada', 'Gucci']})
        expect(newState.brand.length).toBe(2);
        expect(newState.products[0]).toEqual('Jeans');
        expect(newState.products.length).toEqual(1);

        //REMOVING
        newState = filter(state, removeAction);
        expect(newState).toStrictEqual({...state});
        expect(!newState.color.includes(brand)).not.toStrictEqual(state.color.includes(brand));
        expect(newState.brand.length).toBe(1);
    })
})
