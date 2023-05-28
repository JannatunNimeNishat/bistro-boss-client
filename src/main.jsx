import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'

import router from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router-dom'
//helmet
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './providers/AuthProvider'

//tanStack query
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'


// Create a client
const queryClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <HelmetProvider>

        <QueryClientProvider client={queryClient}>
          <div className='max-w-screen-xl mx-auto'>
            <RouterProvider router={router}></RouterProvider>
          </div>

        </QueryClientProvider>
      </HelmetProvider>
    </AuthProvider>


    {/* <AuthProvider>
      <HelmetProvider>
        <div className='max-w-screen-xl mx-auto'>
          <RouterProvider router={router}></RouterProvider>
        </div>
      </HelmetProvider>
    </AuthProvider> */}
  </React.StrictMode>,
)
