import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://react-final-task.up.railway.app/',
});

export default axiosInstance;
