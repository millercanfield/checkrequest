import { FETCH_SPLIT_SUCCESS } from '../actions/types';

const splitBillDetailReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_SPLIT_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default splitBillDetailReducer;