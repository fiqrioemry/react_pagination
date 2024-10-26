import React from "react";

const PaginationBox = ({ productToShow }) => {
  return (
    <>
      {productToShow.map((item, index) => {
        return (
          <div
            className="card_box w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
            key={index}
          >
            <div className="px-2 py-2">
              <div className="bg-cyan-500 h-[150px] rounded-md flex items-center justify-center uppercase text-xl">
                {item}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default PaginationBox;
