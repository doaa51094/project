import logo from './logo.svg';
import './App.css';
import { createBrowserRouter ,RouterProvider} from 'react-router-dom';
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import All from './Components/All/All'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import ItemDetails from './Components/ItemDetails/ItemDetails'
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import SortBy from './Components/SortBy/SortBy';
import PlatForms from './Components/PlatForms/PlatForms';
import Cat from './Components/Categories/Cat';
import NotFound from './Components/NotFound/NotFound';




function App() {
 
  useEffect(()=>{
    if(localStorage.getItem('userToken') !== null)
    {
      saveUserData();
    }
  },[])
  const [userData, setUserData]=useState(null);
  function saveUserData(){
  let encodedToken=localStorage.getItem('userToken');
  let decodedToken=jwtDecode(encodedToken);
  console.log(decodedToken);
  setUserData(decodedToken);
   }

  let routers=createBrowserRouter([
    {path:'/' ,element:<Layout userData={userData} setUserData={setUserData}/> ,children:[  
      {path:'home' , element:<ProtectedRoute setUserData={setUserData}><Home/></ProtectedRoute>},
      {path:'all' , element:<ProtectedRoute setUserData={setUserData}><All/></ProtectedRoute>},
      {path:'cat/:category' , element:<ProtectedRoute setUserData={setUserData}><Cat/></ProtectedRoute>},
      {path:'itemDetails/:id' , element:<ProtectedRoute setUserData={setUserData}><ItemDetails/></ProtectedRoute>},
      {path:'sortBy/:sort' , element:<ProtectedRoute setUserData={setUserData}><SortBy/></ProtectedRoute>},
      {path:'platforms/:platform' , element:<ProtectedRoute setUserData={setUserData}><PlatForms/></ProtectedRoute>},
      {path:'register' , element:<Register/>},
      {index:true, element:<Login saveUserData={saveUserData}/>},
      {path:'*' ,element:<NotFound/>}
     

    ]
    }
  
  
  ])
  return ( <RouterProvider router={routers}/> );
}

export default App;
