import axios from './base';

const apply = data => axios.post('/applications/apply', data);
const getApplication = () => axios.get('/applications/get-application');
const applyDefense = () => axios.post('/applications/apply-defense');

export default {
  apply,
  getApplication,
  applyDefense,
};
