import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Carousel from 'react-bootstrap/Carousel'
import Loading from '../Loading/Loading';


export default function ItemDetails() {
    let params=useParams();
    // console.log(params.id);
    const  [loading,setLoading]=useState(true);
    const [itemDetails,setItemDetails]=useState([])
    let url='https://free-to-play-games-database.p.rapidapi.com/api/game';
 async function getDetails(){
   let {data}= await axios.get(url,{params: {id:params.id},
   headers: {
    'X-RapidAPI-Key': '523aa4b4cfmsh179cf1aa8840e88p1d19cdjsne54d3dde7858',
    'X-RapidAPI-Host': 'free-to-play-games-database.p.rapidapi.com'
       }})
       setLoading(false);
       console.log(data);
       setItemDetails(data);
 }
 useEffect(()=>{
 
   getDetails();
 },[])
  return (
    <>
    {loading && <Loading/>}
    {!loading && <>
        <div className="container pt-5">
        <div className="row">
            <div className="col-md-4">
            <img src={itemDetails.thumbnail} className='w-100 rounded mb-3' alt="" />
            <div className="row g-4">
                <div className="col-md-3 text-center">
                    <div className='text-muted lead p-2 rounded homeItem cursolPointer'>Free</div>
                </div>
                <div className="col-md-9 text-center">
                   <a href={itemDetails.freetogame_profile_url} target='_blank' className='text-white'>
                   <div className='secondColor lead p-2 rounded'><strong>Play Now </strong><i className="fas fa-sign-out-alt"></i></div>
                   </a>
                </div>
            </div>
            </div>
            <div className="col-md-8">
                <h1>{itemDetails.title}</h1>
                <h5>About {itemDetails.title}</h5>
                <p className='fs-5'>{itemDetails.description}</p>
                <h4>{itemDetails.title}  Screenshots</h4>
<Carousel controls={false} interval={2500} indicators={false}>
    {itemDetails?.screenshots?.map((item,index)=> <Carousel.Item key={index}>
        <img
          className="d-block w-100"
          src={item.image}
          alt=""
        />
      </Carousel.Item>)}
    </Carousel>
                <h2 className='py-2'>Additional Information</h2>
                <hr  className="mt-2 mb-3"></hr>
                <div className="row g-2">
                    <div className="col-md-4 col-6">
                        <span className='text-muted'>Title</span>
                        <p>{itemDetails.title}</p>
                    </div>
                    <div className="col-md-4 col-6">
                        <span className='text-muted'>Developer</span>
                        <p>{itemDetails.developer}</p>
                    </div>
                    <div className="col-md-4 col-6">
                        <span className='text-muted'>Publisher</span>
                        <p>{itemDetails.publisher}</p>
                    </div>
                    <div className="col-md-4 col-6">
                        <span className='text-muted'>Release Date</span>
                        <p>{itemDetails.release_date}</p>
                    </div>
                    <div className="col-md-4 col-6">
                        <span className='text-muted'>Genre</span>
                        <p>{itemDetails.genre}</p>
                    </div>
                    <div className="col-md-4 col-6">
                        <span className='text-muted'>Platform</span>
                        <p><i className="fas fa-window-maximize text-muted"></i> {itemDetails.platform}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </>}

    </>
  )
}
