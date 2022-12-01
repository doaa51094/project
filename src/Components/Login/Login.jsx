import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import img1 from '../../images/gaming.jpg'
import {Link} from 'react-router-dom'
import img2 from '../../images/logo.png'


export default function Login({saveUserData}) {
  let nanigate=useNavigate();
  const [errorList,setErrorList]=useState([])
  const [isLoding,setLoding]=useState(false)
  const [error ,setError]=useState('')
  const [user,setUser]=useState({
  email:'',
  password:''
  });

  function getUserData(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
    // console.log(myUser);

  }
  
async function sendLoginDataTOApi(){
  let {data}=await axios.post('https://route-egypt-api.herokuapp.com/signin',user);
  
  // console.log(data);
  if(data.message=='success'){
    setLoding(false);
    localStorage.setItem('userToken' ,data.token);
    saveUserData();
    nanigate('/home');


  }else{
    setLoding(false);
  setError(data.message);

  }
}
function submitLoginForm(e){
  setLoding(true)
 e.preventDefault();


let validation= validateLoginForm();
if(validation.error){
  setLoding(false);
  setErrorList(validation.error.details);

}else{
  sendLoginDataTOApi();
}
// console.log(validation);
}

function validateLoginForm(){
 let scheme= Joi.object({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
      'string.pattern.base':'invalid password'
    })
  })
 return scheme.validate(user ,{abortEarly:false});

}
 
  return (
    <>
     
    <div className="container px-3 pb-5">
    <div className="row mt-5 loginbg">
      <div className="col-lg-6 p-0 loginImg d-lg-block d-none">
      <img src={img1} className='w-100 h-100' alt="" />
      </div>
      <div className="col-lg-6 ">
        <div className="loginItem text-center">
          <img src={img2} className='mt-5' alt="" />
          <h2 className='text-muted pb-2'>Log in to GameOver</h2>
          <form className=' mx-5' onSubmit={submitLoginForm}>
          {error.length>0 ?<div className="alert  alert-danger">{error}</div>:''}
            <input onChange={getUserData} type="email" placeholder='Email'  className='form-control mb-3 p-2'name='email'/>
            <p className='text-danger'>{errorList.filter((err)=> err.context.label=='email')[0]?.message}</p>
            <input onChange={getUserData} type="password" placeholder='Password'  className='form-control mb-3 p-2' name='password'/>
            <p className='text-danger'>{errorList.filter((err)=> err.context.label=='password')[0]?.message}</p>
            <button className='btn  w-100 p-1 fs-5 mb-3'> {isLoding==true? <i className='fas fa-spinner fa-spin'></i> :'Login'}</button>
            <div className='brdr'></div>
          </form>
          <div className='pt-1'><a href="" >Forgot Password?</a></div>
          <div  className='pb-2 text-muted'><span> Not a member yet ? </span><Link to="register">Create Account</Link></div>

        </div>
      </div>
    </div>
    </div>
    
    
    
    
    </>
  )
}
