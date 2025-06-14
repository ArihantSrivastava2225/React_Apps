import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import HomePage from './pages/HomePage'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)
  const router = createBrowserRouter([
    {
      path: '/',
      element: <><Navbar /><HomePage /></>,
    },
    {
      path: '/signin',
      element: <><Navbar/><SignIn/></>,
    },
    {
      path: '/signup',
      element: <><Navbar/><SignUp/></>,
    },
    {
      path: '/dashboard',
      element: <><Dashboard /></>,
    }
  ])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
