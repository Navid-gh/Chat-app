import { useState, memo, useEffect, useContext , useCallback } from 'react'
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './Contex/AuthContex';
import ProtectedRoute from './models/ProtectedRoute';

function App(): JSX.Element {
  const currentUser  = useContext(AuthContext);

  //console.log(currentUser);

  const ProtectedRoute = useCallback(({ children }: ProtectedRoute): JSX.Element => {
    //console.log('p')
    if (!currentUser) return <Navigate to='login' />;
    else return children;
  },[currentUser])

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/'>
            <Route index element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default memo(App)
