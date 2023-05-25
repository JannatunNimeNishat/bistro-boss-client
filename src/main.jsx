import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import router from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
//helmet
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router}></RouterProvider>
        </div>
      </HelmetProvider>
    </AuthProvider>
  </React.StrictMode>,
)
