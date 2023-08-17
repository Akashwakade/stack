import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Redirect, Route, useNavigate } from 'react-router-dom';
import { Login } from '../pages/Login';

const ProtectedRoute = ({ children }) => {
  const navigate=useNavigate()

  const user = useSelector(store => store.user);
  console.log(user)
  if(!user){
   return navigate("/login")
  }

  return children

 
};

export default ProtectedRoute;
