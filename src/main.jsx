import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './components/pages/Home.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import SignUp from './components/pages/SignUp.jsx'
import SignIn from './components/pages/SignIn.jsx'
import Contact from './components/pages/Contact.jsx'
 import Dashboard from './components/pages/Dashboard.jsx'
import Service from './components/pages/Service.jsx'
 import EmployeeList from './components/pages/EmployeeList.jsx'
import UserDetails from './components/pages/UserDetails.jsx'
import Hr from './providers/Hr.jsx'
import Payment from './components/pages/Payment.jsx'
import User from './providers/User.jsx'
 

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path:'/',
        element:<Home />
      },
      {
        path:'/register',
        element:<SignUp />
      },
      {
        path:'/login',
        element:<SignIn />
      },
      {
        path:'/service',
        element:<Service />
      },
      {
        path:'/contact',
        element:<Contact />
      },
      {
        path:'/payment',
        element:<User><Payment /></User>
      },
      {
        path:'/profile',
        // element:<Privet><Profile /></Privet>
        element:<User><UserDetails /></User>
      },
      {
        path:'/dashboard',
        element:<Hr><Dashboard /></Hr>
        ,
        children:[
          {
            path:'/dashboard/employee-list',
            element:<EmployeeList />
          },
          {
            path:'/dashboard/employee-list/:id',
            element:<UserDetails />
          },
        ]
      },
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
