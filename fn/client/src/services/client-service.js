import axios from 'axios';

import { BASE_ROUTE } from '../configs/login-register-config';


export default class ClientService {
    getResource = async url => {
        try {
            const response = await axios.get(`${BASE_ROUTE}${url}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    postData = async (url, dataToSend) => {
        try {
            const response = await axios.post(`${BASE_ROUTE}${url}`, dataToSend);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    putData = async (url, dataToSend) => {
        try {
            const response = await axios.put(`${BASE_ROUTE}${url}`, dataToSend);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    deleteResource = async url => {
        try {
            const response = await axios.delete(`${BASE_ROUTE}${url}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
}
