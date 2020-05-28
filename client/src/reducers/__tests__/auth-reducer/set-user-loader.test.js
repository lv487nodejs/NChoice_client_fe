import authReducer from '../../Auth-reducer';
import { setUserLoading} from '../../../actions';

describe('auth-reducer SET_USER type:', () => {
    let state, action, fakeAction;

    beforeEach(() => {
        action = setUserLoading(true);
        fakeAction = {type: 'FAKE_TYPE'};
        state = {
            userLogged: false,
            userLoading: false,
            user:{
                firstName: '',
                lastName: '',
                email: '',
                password:'',
            }
        };
    })

    it('should return object', () => {
        expect(typeof state).toStrictEqual('object');
    })

    it('should to be truthy', () => {
        const newState = authReducer(state, action);
        expect(newState).toBeTruthy();
    })

    it('shouldn‘t to be falsy and equal initial state', () => {
        const newState = authReducer(undefined, fakeAction);
        expect(newState).not.toBeFalsy();
        expect(newState).toStrictEqual(state);
    })

    it('should to be equal empty object', () => {
        const newState = authReducer(null, fakeAction);
        expect(newState).toStrictEqual({});
    })

    it('should return default state without changes', () => {
        const newState = authReducer(state, fakeAction);
        expect(newState).toStrictEqual(state);
    })

    it('should to change userLoading value to true despite the argument', () => {
        action = setUserLoading("softserve");
        const newState = authReducer(state, action);
        expect(newState).toStrictEqual({...state, userLoading: true});
        expect(newState.userLoading).not.toBe( "softserve");
    })

    it('other state fields shouldn‘t to change and userLoading becomes true', () => {
        state = {
            userLogged: false,
            userLoading: 'test',
            user:{
                firstName: 'David',
                lastName: 'Bowie',
                email: 'd_bowie@gmail.com',
                password:'1234',
            }
        };

        const newState = authReducer(state, action);
        const result = {
            ...state,
            userLoading: true
        };


        expect(newState).toStrictEqual(result)
        expect(newState.userLoading).toBe(result.userLoading)
        expect(newState.userLogged).toBe(false)
        expect(typeof newState.user).toStrictEqual('object');
        expect(newState.user).toStrictEqual(state.user);

    })
})
