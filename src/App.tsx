
import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import Root from './pages/Root';
import BrandSystem from './pages/BrandSystem';
import JoinBetaPage from './pages/JoinBeta';
import BadgeDemo from './pages/BadgeDemo';

// Lazy-loaded pages for better performance
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const BadgeCustomization = lazy(() => import('./pages/dashboard/BadgeCustomization'));
const DashboardQA = lazy(() => import('./pages/dashboard/DashboardQA'));
const ShareCertification = lazy(() => import('./pages/dashboard/ShareCertification'));
const Assessments = lazy(() => import('./pages/Assessments'));
const Community = lazy(() => import('./pages/Community'));
const Resources = lazy(() => import('./pages/Resources'));
const Settings = lazy(() => import('./pages/Settings'));
const Auth = lazy(() => import('./pages/Auth'));
const PulseBot = lazy(() => import('./pages/PulseBot'));
const MailchimpEvents = lazy(() => import('./pages/dashboard/MailchimpEvents'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Suspense fallback={<Loading />}><Home /></Suspense>,
      },
      {
        path: "dashboard",
        element: <Suspense fallback={<Loading />}><Dashboard /></Suspense>,
      },
      {
        path: "dashboard/share-certification",
        element: <Suspense fallback={<Loading />}><ShareCertification /></Suspense>,
      },
      {
        path: "dashboard/badge-customization",
        element: <Suspense fallback={<Loading />}><BadgeCustomization /></Suspense>,
      },
      {
        path: "dashboard/qa",
        element: <Suspense fallback={<Loading />}><DashboardQA /></Suspense>,
      },
      {
        path: "dashboard/mailchimp-events",
        element: <Suspense fallback={<Loading />}><MailchimpEvents /></Suspense>,
      },
      {
        path: "badge-demo",
        element: <BadgeDemo />,
      },
      {
        path: "assessments",
        element: <Suspense fallback={<Loading />}><Assessments /></Suspense>,
      },
      {
        path: "community",
        element: <Suspense fallback={<Loading />}><Community /></Suspense>,
      },
      {
        path: "resources",
        element: <Suspense fallback={<Loading />}><Resources /></Suspense>,
      },
      {
        path: "settings",
        element: <Suspense fallback={<Loading />}><Settings /></Suspense>,
      },
      {
        path: "auth",
        element: <Suspense fallback={<Loading />}><Auth /></Suspense>,
      },
      {
        path: "pulsebot",
        element: <Suspense fallback={<Loading />}><PulseBot /></Suspense>,
      },
      {
        path: "brand-system",
        element: <BrandSystem />,
      },
      {
        path: "join-beta",
        element: <JoinBetaPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
    </>
  );
}

export default App;
