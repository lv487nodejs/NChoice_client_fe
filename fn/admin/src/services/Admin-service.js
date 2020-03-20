import axios from 'axios';

import { SERVER_URL } from '../config';

export default class AdminService {
    getResource = async url => {
        try {
            const response = await axios.get(`${SERVER_URL}${url}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    postData = async (url, dataToSend) => {
        try {
            const response = await axios.post(`${SERVER_URL}${url}`, dataToSend);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    putData = async (url, dataToSend) => {
        try {
            const response = await axios.put(`${SERVER_URL}${url}`, dataToSend);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    deleteResource = async url => {
        try {
            const response = await axios.delete(`${SERVER_URL}${url}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
}
