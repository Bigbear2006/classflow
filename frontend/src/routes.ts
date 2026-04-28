import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import OrganizationMembersPage from './pages/admin/OrganizationMembersPage.tsx';
import CoursesPage from './pages/CoursesPage.tsx';
import AddressesPage from './pages/admin/AddressesPage.tsx';
import GroupsPage from './pages/admin/GroupsPage.tsx';
import AdminSchedulePage from './pages/admin/AdminSchedulePage.tsx';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage.tsx';
import { SubjectsPage } from './pages/admin/SubjectsPage.tsx';
import { OrganizationsPage } from './pages/OrganizationsPage.tsx';

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
      { index: true, Component: DashboardPage },
      { path: 'members', Component: OrganizationMembersPage },
      { path: 'subjects', Component: SubjectsPage },
      { path: 'courses', Component: CoursesPage },
      { path: 'addresses', Component: AddressesPage },
      { path: 'groups', Component: GroupsPage },
      { path: 'schedule', Component: AdminSchedulePage },
      { path: 'payments', Component: AdminPaymentsPage },
    ],
  },
  {
    path: '/organizations',
    Component: AppLayout,
    children: [{ index: true, Component: OrganizationsPage }],
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
