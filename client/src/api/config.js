import axios from './base';

const getConfig = key => axios.get(`/configs/${key}`);

export default {
  getConfig,
};
