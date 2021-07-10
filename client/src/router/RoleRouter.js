import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Users from '../screens/Users';
import Subjects from '../screens/Subjects';
import AdminDashboard from '../screens/AdminDashboard';
import SidebarLayout from '../layouts/SidebarLayout';
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
        <h1>Professor dashboard</h1>
      </ProtectedRoute>
      <ProtectedRoute exact path={ROUTES.student.base.href} roles={[ROLES.STUDENT]}>
        <h1>Student dashboard</h1>
      </ProtectedRoute>
    </Switch>
  );
};

export default RoleRouter;
