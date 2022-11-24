import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import CarCard from './CarCard';
import axios from 'axios';
import style from './Search.module.css'
const Search = () => {
    const [searchParams] = useSearchParams();
    const [cars, setCars] = useState();
  const test=encodeURI(searchParams.get('find')); 
  console.log(test); 
  const sendRequest = async()=>{
    const res = await axios
    .get(`https://showroomcar104.onrender.com/cars?ten=${test}`)
    .catch((err)=>console.log(err))
    const data = await res.data;
    return data;
  }
  useEffect(()=>{
    sendRequest().then(data=>setCars(data))
  },[test])




  return (
    <div style={{textAlign:"center"}}>
    {cars && cars.length!==0?<h1 style={{marginTop:'40px', fontSize:'40px'}}>Search result for "{searchParams.get('find')}"</h1>
    :<h1 style={{marginTop:'40px', fontSize:'40px'}}>No result for "{searchParams.get('find')}"</h1>}
    <div className={style.MainSearch} style={{display:"flex",padding:"20px",flexWrap:"wrap"}}>
        {cars && cars.map((car,index)=>
        <CarCard data={car}/>)}
    </div>
    </div>
  )
}

export default Search