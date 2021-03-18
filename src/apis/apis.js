import axios from 'axios';

export const username = axios.create({
    baseURL: 'https://accountingapps.mcps.com/usersapi',
    withCredentials: true
});

export const aderant = axios.create({
    baseURL: 'http://localhost:65404'  //http://localhost:65404
});