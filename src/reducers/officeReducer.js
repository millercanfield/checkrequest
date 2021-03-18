import { FETCH_OFFICES_SUCCESS } from '../actions/types';

const officeReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_OFFICES_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default officeReducer;