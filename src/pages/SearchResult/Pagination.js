import React from "react";
import style from './Search.module.css'

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];
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


    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }


    return (
        <div>
            <button onClick={handleClick} disabled={((currentPage!=0)? false :true)} name="back">Back</button>
            {pages.map((page, index) => {
                return (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page-1)}
                        className={page-1 == currentPage ? style.active : ""}>
                        {page}
                    </button>
                );
            })}
            <button onClick={handleClick} disabled={((currentPage+1<totalPosts/postsPerPage)? false :true)} name="next">Next</button>
        </div>
    );
};

export default Pagination;
