import axios from './base';

const apply = data => axios.post('/applications/apply', data);

export default {
  apply,
};
