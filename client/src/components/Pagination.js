import React, { Component } from "react";

const Pagination = ({ numpage, numpages, changePage }) => {
 
  let middlePagination;

  let page = parseInt(numpage);
  let pages = numpages;

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        key={idx + 1}
        onClick={() => changePage(idx + 1)}
        disabled={page === idx + 1}
      >
        {idx + 1}  
      </button>
    ));
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;
    const lastItem = [...Array(5)].length;
    
    middlePagination = (
      <React.Fragment>
        {[...Array(5)].map((_, idx) => (
          <button
            key={startValue + idx + 1}
            disabled={page === startValue + idx + 1}
            onClick={() => changePage(startValue + idx + 1)}
          >
            {startValue + idx + 1}  
          </button>
        ))}

        <button onClick={() => changePage(lastItem + 1)}>...</button>
        <button onClick={() => changePage(pages)}>{pages}</button>
      </React.Fragment>
    );

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <React.Fragment>
            <button onClick={() => changePage(1)}>1</button>
            <button onClick={() => changePage(startValue - 1)}>...</button>
            <button onClick={() => changePage(startValue)}>{startValue}</button>
            {[...Array(5)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                onClick={() => changePage(startValue + idx + 1)}
              >
                {startValue + idx + 1} 
              </button>
            ))}

            <button onClick={() => changePage(startValue + 6)}>...</button>
            <button onClick={() => changePage(pages)}>{pages}</button>
          </React.Fragment>
        );
      } else {
        let amountLeft = pages - page + 5;
        middlePagination = (
          <React.Fragment>
            <button onClick={() => changePage(1)}>1</button>
            <button onClick={() => changePage(startValue - 1)}>...</button>
            <button onClick={() => changePage(startValue)}>{startValue}</button>
            {[...Array(amountLeft)].map((_, idx) => (
              <button
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={
                  pages < startValue + idx + 1 ? { display: "none" } : null
                }
                onClick={() => changePage(startValue + idx + 1)}
              >
                {startValue + idx + 1} 
              </button>
            ))}
          </React.Fragment>
        );
      }
    }
  }

  return (
    pages > 1 && (
      <div className="pagination">
        <button
          className="pagination__prev"
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
        >
          &#171;
        </button>
        {middlePagination}  
        <button
          className="pagination__next"
          onClick={() => changePage(page + 1)}
          disabled={page === pages}
        >
          &#187;
        </button>
      </div>
    )
  );
};

export default Pagination;