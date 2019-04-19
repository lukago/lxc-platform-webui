import axios from 'axios';
import { links } from './appData';

export const axiosClient = axios.create({
  baseURL: links.BASE_URL,
  responseType: 'json',
  headers: {
    common: { Accept: 'application/json' },
    post: { 'Content-Type': 'application/json' },
  },
  timeout: 15 * 1000, // ms
});
