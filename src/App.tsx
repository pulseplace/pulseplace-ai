
import React, { Suspense, lazy } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { PulseProvider } from './contexts/PulseContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import NotFound from './pages/NotFound';
import Loading from './components/Loading';
import Root from './pages/Root';
import BrandSystem from './pages/BrandSystem';
import JoinBetaPage from './pages/JoinBeta';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Assessments = lazy(() => import('./pages/Assessments'));
const Community = lazy(() => import('./pages/Community'));
const Resources = lazy(() => import('./pages/Resources'));
const Settings = lazy(() => import('./pages/Settings'));
const Auth = lazy(() => import('./pages/Auth'));
const PulseBot = lazy(() => import('./pages/PulseBot'));

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
    <ThemeProvider>
      <AuthProvider>
        <PulseProvider>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="light" />
        </PulseProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
