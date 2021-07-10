import axios from './base';

const getAll = () => axios.get('/subjects');
const create = data => axios.post('/subjects', data);
const update = data => axios.patch('/subjects', data);
const count = () => axios.get('/subjects/count');

export default {
  getAll,
  create,
  update,
  count,
};
