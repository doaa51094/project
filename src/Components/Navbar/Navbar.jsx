import React from 'react'
import {Link} from 'react-router-dom'
import navimg from '../../images/logo.png'

export default function Navbar({userData,logOut}) {
  let platforms =[
    {platform:'pc',title:'pc'},
    {platform:'browser',title:'browser'},
  ]
  let sortBy=[
    {sort:'alphabetical' ,title:'alphabetical'},
    {sort:'popularity' ,title:'popularity'},
    {sort:'release-date' ,title:'release-date'},
    {sort:'relevance' ,title:'relevance'},
    
  ]
  let Categories=[
    {cat:'racing' ,title:'racing'},
    {cat:'sports' ,title:'sports'},
    {cat:'social' ,title:'social'},
    {cat:'shooter' ,title:'shooter'},
    {cat:'open-world' ,title:'open-world'},
    {cat:'zombie' ,title:'zombie'},
    {cat:'fantasy' ,title:'fantasy'},
    {cat:'action-rpg' ,title:'action-rpg'},
    {cat:'action' ,title:'action'},
    {cat:'fighting' ,title:'fighting'},
    {cat:'battle-royale' ,title:'battle-royale'}

  ]
  return (
    <>
    <nav className="navbar navbar-expand-lg shadow navbar-dark">
  <div className="container">
    <Link className="navbar-brand pe-5" to=""><img src={navimg}/> Game Over</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <div>
        { <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="All">All</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Plateforms
          </Link>
          <ul className="dropdown-menu">
            {platforms.map((platform,index)=> <li key={index}><Link className="dropdown-item" to={`platforms/`+platform.platform}>{platform.title}</Link></li>)}
          </ul>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Sort-by
          </Link>
          <ul className="dropdown-menu">
           {sortBy.map((sort,index)=>  <li key={index}><Link className="dropdown-item" to={`sortBy/`+sort.sort}>{sort.title}</Link></li>)}
          </ul>
        </li>

        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Categories
          </Link>
          <ul className="dropdown-menu">
        {Categories.map((cat,index)=> <li key={index}><Link className="dropdown-item" to={`cat/`+cat.cat}>{cat.title}</Link></li>)}
          </ul>
        </li>
       
      </ul>}
     
      </div>
      <div className='d-flex ms-auto '>
        <ul className="navbar-nav w-100  text-center">
          {userData?<> <li className="nav-item nav-link toggleLink rounded cursolPointer" onClick={logOut}>Log Out</li></> :<><li className="nav-item">
          <Link className="nav-link  m-auto " to="">Login</Link>
        </li>
        <li className="nav-item  w-100">
          <Link className="nav-link toggleLink rounded px-2" to="register">Join Free</Link>
        </li></>}
        
       
        
        </ul>
      </div>
      
    </div>
  </div>
</nav>
    
    
    </>

  )
}
