import React from 'react'
import TaskList from './pages/TaskList'
import { Navigate, Outlet, Route, Routes, useNavigate } from 'react-router'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import ErrorPage from './pages/ErrorPage'
import Layout from './Layout'
import { useFirebaseContext } from './context/FirebaseContext'
import Loader from './components/Loader'


function App() {

  const { appUser } = useFirebaseContext();
  return (
    <>
      <Routes>
         <Route path='/' element= { <Layout/>}>
            <Route path='' element= { <Navigate to={appUser ? '/dashboard' : '/login'}/>} /> 
            <Route path='login' element={ appUser ? <Navigate to='/dashboard'/> : <Login />} />
            <Route path='signup' element={ appUser ? <Navigate to='/dashboard'/> : <SignUp />} />
            <Route path='dashboard' element={<ProtectedRoute appUser={appUser}> <Dashboard /> </ProtectedRoute>} />
            <Route path='tasks' element={<ProtectedRoute appUser={appUser}><TaskList /></ProtectedRoute>} />
         </Route>
         
         <Route path='*' element={<ErrorPage />} />
      </Routes>
    </>
  )
}

function ProtectedRoute ({appUser,children}) {

  if(!appUser){
    console.log("Redirecting to login lage due user is not signed in into app");
    return <>
      <Navigate to="/login"/>
    </>
  }
  return <>{children}</>
}

export default App
