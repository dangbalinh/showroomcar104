import React from "react";
import style from './Search.module.css'

const Pagination = ({
    totalPosts,
    postsPerPage,
    setCurrentPage,
    currentPage,
}) => {
    let pages = [];

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
        pages.push(i);
    }


    return (
        <div>
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
        </div>
    );
};

export default Pagination;
