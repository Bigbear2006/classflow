import { createBrowserRouter } from 'react-router';
import { AppLayout } from './components/layout/AppLayout';
import LoginPage from './pages/LoginPage.tsx';
import RegisterPage from './pages/RegisterPage.tsx';
import ProfilePage from './pages/ProfilePage.tsx';
import NotificationsPage from './pages/NotificationsPage.tsx';
import OrganizationMembersPage from './pages/admin/OrganizationMembersPage.tsx';
import CoursesPage from './pages/CoursesPage.tsx';
import AddressesPage from './pages/admin/AddressesPage.tsx';
import GroupsPage from './pages/admin/GroupsPage.tsx';
import AdminSchedulePage from './pages/admin/AdminSchedulePage.tsx';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage.tsx';
import { SubjectsPage } from './pages/admin/SubjectsPage.tsx';
import { OrganizationsPage } from './pages/OrganizationsPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';

export const router = createBrowserRouter([
  {
    index: true,
    Component: LandingPage,
  },
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
      // Available only on the subdomains
      { path: 'dashboard', Component: DashboardPage },
      { path: 'members', Component: OrganizationMembersPage },
      { path: 'subjects', Component: SubjectsPage },
      { path: 'courses', Component: CoursesPage },
      { path: 'addresses', Component: AddressesPage },
      { path: 'groups', Component: GroupsPage },
      { path: 'schedule', Component: AdminSchedulePage },
      { path: 'payments', Component: AdminPaymentsPage },
      // Available without subdomain
      { path: 'orgs', Component: OrganizationsPage },
      { path: 'profile', Component: ProfilePage },
      { path: 'notifications', Component: NotificationsPage },
    ],
  },
]);
