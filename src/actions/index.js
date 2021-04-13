import * as types from './types';
import {username, aderant} from '../apis/apis';

export const fetchUsername = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        username.get('api/username')
            .then(response => {
                dispatch({ type: types.FETCH_USERNAME_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchEmployee = (login) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get('api/aderant/employees/' + login)
            .then(response => {
                dispatch({ type: types.FETCH_EMPLOYEE_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchMatter = (client,matter) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get(`api/aderant/matters/${client}/${matter}`)
            .then(response => {
                dispatch({ type: types.FETCH_MATTER_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchClient = (uno) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get(`api/aderant/clients/${uno}`)
            .then(response => {
                dispatch({ type: types.FETCH_CLIENT_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchOffices = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get('api/aderant/offices')
            .then(response => {
                dispatch({ type: types.FETCH_OFFICES_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchDepts = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get('api/aderant/depts')
            .then(response => {
                dispatch({ type: types.FETCH_DEPTS_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchRetainer = (uno) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get(`api/aderant/retainer/${uno}`)
            .then(response => {
                dispatch({ type: types.FETCH_RETAINER_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchTrust = (uno) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get(`api/aderant/trust/${uno}`)
            .then(response => {
                dispatch({ type: types.FETCH_TRUST_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchBills = (code, matterCode) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get(`api/aderant/billsummary/${code}/${matterCode}`)
            .then(response => {
                dispatch({ type: types.FETCH_BILLS_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const submitCheckRequest = (params) => dispatch => {

    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.post('api/request', params)
            .then(response => {
                dispatch({ type: types.SUBMIT_CHECKREQUEST_SUCCESS });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchSplit = (matterUno) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get(`api/aderant/splitbilldetail/${matterUno}`)
            .then(response => {
                dispatch({ type: types.FETCH_SPLIT_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchCheckRequest = (id) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get(`api/request/${id}`)
            .then(response => {
                dispatch({ type: types.FETCH_CHECKREQUEST_SUCCESS});
                resolve(response.data);
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchEmployees = () => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get('api/aderant/employees')
            .then(response => {
                dispatch({ type: types.FETCH_EMPLOYEES_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchAttorney = (uno) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get('api/aderant/attorney/' + uno)
            .then(response => {
                dispatch({ type: types.FETCH_ATTORNEY_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const fetchClientArSummary = (clientCode) => dispatch => {
    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.get(`api/aderant/clientarsummary/${clientCode}`)
            .then(response => {
                dispatch({ type: types.FETCH_CLIENT_AR_SUMMARY_SUCCESS, payload: response.data });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const submitARResponse = (params) => dispatch => {

    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.post('api/request/arresponse', params)
            .then(response => {
                dispatch({ type: types.SUBMIT_ARRESPONSE_SUCCESS });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const submitLeaderResponse = (params) => dispatch => {

    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.post('api/request/leaderresponse', params)
            .then(response => {
                dispatch({ type: types.SUBMIT_LEADERRESPONSE_SUCCESS });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const submitCfoResponse = (params) => dispatch => {

    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.post('api/request/cforesponse', params)
            .then(response => {
                dispatch({ type: types.SUBMIT_CFORESPONSE_SUCCESS });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};

export const submitApResponse = (params) => dispatch => {

    return new Promise((resolve, reject) => {
        dispatch({ type: types.BEGIN_AJAX_CALL });
        aderant.post('api/request/apresponse', params)
            .then(response => {
                dispatch({ type: types.SUBMIT_APRESPONSE_SUCCESS });
                resolve();
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: types.AJAX_CALL_ERROR });
                reject();
            });
    });
};