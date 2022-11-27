import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import CarCard from './CarCard';
import axios from 'axios';
import style from './Search.module.css'
import { useNavigate } from 'react-router-dom';
const Search = () => {
    const [searchParams] = useSearchParams();
    const [cars, setCars] = useState();
    const [currentPage, setCurrentPage] = useState(parseInt(0))
    const [postPerPage, setPostPerPage] = useState(4)
    const [first, setfirst] = useState()
    const navigate = useNavigate();
    let p = currentPage+1;

  const test=encodeURI(searchParams.get('find')); 
  console.log(test); 
  const sendRequest = async()=>{
    const res = await axios
    .get(`https://showroomcar104.onrender.com/cars?ten=${test}&pageIndex=${currentPage}&pageSize=${postPerPage}`)
    .catch((err)=>console.log(err))
    const data = await res.data.cars;
    return data;
  }

  const sendRequestcheck = async()=>{
    const res = await axios
    .get(`https://showroomcar104.onrender.com/cars?ten=${test}&pageIndex=${p}&pageSize=${postPerPage}`)
    .catch((err)=>console.log(err))
    const data = await res.data.cars;
    return data;
  }

  useEffect(()=>setCurrentPage(0),[test])
  useEffect(()=>{
    sendRequest()
    .then((data)=>setCars(data))
    sendRequestcheck()
    .then((data)=>setfirst(data))
  },[test,currentPage,postPerPage])

  //let p = currentPage+1;

  const handleClick =  (e)=>{
      if(e.target.name=="back"&&currentPage!==0)
      {
        //navigate(`/search?find=${searchParams.get('find')}&page=${currentPage-1}`)
        setCurrentPage((prev)=>prev-1)
      }
      if(e.target.name=="next")
      {
        
        //navigate(`/search?find=${searchParams.get('find')}&page=${currentPage+1}`)
        setCurrentPage((prev)=>prev+1)
        console.log(first);
      }

  }
  //()=>{currentPage!==0? setCurrentPage((prev)=>prev-1):""}
  return (
    <div style={{textAlign:"center"}}>
    {cars && cars.length!==0?<h1 style={{marginTop:'40px', fontSize:'40px'}}>Search result for "{searchParams.get('find')}"</h1>
    :<h1 style={{marginTop:'40px', fontSize:'40px'}}>No result for "{searchParams.get('find')}"</h1>}
    <div className={style.MainSearch} style={{display:"flex",padding:"20px",flexWrap:"wrap"}}>
        {cars && cars.map((car,index)=>
        <CarCard data={car}/>)}
    </div>
        {cars&& cars.length!==0?
        <div className={style.pagination}>
        <button onClick={handleClick} name="back">Back</button>
        <h2 style={{fontSize:"24px"}}>{p}</h2>
        <button onClick={handleClick} disabled={first && (first.length!==0? false :true)} name="next">Next</button>
        </div> : <></>
        }
    </div>
  )
}
export default Search