import { useState } from "react";
import PaginationNav from "./component/PaginationNav";
import PaginationBox from "./component/PaginationBox";

function App() {
  const products = Array.from({ length: 12000 }, (_, i) => i + 1); // <--- replace this with your data
  const productPerPage = 10; // <--- set this for how many product you want to show
  const [currentPage, setCurrentPage] = useState(1);
  const indexLastProduct = productPerPage * currentPage;
  const indexFirstProduct = indexLastProduct - productPerPage;
  const productToShow = products.slice(indexFirstProduct, indexLastProduct);
  const totalPages = Math.ceil(products.length / productPerPage);

  const handlePagination = (number) => {
    setCurrentPage(number);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <main className="overflow-hidden">
      <section className="container mx-auto py-12 space-y-12">
        <div className="text-xl font-semibold uppercase">
          Pagination Implementation
        </div>
        <div className="flex flex-wrap min-h-[335px]">
          <PaginationBox productToShow={productToShow} />
        </div>
        <PaginationNav
          handlePagination={handlePagination}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </section>
    </main>
  );
}

export default App;
