import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import { AuthProvider } from './hoc/PrivateRoute';
import { PrivateRoute } from './hoc/PrivateRoute.jsx';
import LoginPage from './pages/Login/LoginPage.jsx';
import CreateReportPage from './pages/CreateReportPage/CreateReportPage.jsx';
import MyReportPage from './pages/MyReportsPage/MyReportPage.jsx';
import MyTemplatePage from './pages/MyTemplatePage/MyTemplatePage.jsx';

const routes = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/createreport',
    element: <PrivateRoute><CreateReportPage/></PrivateRoute>
  },
  {
    path: '/myreports',
    element: <MyReportPage />
  },
  {
    path: '/mytemplates',
    element: <MyTemplatePage />
  }
  
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AuthProvider>
      <RouterProvider router={routes}/>
     </AuthProvider>
  </React.StrictMode>,
)
