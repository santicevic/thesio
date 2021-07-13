import axios from './base';

const apply = data => axios.post('/applications/apply', data);
const getApplication = () => axios.get('/applications/get-application');
const applyDefense = () => axios.post('/applications/apply-defense');
const getMentorApplications = () => axios.get('/applications/mentor-applications');
const mentorAccept = data => axios.post('/applications/mentor-accept', data);

export default {
  apply,
  getApplication,
  applyDefense,
  getMentorApplications,
  mentorAccept,
};
