import axios from 'axios';
import { BASE_URL } from './links';

export const axiosClient = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    common: { Accept: 'application/json' },
    post: { 'Content-Type': 'application/json' },
  },
  timeout: 15 * 1000, // ms
});
