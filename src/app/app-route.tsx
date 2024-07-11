import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LoginPage from './domain/login/LoginPage';
import DashboardPage from './domain/admin-dashboard/DashboardPage';
import HouseholdPage from './domain/admin-household/HouseholdPage';
import AccountPage from './domain/admin-account/AccountPage';
import AttendancePage from './domain/admin-Qr code attendance/AttendancePage';
import SettingsPage from './domain/admin-system settings/SettingsPage';
import LogoutPage from './domain/admin-logout/LogoutPage';
import PrintCertificatesPage from './domain/admin-printcertificates/PrintcertificatesPage';
import DashboardLayout from './domain/layout/DashboardLayout';
import AddInhabitant from './domain/admin-household/AddInhabitant';
import Complete from './domain/admin-household/completeProfile';
import Incomplete from './domain/admin-household/incompleteProfile';
import AddNewUser from './domain/admin-account/AddNewUser';
import Health from './domain/admin-household/health';
import Others from './domain/admin-household/others';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginPage />,
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'Add Inhabitant',
        element: <AddInhabitant />,
      },
      {
        path: 'health',
        element: <Health />,
      },
      {
        path: 'others',
        element: <Others />,
      },
      {
        path: 'household',
        element: <HouseholdPage />,
      },
      {
        path: 'complete-page',
        element: <Complete />,
      },
      {
        path: 'incomplete-page',
        element: <Incomplete />,
      },
      {
        path: 'account',
        element: <AccountPage />,
      },
      {
        path: 'add-new-user',
        element: <AddNewUser />,
      },
      {
        path: 'print-certificates',
        element: <PrintCertificatesPage />,
      },
      {
        path: 'attendance',
        element: <AttendancePage />,
      },
      {
        path: 'settings',
        element: <SettingsPage />,
      },
      {
        path: 'logout',
        element: <LogoutPage />,
      },
    ],
  },
    {
      path: "/login",
      element: <LoginPage/>
    }
]);

const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default AppRoutes;