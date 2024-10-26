import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const PaginationNav = ({ totalPages, currentPage, handlePagination }) => {
  const [displayNumbers, setDisplayNumbers] = useState([]);

  useEffect(() => {
    const maxVisiblePages = 6;
    const range = [];
    let start = Math.max(currentPage - 2, 2);
    let end = Math.min(currentPage + 2, totalPages - 1);

    if (currentPage <= 3) {
      start = 2;
      end = Math.min(maxVisiblePages, totalPages - 1);
    } else if (currentPage >= totalPages - 2) {
      start = Math.max(totalPages - maxVisiblePages + 1, 2);
      end = totalPages - 1;
    }

    for (let i = start; i <= end; i++) {
      range.push(i);
    }
    setDisplayNumbers(range);
  }, [currentPage, totalPages]);

  const PaginationButton = ({ number, isCurrent, onClick, disabled }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${
        isCurrent ? "border-2 border-red-500" : "" // <-- Change this for focus button style
      } flex items-center justify-center w-10 h-10 border ${
        disabled ? "cursor-not-allowed" : ""
      }`}
    >
      {number}
    </button>
  );

  const ArrowButton = ({ direction, disabled, onClick }) => (
    <button
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center w-10 h-10 border"
    >
      {direction === "left" ? <FaArrowLeft /> : <FaArrowRight />}
    </button>
  );

  return (
    <div className="flex items-center justify-center">
      {/* left arrow */}
      {currentPage > 1 && (
        <ArrowButton
          direction="left"
          onClick={() => handlePagination(currentPage - 1)}
        />
      )}

      {/* first page */}
      <PaginationButton
        number={1}
        isCurrent={currentPage === 1}
        onClick={() => handlePagination(1)}
      />

      {/* dots */}
      {currentPage > 4 && <PaginationButton number="..." disabled />}

      {/* page number with range to 5 numbers */}
      {displayNumbers.map((num) => (
        <PaginationButton
          key={num}
          number={num}
          isCurrent={currentPage === num}
          onClick={() => handlePagination(num)}
        />
      ))}

      {/* dots */}
      {currentPage < totalPages - 3 && (
        <PaginationButton number="..." disabled />
      )}

      {/* last page */}
      <PaginationButton
        number={totalPages}
        isCurrent={currentPage === totalPages}
        onClick={() => handlePagination(totalPages)}
      />

      {/* right arrow */}
      {currentPage < totalPages && (
        <ArrowButton
          direction="right"
          onClick={() => handlePagination(currentPage + 1)}
        />
      )}
    </div>
  );
};

export default PaginationNav;
