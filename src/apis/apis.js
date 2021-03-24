import axios from 'axios';

export const username = axios.create({
    baseURL: 'https://checkrequest.mcps.com/usersapi',
    withCredentials: true
});

export const aderant = axios.create({
    baseURL: 'https://checkrequest.mcps.com/checkrequestapi'  //http://localhost:65404  https://checkrequest.mcps.com/checkrequestapi
});