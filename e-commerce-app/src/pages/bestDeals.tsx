import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import dummyProducts from "../dummyProducts";
import FilterSideBar from "@/components/FilterSidebar";
import SessionTracker from '../utility/sessionTracker'
import { useEffect } from "react";
import InitTracker from '../utility/tracker';

type Product = {
  id: string;
  make: string;
  model: string;
  price: number;
  images: string[];
  seller: string;
  location: string;
  phoneNumber: number;
};

const BestDeals = () => {
  useEffect(()=> {
    SessionTracker()
    InitTracker()
  }, [])
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <div className="flex flex-col md:flex-row flex-grow">
        <div className="md:w-64 lg:w-72 md:sticky md:top-16 md:h-screen md:overflow-y-auto flex-shrink-0">
        <FilterSideBar />
      </div>
      <main className="flex-grow p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {dummyProducts.map((product, index) =>
            product?.images?.[0] ? (
              <ProductCard key={product.id} product={product} />
            ) : null
          )}
        </div>
      </main>
      </div>
      <Footer />
    </div>
  );
};

export default BestDeals;
