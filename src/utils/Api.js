import axios from 'axios';

const IS_DEV = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
// const IS_DEV = false

const BASE_URL = IS_DEV
  ? 'http://localhost:5000/'
  : 'https://matrixprecastconcrete.co.ke/api/';

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const refreshToken = localStorage.getItem('refreshToken');

    if (
      error.response &&
      error.response.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axios.post(BASE_URL + 'refresh', {
          refresh_token: refreshToken,
        });

        const newAccessToken = refreshResponse.data.access_token;
        setToken(newAccessToken);
        localStorage.setItem('token', newAccessToken);

        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

        return api(originalRequest);
      } catch (refreshError) {
        console.error(
          'Error refreshing token:',
          refreshError.response
            ? refreshError.response.data
            : refreshError.message
        );
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
      }
    }

    return Promise.reject(error);
  }
);

export default {
  api,
  BASE_URL,
  END_POINTS: {
    LOGIN: '/login',
    REGISTER: '/register',
    CREATEBEAMBLOCK: `/create/beamblock`,
    BEAMBLOCKS: '/beamblocks',
    SINGLEBEAMBLOCK: (id) => `/beamblock/${id}`,
    UPDATEBEAMBLOCK: (id) => `/update/beamblock/${id}`,
    CREATEHOLLOWBLOCK: `/create/hollowblock`,
    HOLLOWBLOCKS: `/hollowblocks`,
    SINGLEHOLLOWBLOCK: (id) => `/hollowblock/${id}`,
    UPDATEHOLLOWBLOCK: (id) => `/update/hollowblock/${id}`,
  },
};
