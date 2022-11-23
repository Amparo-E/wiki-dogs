import React from "react";
import style from './Pagination.module.css'


const Pagination = ({ totalPost, postPerPage, setCurrentPage, currentPage}) => {
    let pages = [];
    

    const handleClickNext = () => {
        setCurrentPage(currentPage + 1);
    }

    const handleClickPrev = () => {
        setCurrentPage(currentPage - 1);
    }


    for(let i = 1; i <= Math.ceil(totalPost / postPerPage); i++){
        pages.push(i);
    }
    
    return (
        <div className={style.pagination} >

            {currentPage === 1
                ? <></>
                : <button onClick={handleClickPrev} className={style.handles}>Prev</button>
            }

            {
                pages?.map((page, index) => {
                    return  <button 
                                key={index}
                                onClick={() => setCurrentPage(page)}
                                className={page === currentPage ? style.active : ""}>
                                {page}
                            </button>

                })
            }

            {postPerPage * currentPage >= totalPost
                ? <></>
                : <button onClick={handleClickNext} className={style.handles}>Next</button>
            }
        </div>
    )
}

export default Pagination;