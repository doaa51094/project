import React from 'react'
import { Link, Outlet ,useNavigate} from 'react-router-dom'
import Navbar from '../Navbar/Navbar'

export default function Layout({userData,setUserData}) {
  let navigate=useNavigate();
  function logOut(){

    localStorage.removeItem('userToken');
    setUserData(null);
    navigate('/')
  }
  return (
    <>
    
    <Navbar userData={userData} logOut={logOut}/>
      <Outlet />
    
    
    </>
  )
}
