import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading';


export default function Home() {
  const  [loading,setLoading]=useState(true);
  const [homeData,setHomeData]=useState([])
   let url='https://free-to-play-games-database.p.rapidapi.com/api/games';
async function getData(){
  let {data}= await axios.get(url,{params: {'sort-by': 'popularity'},
  headers: {
        'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
        'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
      }})
      // console.log(data);
      setHomeData(data);
      setLoading(false);
      
}
useEffect(()=>{

  getData();
},[])


  return (
    <>
    {loading && <Loading/>}
    {!loading&&<>
      <section id='home'>
      <div className="home text-center p-5">
        <h1>Find &amp; track the best <span>free-to-play</span> games!</h1>
        <p className='lead text-muted'>Track what you've played and search for what to play next! Plus get free premium loot!</p>
        <button className='btn btn-outline-secondary mb-4'><Link to='/All'>Browse Games</Link></button>
      </div>
    </section>
    <section>
      <div className="container mt-5">
        <h3 className='text-muted mb-3'><i className="fas fa-robot"></i>Personalized Recommendations</h3>
        <div className="row g-4">
          {homeData.splice(0,3).map((homeitem,index)=> <div className="col-md-4" key={index}>
          <Link to={'/itemDetails/'+homeitem.id}>
            <div className="homeItem  pb-3 shadow mb-5 cursolPointer scaleItem">
              
           <img src={homeitem.thumbnail} className='w-100 mb-3' alt="" />
             <div className='position-relative px-2'>
             <h4 className='px-2'>{homeitem.title}</h4>
              <span className="badge text-bg-primary px-3 mx-3 py-2 position-absolute end-0 bottom-0">Free</span>
             </div>
            </div>
            </Link>
          </div> )}
         
        </div>
      </div>
    </section>
    
    </>}

    </>
  )
}
