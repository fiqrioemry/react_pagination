import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationNav = ({ totalPages, currentPage, handlePagination }) => {
  const totalNumbers = 10;
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const [displayNumbers, setDisplayNumbers] = useState([]);

  useEffect(() => {
    if (currentPage <= 6) {
      const numbersToShow = pageNumbers.slice(currentPage, currentPage + 6);
      setDisplayNumbers(numbersToShow);
    } else {
      const numbersToShow = pageNumbers.slice(currentPage - 3, currentPage + 3);
      setDisplayNumbers(numbersToShow);
    }
  }, [currentPage]);
  return (
    <div className="flex items-center">
      {/* Arrow left */}
      <div className={`${currentPage === 1 ? "hidden" : "block"} px-1`}>
        <button
          onClick={() => handlePagination(currentPage - 1)}
          className={`${
            currentPage === totalPages ? "border-red-500" : ""
          } flex items-center justify-center w-10 h-10  border-2`}
        >
          <FaArrowLeft />
        </button>
      </div>

      <div className="block px-1">
        <button
          onClick={() => handlePagination(1)}
          className={`${
            currentPage === 1 ? "border-red-500" : ""
          } flex items-center justify-center w-10 h-10  border-2`}
        >
          1
        </button>
      </div>

      <div className={`${currentPage <= 6 ? "hidden" : "flex"} px-1`}>
        <button
          onClick={() => handlePagination(1)}
          className="
           flex items-center justify-center w-10 h-10 cursor-not-allowed border-2"
          disabled
        >
          ...
        </button>
      </div>
      {displayNumbers.map((item, index) => {
        return (
          <div className="px-1" key={index}>
            <button
              onClick={() => handlePagination(item)}
              className={`${
                currentPage === item ? "border-red-500" : ""
              } flex items-center justify-center w-10 h-10  border-2`}
            >
              {item}
            </button>
          </div>
        );
      })}
      <div className={`${currentPage === 1 ? "flex" : "hidden"} px-1`}>
        <button
          onClick={() => handlePagination(1)}
          className="
           flex items-center justify-center w-10 h-10 cursor-not-allowed border-2"
          disabled
        >
          ...
        </button>
      </div>
      <div
        className={`${
          currentPage + 10 === totalNumbers ? "hidden" : "block"
        } px-1`}
      >
        <button
          onClick={() => handlePagination(totalPages)}
          className={`${
            currentPage === totalPages ? "border-red-500" : ""
          } flex items-center justify-center w-10 h-10  border-2`}
        >
          {totalPages}
        </button>
      </div>

      {/* Arrow right */}
      <div
        className={`${currentPage === totalPages ? "hidden" : "block"} px-1`}
      >
        <button
          onClick={() => handlePagination(currentPage + 1)}
          className={`${
            currentPage === totalPages ? "border-red-500" : ""
          } flex items-center justify-center w-10 h-10  border-2`}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default PaginationNav;
