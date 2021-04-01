import { FETCH_CLIENT_AR_SUMMARY_SUCCESS } from '../actions/types';

const clientArSummaryReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_CLIENT_AR_SUMMARY_SUCCESS:
            return action.payload
        default:
            return state;
    }
}

export default clientArSummaryReducer;