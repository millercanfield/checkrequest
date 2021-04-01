import { FETCH_ATTORNEY_SUCCESS } from '../actions/types';

const attorneyReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_ATTORNEY_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default attorneyReducer;