import axios from './base';

const me = () => axios.get('/users/me');
const getAll = () => axios.get('/users');
const getProfessors = () => axios.get('/users/professors');
const create = data => axios.post('/users', data);
const update = data => axios.patch('/users', data);
const count = () => axios.get('/users/count');
const getStudentTopics = () => axios.get('/users/student');

export default {
  me,
  getAll,
  create,
  update,
  getProfessors,
  count,
  getStudentTopics,
};
