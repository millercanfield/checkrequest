import { FETCH_EMPLOYEES_SUCCESS } from '../actions/types';

const employeesReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_EMPLOYEES_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default employeesReducer;