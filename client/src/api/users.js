import axios from './base';

const me = () => axios.get('/users/me');

export default {
  me,
};
