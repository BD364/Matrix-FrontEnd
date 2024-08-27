import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post('/refresh-token', { token: refreshToken });

        localStorage.setItem('token', response.data.access_token);
        originalRequest.headers['Authorization'] = `Bearer ${response.data.access_token}`;

        return axios(originalRequest);
      } catch (err) {
        console.error('Error refreshing token:', err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
