import React from 'react'
import { useSearchParams } from 'react-router-dom';
import { useEffect,useState } from 'react';
import CarCard from './CarCard';
import axios from 'axios';
import style from './Search.module.css'
import Pagination from './Pagination';

const Search = () => {
    const [searchParams] = useSearchParams();
    const [cars, setCars] = useState();
    const [currentPage, setCurrentPage] = useState(parseInt(0))
    const [postPerPage, setPostPerPage] = useState(8)
    const [loading, setLoading] = useState(true)

    let p = currentPage+1;

  const test=encodeURI(searchParams.get('find')); 
  console.log(test); 
  const sendRequest = async(number=currentPage)=>{
    const res = await axios
    .get(`https://showroomcar104.onrender.com/cars?search=${test}&pageIndex=${number}&pageSize=${postPerPage}`)
    .catch((err)=>console.log(err))
    setLoading(false);
    const data = await res.data;
    console.log(data);
    return data;
  }

  /*useEffect(()=>{
    setCurrentPage(0);
    setLoading(true);
  },[test])*/
  /*useEffect(()=>{
    sendRequest()
    .then((data)=>setCars(data))
    console.log(cars);
  },[test,currentPage,postPerPage])*/
  useEffect(()=>{
    sendRequest()
    .then((data)=>setCars(data))
    console.log(cars);
  },[currentPage,postPerPage])
  useEffect(()=>{
    setCurrentPage(0)
    sendRequest(0)
    .then((data)=>setCars(data))
    console.log(cars);
  },[test])



  //let p = currentPage+1;

  const handleClick =  (e)=>{
      if(e.target.name=="back")
      {
        //navigate(`/search?find=${searchParams.get('find')}&page=${currentPage-1}`)
        setCurrentPage((prev)=>prev-1)
      }
      if(e.target.name=="next")
      {
        
        //navigate(`/search?find=${searchParams.get('find')}&page=${currentPage+1}`)
        setCurrentPage((prev)=>prev+1)
      }

  }
  //()=>{currentPage!==0? setCurrentPage((prev)=>prev-1):""}
  return (
    <div className={style.SearchPage}>
    {loading? <h1>loading</h1> : 
    <div style={{textAlign:"center"}}>
    {cars.cars && cars.totalCarsFilter!==0?<h1 style={{marginTop:'40px', fontSize:'40px'}}>Kết quả tìm kiếm cho "{searchParams.get('find')}"</h1>
    :<h1 style={{marginTop:'40px', fontSize:'40px',margin:"150px 0"}}>Không có kết quả cho "{searchParams.get('find')}"</h1>}
    <div className={style.MainSearch} style={{display:"flex",padding:"20px",flexWrap:"wrap"}}>
        {cars.cars && cars.cars.map((car,index)=>
        <CarCard data={car} key={index}/>)}
    </div>
        {cars.cars&& cars.totalCarsFilter!==0?
        <div className={style.pagination}>
        <Pagination
          totalPosts={cars.totalCarsFilter}
          postsPerPage={postPerPage}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
        </div> : <></>
        }
    </div>}
    </div>
  )
}
export default Search
//<h2 style={{fontSize:"24px"}} >{p}/{Math.ceil(cars.totalCarsFilter/postPerPage)}</h2>