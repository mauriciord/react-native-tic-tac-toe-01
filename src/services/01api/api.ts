import axios from 'axios';

import { API_01 } from '../../shared/constants/services';

const api = axios.create({
  baseURL: API_01.API_URL,
  headers: {
    Authorization: `Bearer ${API_01.API_BEARER_TOKEN}`,
  },
});

export default api;
