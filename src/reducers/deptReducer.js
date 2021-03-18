import { FETCH_DEPTS_SUCCESS } from '../actions/types';

const deptReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_DEPTS_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default deptReducer;