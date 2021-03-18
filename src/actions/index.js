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