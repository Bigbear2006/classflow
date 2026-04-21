import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx';
import AdminDashboardPage from './pages/admin/AdminDashboardPage.tsx';
import OrganizationMembersPage from './pages/admin/OrganizationMembersPage.tsx';
import AdminCoursesPage from './pages/admin/AdminCoursesPage.tsx';
import AddressesPage from './pages/admin/AddressesPage.tsx';
import GroupsPage from './pages/admin/GroupsPage.tsx';
import AdminSchedulePage from './pages/admin/AdminSchedulePage.tsx';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage.tsx';
import { SubjectsPage } from './pages/admin/SubjectsPage.tsx';

export const router = createBrowserRouter([
  {
    path: '/login',
    Component: LoginPage,
  },
  {
    path: '/register',
    Component: RegisterPage,
  },
  {
    path: '/',
    Component: AppLayout,
    children: [
      { index: true, Component: AdminDashboardPage },
      { path: 'members', Component: OrganizationMembersPage },
      { path: 'subjects', Component: SubjectsPage },
      { path: 'courses', Component: AdminCoursesPage },
      { path: 'addresses', Component: AddressesPage },
      { path: 'groups', Component: GroupsPage },
      { path: 'schedule', Component: AdminSchedulePage },
      { path: 'payments', Component: AdminPaymentsPage },
    ],
  },
  {
    path: '/profile',
    Component: AppLayout,
    children: [{ index: true, Component: ProfilePage }],
  },
  {
    path: '/notifications',
    Component: AppLayout,
    children: [{ index: true, Component: NotificationsPage }],
  },
]);
