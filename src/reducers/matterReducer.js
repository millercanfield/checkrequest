import { FETCH_MATTER_SUCCESS } from '../actions/types';

const matterReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_MATTER_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default matterReducer;