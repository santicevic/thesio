import axios from './base';

const getAll = () => axios.get('/subjects');
const create = data => axios.post('/subjects', data);
const update = data => axios.patch('/subjects', data);

export default {
  getAll,
  create,
  update,
};
