import { FETCH_RETAINER_SUCCESS } from '../actions/types';

const retainerReducer = (state = '', action) => {
    switch(action.type){
        case FETCH_RETAINER_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default retainerReducer;