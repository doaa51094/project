import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import img1 from '../../images/gaming.jpg'
import {Link} from 'react-router-dom'


export default function Register() {
  let nanigate=useNavigate();
  const [errorList,setErrorList]=useState([])
  const [isLoding,setLoding]=useState(false)
  const [error ,setError]=useState('')
  const [user,setUser]=useState({
  first_name:'',
  last_name:'',
  age:0,
  email:'',
  password:''
  });

  function getUserData(e){
    let myUser={...user};
    myUser[e.target.name]=e.target.value;
    setUser(myUser)
    // console.log(myUser);

  }
  
async function sendRegisterDataTOApi(){
  let {data}=await axios.post(`https://route-egypt-api.herokuapp.com/signup` ,user);
  // console.log(data);
  if(data.message=='success'){
    setLoding(true);
    nanigate('/');


  }else{
    setLoding(false);
  setError(data.message);

  }
}
function submitRegisterForm(e){
  setLoding(true)
 e.preventDefault();


let validation= validateRegisterForm();
if(validation.error){
  setLoding(false);
  setErrorList(validation.error.details);

}else{
  sendRegisterDataTOApi();
}
// console.log(validation);
}

function validateRegisterForm(){
 let scheme= Joi.object({
    first_name:Joi.string().min(3).max(10).required(),
    last_name:Joi.string().min(3).max(10).required(),
    age:Joi.number().min(16).max(80).required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).messages({
      'string.pattern.base':'invalid password'
    })
  })
 return scheme.validate(user ,{abortEarly:false});

}
 
  return (
    <>
     
    <div className="container px-3 pb-5 ">
    <div className="row mt-5 loginbg shadow ">
      <div className="col-lg-6 p-0  loginImg d-none d-lg-block">
      <img src={img1} className='w-100 h-100' alt="" />
      </div>
      <div className="col-lg-6">
        <div className="loginItem text-center">
          <h2 className='text-muted pb-2 pt-4'>Create My Account!</h2>
        <form className=' mx-5'  onSubmit={submitRegisterForm}>
        <div className="row">
        {error.length>0 ?<div className="alert  alert-danger my-2">{error}</div>:''}
          <div className="col-md">
          <input onChange={getUserData}  type="text" placeholder='First Name'  className='form-control mt-3' name='first_name'/>
          <p className='text-danger'>{errorList.filter((err)=> err.context.label=='first_name')[0]?.message}</p>
          </div>
          <div className="col-md">
          <input onChange={getUserData}  type="text" placeholder='Last Name'  className='form-control mt-3' name='last_name' />
          <p className='text-danger'>{errorList.filter((err)=> err.context.label=='last_name')[0]?.message}</p>
          </div>
        </div>
        <input onChange={getUserData}  type="email" placeholder='Email'  className='form-control mt-3' name='email' />
        <p className='text-danger'>{errorList.filter((err)=> err.context.label=='email')[0]?.message}</p>
        <input onChange={getUserData}  type="number" placeholder='Age'  className='form-control mt-3' name='age' />
        <p className='text-danger'>{errorList.filter((err)=> err.context.label=='age')[0]?.message}</p>
        <input onChange={getUserData}  type="password" placeholder='Password'  className='form-control mt-3' name='password' />
        <p className='text-danger'>{errorList.filter((err)=> err.context.label=='password')[0]?.message}</p>
        <button type='submit'  className='btn  w-100 p-1 fs-5 my-2'> {isLoding==true? <i className='fas fa-spinner fa-spin'></i> :'Create Acount'}</button>
       
        <div className='brdr'></div>
      </form>
          <p className='text-muted pt-2 '>This site is protected by reCAPTCHA and the Google <a className='text-decoration-underline' href="https://policies.google.com/privacy">Privacy Policy</a> and <a className='text-decoration-underline' href="https://policies.google.com/terms">Terms</a> of Service apply.</p>
          <p  className='text-muted '><span> Already a member?</span><Link to="/">Log In</Link></p>

        </div>
      </div>
    </div>
    </div>
    
    </>
  )
}
