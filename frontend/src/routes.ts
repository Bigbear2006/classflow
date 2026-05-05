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
import SchedulePage from './pages/SchedulePage.tsx';
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage.tsx';
import { SubjectsPage } from './pages/admin/SubjectsPage.tsx';
import { OrganizationsPage } from './pages/OrganizationsPage.tsx';
import LandingPage from './pages/LandingPage.tsx';
import DashboardPage from './pages/DashboardPage.tsx';
import { ErrorBoundary } from './components/common/ErrorBoundary.tsx';
import { createLoader, organizationMembersLoader } from './loaders.ts';

export const router = createBrowserRouter([
  {
    index: true,
    Component: LandingPage,
    loader: createLoader(),
    shouldRevalidate: () => false,
    ErrorBoundary: ErrorBoundary,
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
    id: 'root',
    path: '/',
    Component: AppLayout,
    loader: createLoader({ user: true, organization: true, member: true }),
    shouldRevalidate: () => false,
    children: [
      { path: 'dashboard', Component: DashboardPage },
      { path: 'members', Component: OrganizationMembersPage, loader: organizationMembersLoader },
      { path: 'subjects', Component: SubjectsPage },
      { path: 'addresses', Component: AddressesPage },
      { path: 'groups', Component: GroupsPage },
      { path: 'schedule', Component: SchedulePage },
      { path: 'payments', Component: AdminPaymentsPage },
    ],
  },
  {
    id: 'organization',
    path: '/',
    Component: AppLayout,
    loader: createLoader({ organization: true }),
    shouldRevalidate: () => false,
    children: [{ path: 'courses', Component: CoursesPage }],
  },
  {
    path: '/',
    id: 'user',
    Component: AppLayout,
    loader: createLoader({ user: true }),
    shouldRevalidate: () => false,
    children: [
      { path: 'orgs', Component: OrganizationsPage },
      { path: 'profile', Component: ProfilePage },
      { path: 'notifications', Component: NotificationsPage },
    ],
  },
]);
