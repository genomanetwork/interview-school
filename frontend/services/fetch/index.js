import axios from 'axios';
import {API_ENTRY_POINT, FETCH_TIMEOUT} from './settings';

export default class Fetch {
  constructor(token){
    axios.defaults.headers = {
      'Accept'                    : 'application/json',
      'Content-Type'              : 'application/json',
      'X-Content-Type-Options'    : 'nosniff',
      'X-Auth-Token'              : token
    };
    axios.defaults.withCredentials = process.env.NODE_ENV === 'production';
    axios.defaults.timeout = FETCH_TIMEOUT;
  }

  get(uri){
    return axios.get(`${API_ENTRY_POINT}${uri}`);
  }

  post(uri, data={}){
    return axios.post(`${API_ENTRY_POINT}${uri}`, data);
  }
}
