import { FETCH_TRUST_SUCCESS } from '../actions/types';

const trustReducer = (state = '', action) => {
    switch(action.type){
        case FETCH_TRUST_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default trustReducer;