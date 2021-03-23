import {combineReducers} from 'redux';
import usernameReducer from './usernameReducer';
import ajaxStatusReducer from './ajaxStatusReducer';
import employeeReducer from './employeeReducer';
import matterReducer from './matterReducer';
import clientReducer from './clientReducer';
import officeReducer from './officeReducer';
import deptReducer from './deptReducer';
import retainerReducer from './retainerReducer';
import trustReducer from './trustReducer';
import billReducer from './billReducer';
import splitBillDetailReducer from './splitBillDetailReducer';

export default combineReducers({
    username: usernameReducer,
    employee: employeeReducer,
    matter: matterReducer,
    client: clientReducer,
    offices: officeReducer,
    retainer: retainerReducer,
    trust: trustReducer,
    bills: billReducer,
    splitBillDetails: splitBillDetailReducer,
    depts: deptReducer,
    ajaxCallsInProgress: ajaxStatusReducer
});