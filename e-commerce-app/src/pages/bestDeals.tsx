import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import dummyProducts from "../dummyProducts";
import FilterSideBar from "@/components/FilterSidebar";
import SessionTracker from '../utility/sessionTracker'
import { useEffect } from "react";
import InitTracker from '../utility/tracker';
import { useAuth } from "@/context/authContext";

type Product = {
  id: string;
    make: string;
    model: string;
    price: number;
    originalPrice: number;
    discount: number;
    rating: number;
    reviews: number;
    image: string;
  seller: string;
  location: string;
  phoneNumber: number;
};

const BestDeals = () => {
        const {user, loading} = useAuth()
      
  
    if (loading) return <div>Loading...</div>;

  useEffect(()=> {
    SessionTracker()
    InitTracker()
  }, [])
  return ((user?.role !== "admin") && (
<div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
    <Header />

  
  <div className="flex flex-col md:flex-row flex-grow">
    {/* Sidebar */}
    <div className="md:w-64 lg:w-72 md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:overflow-y-auto flex-shrink-0 border-r border-gray-200 bg-white/80 backdrop-blur-sm">
      <FilterSideBar />
    </div>
    
    {/* Main Content */}
    <main className="flex-grow p-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-sm text-gray-500 mb-6">
        <a href="/" id="bestDeals-page-link-home" className="hover:text-blue-600 transition-colors">Home</a>
        <svg className="w-4 h-4 mx-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">Best Deals</span>
      </div>
      
      {/* Results Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Premium Smartphones
        </h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <select className="appearance-none bg-white pl-4 pr-10 py-2 rounded-lg border border-gray-200 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 text-sm transition-all">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest Arrivals</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          <button className="p-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Product Grid - MAINTAINED YOUR EXACT PRODUCT CARD RENDERING */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {dummyProducts.map((product, index) =>
          product?.image ? (
            <ProductCard 
              key={product.id} 
              product={product}
            />
          ) : null
        )}
      </div>
      
      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <nav className="flex items-center gap-1">
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button 
              key={page}
              className={`w-10 h-10 flex items-center justify-center rounded-lg border ${page === 1 ? 'border-blue-500 bg-blue-50 text-blue-600' : 'border-gray-200 bg-white hover:bg-gray-50'} transition-colors`}
            >
              {page}
            </button>
          ))}
          <button className="w-10 h-10 flex items-center justify-center rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </nav>
      </div>
    </main>
  </div>
  
  <Footer />
</div>)
  );
};

export default BestDeals;
