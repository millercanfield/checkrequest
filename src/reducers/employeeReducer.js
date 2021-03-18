import { FETCH_EMPLOYEE_SUCCESS } from '../actions/types';

const employeeReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_EMPLOYEE_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default employeeReducer;