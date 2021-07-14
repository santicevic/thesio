import axios from './base';

const apply = data => axios.post('/applications/apply', data);
const getApplication = () => axios.get('/applications/get-application');
const applyDefense = () => axios.patch('/applications/apply-defense');
const getMentorApplications = () => axios.get('/applications/mentor');
const mentorAccept = data => axios.patch('/applications/mentor-accept', data);
const getPendingDefenses = () => axios.get('/applications/pending-defenses');
const scheduleDefense = data => axios.patch('/applications/schedule', data);
const getPendingGrade = () => axios.get('/applications/pending-grade');
const setGrade = data => axios.patch('/applications/set-grade', data);

export default {
  apply,
  getApplication,
  applyDefense,
  getMentorApplications,
  mentorAccept,
  getPendingDefenses,
  scheduleDefense,
  getPendingGrade,
  setGrade,
};
