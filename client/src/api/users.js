import axios from './base';

const me = () => axios.get('/users/me');
const getAll = () => axios.get('/users');
const create = data => axios.post('/users', data);

export default {
  me,
  getAll,
  create,
};
