import axios from './base';

const login = ({ email, password }) => axios.post('/auth/login', { email, password });
const logout = () => axios.get('/auth/logout');

export default {
  login,
  logout,
};
