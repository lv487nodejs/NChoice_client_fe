import axios from 'axios';

import { config } from '../config';

const { serverUrl } = config.app;

export default class AdminService {
    getResource = async url => {
        try {
            const response = await axios.get(`${serverUrl}${url}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    postData = async (url, dataToSend) => {
        try {
            const response = await axios.post(`${serverUrl}${url}`, dataToSend);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    putData = async (url, dataToSend) => {
        try {
            const response = await axios.put(`${serverUrl}${url}`, dataToSend);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };

    deleteResource = async url => {
        try {
            const response = await axios.delete(`${serverUrl}${url}`);
            return response.data;
        } catch (error) {
            console.error(error);
        }
    };
}
