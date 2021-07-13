import axios from './base';

const apply = data => axios.post('/applications/apply', data);
const getApplication = () => axios.get('/applications/get-application');
const applyDefense = () => axios.post('/applications/apply-defense');
const getMentorApplications = () => axios.get('/applications/mentor');
const mentorAccept = data => axios.post('/applications/mentor-accept', data);
const getAdminApplications = () => axios.get('/applications/admin');
const scheduleDefense = data => axios.post('/applications/schedule', data);

export default {
  apply,
  getApplication,
  applyDefense,
  getMentorApplications,
  mentorAccept,
  getAdminApplications,
  scheduleDefense,
};
