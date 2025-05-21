'use client'

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import dummyProducts from "../dummyProducts";
import InitTracker from "../utility/tracker";
import { useEffect } from "react";
import SessionTracker from '../utility/sessionTracker'


const Home = () => {
  useEffect(()=> {
    SessionTracker()
    InitTracker();
  }, [])
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-50 to-blue-50">
  <Header />

  <main className="flex-grow p-6 md:p-8 lg:p-12 max-w-7xl mx-auto w-full">
    {/* Row 1: Links */}
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Quick Links
      </h2>
      <div className="flex flex-wrap gap-6">
        <a 
          href="#" 
          className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-blue-100"
        >
          <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            Apple Phones
          </span>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 mt-1"></div>
        </a>
        <a 
          href="#" 
          className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-blue-100"
        >
          <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            Samsung Phones
          </span>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 mt-1"></div>
        </a>
        <a 
          href="#" 
          className="px-6 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group border border-gray-100 hover:border-blue-100"
        >
          <span className="font-medium text-gray-700 group-hover:text-blue-600 transition-colors duration-300">
            Admin Panel
          </span>
          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 mt-1"></div>
        </a>
      </div>
    </section>

    {/* Row 2: Buttons */}
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Actions
      </h2>
      <div className="flex flex-wrap gap-6">
        <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium rounded-xl shadow-lg hover:shadow-green-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
          Sell a Phone
        </button>
        <button className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-medium rounded-xl shadow-lg hover:shadow-yellow-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
          </svg>
          Track Orders
        </button>
        <button className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-medium rounded-xl shadow-lg hover:shadow-gray-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"></path>
          </svg>
          Customer Support
        </button>
      </div>
    </section>

    {/* Row 3: Cards */}
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Top Picks
        </h2>
        <a 
          href="#" 
          className="text-sm font-medium text-blue-600 hover:text-purple-600 transition-colors duration-300 flex items-center gap-1"
        >
          View all
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {dummyProducts.slice(6, 16).map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
          >
            <div className="relative pt-[100%] bg-gray-50">
              <img 
                src={product.image} 
                alt={product.model} 
                className="absolute top-0 left-0 w-full h-full object-contain p-4"
              />
              <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {product.discount}% OFF
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-semibold text-gray-800 mb-1">{product.model}</h3>
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, i) => (
                  <svg 
                    key={i} 
                    className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                    fill="currentColor" 
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                  </svg>
                ))}
                <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">${product.price}</span>
                  {product.originalPrice && (
                    <span className="text-xs text-gray-500 line-through ml-1">${product.originalPrice}</span>
                  )}
                </div>
                <button className="p-2 bg-gradient-to-r from-blue-100 to-purple-100 rounded-lg hover:from-blue-200 hover:to-purple-200 transition-all duration-300">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  </main>

  <Footer />
</div>
  );
};

export default Home;
