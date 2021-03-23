import { FETCH_BILLS_SUCCESS } from '../actions/types';

const billReducer = (state = [], action) => {
    switch(action.type){
        case FETCH_BILLS_SUCCESS:
           
            if(action.payload.length > 0){
                let bills = action.payload.map((bill) => {
                    bill.selected = false;
                    return bill;
                });
    
                return bills;
            }
            else {
                return action.payload;
            }
        default:
            return state;
    }
}

export default billReducer;