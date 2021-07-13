import React from 'react';
import { useQuery } from 'react-query';
import applicationsApi from '../../api/applications';
import SubjectPicker from '../SubjectPicker';
import ApplicationDetails from '../ApplicationDetails';

const StudentDashboard = () => {
  const { data, isLoading } = useQuery('application', applicationsApi.getApplication);

  if (isLoading) return null;

  return data ? <ApplicationDetails /> : <SubjectPicker />;
};

export default StudentDashboard;
