import { FETCH_CLIENT_SUCCESS } from '../actions/types';

const clientReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_CLIENT_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default clientReducer;