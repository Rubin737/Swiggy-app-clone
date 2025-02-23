// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client';
import { appRouter } from './App';
import { RouterProvider } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <div>
    <RouterProvider router={appRouter}/>
  </div>,
)

