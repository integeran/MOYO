import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'http://70.12.246.66:8080';

export default client;
