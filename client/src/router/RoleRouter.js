import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Users from '../screens/Users';
import Subjects from '../screens/Subjects';
import AdminDashboard from '../screens/AdminDashboard';
import ProfessorDashboard from '../screens/ProfessorDashboard';
import StudentDashboard from '../screens/StudentDashboard';
import ProfessorApplications from '../screens/ProfessorApplications';
import SidebarLayout from '../layouts/SidebarLayout';
import AppBarLayout from '../layouts/AppBarLayout';
import { ROLES, ROUTES } from '../constants';

const RoleRouter = () => {
  return (
    <Switch>
      <ProtectedRoute path={ROUTES.admin.base.href} roles={[ROLES.ADMIN]}>
        <SidebarLayout title="Admin" items={Object.values(ROUTES.admin)}>
          <Switch>
            <Route path={ROUTES.admin.users.href}>
              <Users />
            </Route>
            <Route path={ROUTES.admin.subjects.href}>
              <Subjects />
            </Route>
            <Route path={ROUTES.admin.base.href}>
              <AdminDashboard />
            </Route>
          </Switch>
        </SidebarLayout>
      </ProtectedRoute>
      <ProtectedRoute path={ROUTES.professor.base.href} roles={[ROLES.PROFESSOR]}>
        <SidebarLayout title="Nastavnik" items={Object.values(ROUTES.professor)}>
          <Switch>
            <Route path={ROUTES.professor.applications.href}>
              <ProfessorApplications />
            </Route>
            <Route path={ROUTES.professor.base.href}>
              <ProfessorDashboard />
            </Route>
          </Switch>
        </SidebarLayout>
      </ProtectedRoute>
      <ProtectedRoute exact path={ROUTES.student.base.href} roles={[ROLES.STUDENT]}>
        <AppBarLayout title="Student">
          <StudentDashboard />
        </AppBarLayout>
      </ProtectedRoute>
    </Switch>
  );
};

export default RoleRouter;
