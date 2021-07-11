import axios from './base';

const create = data => axios.post('/topics', data);
const update = data => axios.patch('/topics', data);

export default {
  create,
  update,
};
