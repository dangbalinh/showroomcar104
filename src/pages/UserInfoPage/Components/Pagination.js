import React from "react";
import style from '../../SearchResult/Search.module.css'

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
                        onClick={() => setCurrentPage(page)}
                        className={page == currentPage ? style.active : ""}>
                        {page}
                    </button>
                );
            })}
        </div>
    );
};

export default Pagination;
