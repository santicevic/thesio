import axios from './base';

const me = () => axios.get('/users/me');
const getAll = () => axios.get('/users');
const getProfessors = () => axios.get('/users/professors');
const create = data => axios.post('/users', data);
const update = data => axios.patch('/users', data);

export default {
  me,
  getAll,
  create,
  update,
  getProfessors,
};
