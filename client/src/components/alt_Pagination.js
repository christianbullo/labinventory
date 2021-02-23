import React, { Component } from "react";
import { fetchOutStock } from "../actions/ActionCreators";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "reactstrap";
import "./Pagination.css";

const mapStateToProps = state => {
  return {
      outstock: state.outstock  
  };
};

const mapDispatchToProps = {
  fetchOutStock: (pageData) => (fetchOutStock(pageData))
};

class Pagination extends Component {
//const Pagination = ({ page, pages, changePage }) => {
  constructor(props) {
    super(props);
    this.onChangePage = this.onChangePage.bind(this);
  }

  changePage(newPage) {
    alert('new page! is ' + newPage);
    this.props.fetchOutStock(newPage);
  }

  render() {
    let middlePagination;

    let page = this.props.outstock.page;
    let pages= this.props.outstock.pages;

    middlePagination = [...Array(pages)].map((_, idx) => (
      <button
        key={idx + 1}
        //onClick={() => this.changePage(idx + 1)}
        disabled={page === idx + 1}
      >
        {idx + 1}
      </button>
    ));

    return (
      pages > 1 && (
        <div className="pagination">
          <Button
            className="pagination__prev"
            onClick={this.changePage((page) => page - 1)}
            disabled={page === 1}
          >
            &#171;
          </Button>
          {/* <button
            className="pagination__prev"
            onClick={() => this.changePage((page) => page - 1)}
            disabled={page === 1}
          >
            &#171;
          </button> */}
          {middlePagination}
          {/* <button
            className="pagination__next"
            onClick={() => this.changePage((page) => page + 1)}
            disabled={page === pages}
          >
            &#187;
          </button> */}
          <Button
            className="pagination__next"
            onClick={this.changePage((page) => page + 1)}
            disabled={page === pages}
          >
            &#187;
          </Button>
        </div>
      )
    );

  }

  
  
  // let middlePagination;

  // let page = this.props.outstock.page;
  // let pages= this.props.outstock.pages;

  // if (pages <= 5) {
  //   middlePagination = [...Array(pages)].map((_, idx) => (
  //     <button
  //       key={idx + 1}
  //       onClick={() => changePage(idx + 1)}
  //       disabled={page === idx + 1}
  //     >
  //       {idx + 1}
  //     </button>
  //   ));
  // } else {
  //   const startValue = Math.floor((page - 1) / 5) * 5;

  //   middlePagination = (
  //     <>
  //       {[...Array(5)].map((_, idx) => (
  //         <button
  //           key={startValue + idx + 1}
  //           disabled={page === startValue + idx + 1}
  //           onClick={() => changePage(startValue + idx + 1)}
  //         >
  //           {startValue + idx + 1}
  //         </button>
  //       ))}

  //       <button>...</button>
  //       <button onClick={() => changePage(pages)}>{pages}</button>
  //     </>
  //   );

  //   if (page > 5) {
  //     if (pages - page >= 5) {
  //       middlePagination = (
  //         <>
  //           <button onClick={() => changePage(1)}>1</button>
  //           <button>...</button>
  //           <button onClick={() => changePage(startValue)}>{startValue}</button>
  //           {[...Array(5)].map((_, idx) => (
  //             <button
  //               key={startValue + idx + 1}
  //               disabled={page === startValue + idx + 1}
  //               onClick={() => changePage(startValue + idx + 1)}
  //             >
  //               {startValue + idx + 1}
  //             </button>
  //           ))}

  //           <button>...</button>
  //           <button onClick={() => changePage(pages)}>{pages}</button>
  //         </>
  //       );
  //     } else {
  //       let amountLeft = pages - page + 5;
  //       middlePagination = (
  //         <>
  //           <button onClick={() => changePage(1)}>1</button>
  //           <button>...</button>
  //           <button onClick={() => changePage(startValue)}>{startValue}</button>
  //           {[...Array(amountLeft)].map((_, idx) => (
  //             <button
  //               key={startValue + idx + 1}
  //               disabled={page === startValue + idx + 1}
  //               style={
  //                 pages < startValue + idx + 1 ? { display: "none" } : null
  //               }
  //               onClick={() => changePage(startValue + idx + 1)}
  //             >
  //               {startValue + idx + 1}
  //             </button>
  //           ))}
  //         </>
  //       );
  //     }
  //   }
  // }

  // return (
  //   pages > 1 && (
  //     <div className="pagination">
  //       <button
  //         className="pagination__prev"
  //         onClick={() => changePage((page) => page - 1)}
  //         disabled={page === 1}
  //       >
  //         &#171;
  //       </button>
  //       {middlePagination}
  //       <button
  //         className="pagination__next"
  //         onClick={() => changePage((page) => page + 1)}
  //         disabled={page === pages}
  //       >
  //         &#187;
  //       </button>
  //     </div>
  //   )
  // );
};

//export default Pagination;
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Pagination));