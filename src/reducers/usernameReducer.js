import {FETCH_USERNAME_SUCCESS} from '../actions/types';

const usernameReducer = (state = '', action) => {
    switch(action.type){
        case FETCH_USERNAME_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default usernameReducer;