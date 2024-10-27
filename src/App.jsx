import { useState, useEffect, useRef } from "react";

function App() {
  const totalBox = 18;
  const [products, setProducts] = useState(
    Array.from({ length: totalBox }, (_, i) => i + 1)
  );
  const [value, setValue] = useState(0);
  const [divWidth, setDivWidth] = useState(0);
  const absoluteDivRef = useRef(null);

  const getSlideWidth = () => {
    if (divWidth >= 1024) return divWidth / 5; // lg: 1/5 dari lebar div
    if (divWidth >= 768) return divWidth / 4; // md: 1/4 dari lebar div
    if (divWidth >= 640) return divWidth / 3; // sm: 1/3 dari lebar div
    return divWidth / 2; // xs: 1/2 dari lebar div
  };

  const getNumPerSlide = () => {
    if (divWidth >= 1024) return 5; // lg: 5 items
    if (divWidth >= 768) return 4; // md: 4 items
    if (divWidth >= 640) return 3; // sm: 3 items
    return 2; // xs: 2 items
  };

  const handleNext = () => {
    const slideWidth = getSlideWidth();
    const numPerSlide = getNumPerSlide();
    const itemsToShow =
      divWidth >= 1024 ? 5 : divWidth >= 768 ? 4 : divWidth >= 640 ? 3 : 2;
    const maxSlideValue =
      slideWidth * products.length - itemsToShow * slideWidth;

    setValue((prevValue) =>
      prevValue < maxSlideValue
        ? Math.min(prevValue + slideWidth * numPerSlide, maxSlideValue)
        : 0
    );
  };

  const handlePrev = () => {
    const slideWidth = getSlideWidth();
    setValue((prevValue) => Math.max(prevValue - slideWidth, 0));
  };

  useEffect(() => {
    const updateDivWidth = () => {
      if (absoluteDivRef.current) {
        const { width } = absoluteDivRef.current.getBoundingClientRect();
        setDivWidth(width); // Set lebar div yang diambil
      }
    };

    updateDivWidth(); // Update saat pertama kali dirender
    window.addEventListener("resize", updateDivWidth); // Update saat ukuran jendela berubah

    return () => window.removeEventListener("resize", updateDivWidth); // Hapus listener saat unmount
  }, []);

  useEffect(() => {
    setValue(0); // Reset posisi slider saat lebar div berubah
  }, [divWidth]);

  const fetchProducts = async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    console.log(data.products);
    setProducts(data.products);
  };

  useEffect(() => {
    fetchProducts();
  });

  return (
    <main className="overflow-hidden px-2">
      <section className="container mx-auto py-12 space-y-12">
        <div className="text-xl font-semibold uppercase">
          CARD SLIDER IMPLEMENTATION
        </div>

        <div className="space-y-2 h-[200px]">
          <div
            ref={absoluteDivRef} // Gunakan referensi di sini
            className="relative whitespace-nowrap h-[170px] overflow-x-hidden bg-red-500"
          >
            <div
              className="absolute  container transition-all duration-300"
              style={{
                left: `-${value}px`,
              }}
            >
              {products.map((item, index) => (
                <div
                  className="inline-block w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5"
                  key={index}
                >
                  <div className="py-2 px-2">
                    <div className="bg-cyan-500 rounded-md flex items-center justify-center uppercase text-xl">
                      <img className="h-[150px]" src={item.thumbnail} alt="" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-x-10 items-center">
            <button onClick={handlePrev} className="px-4 py-2 bg-red-500">
              PREV
            </button>
            <button onClick={handleNext} className="px-4 py-2 bg-red-500">
              NEXT
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
