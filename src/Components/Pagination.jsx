import React, { useEffect, useState } from 'react';
import './Pagination.css';

function Pagination({totalRows, rowsPerPage,currentPage, setCurrentPage}) {
    let pages = [];
    const [isFirstPage,setIsFirstPage]=useState(true);
    const [isLastPage,setIsLastPage]=useState(false);
    let totalPages = Math.ceil(totalRows/rowsPerPage);
    for(let i=1;i<=totalPages;i++){
        pages.push(i);
    }

    const handlePrevious = ()=>{
        //.log("Previous");
        if(currentPage > 1){
            setCurrentPage(currentPage-1);
            //setIsFirstPage(false);
        }
                
    }

    const handleNext = ()=>{
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1);
        }
        
    }

    useEffect(()=>{
        setIsFirstPage(currentPage === 1);
        setIsLastPage(currentPage === totalPages);
    },[currentPage]);

    
  return (
    <div className='Pagination'>
        {/* {pages.map((page,index)=>{
            return (
                <button key={index} onClick={()=>setCurrentPage(page)}>{page}</button>
            )
        })} */}
        <button className='button' onClick={handlePrevious} >Previous</button>
        <button className='page'>{currentPage}</button>
        <button className='button' onClick={handleNext} >Next</button>
    </div>
  )
}

export default Pagination