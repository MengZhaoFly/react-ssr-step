import axios from 'axios';

const createInstance = axios.create({
	baseURL: 'http://neteasecloudmusicapi.zhaoboy.com',
});

export default createInstance;