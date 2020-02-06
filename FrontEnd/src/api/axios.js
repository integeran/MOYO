import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_SUNGCHAN_ADDR,
});

export default API;
