
'use client';

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import dummyProducts from "../../dummyProducts";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SessionTracker from '../../utility/sessionTracker'
import InitTracker from "../../utility/tracker";

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

const ProductPage = () => {
  useEffect(()=> {
    InitTracker()
    SessionTracker();
  }, [])
  const params = useParams();
  const id = params?.id as string;
  console.log("id: " , id)
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const found = dummyProducts.find((product) => product.id === id);
    setProduct((found as Product) || null);
  }, [id]);
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
  <Header />
  
  <main className="flex-1 py-8">
    {product ? (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <div className="flex items-center">
                <a href="/" id="product-page-link-home" className="text-sm font-medium text-gray-500 hover:text-blue-600">Home</a>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <a href="/bestDeals" id="product-page-link-bestDeals" className="text-sm font-medium text-gray-500 hover:text-blue-600">Best Deals</a>
                <svg className="flex-shrink-0 h-5 w-5 text-gray-400 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            </li>
            <li className="text-sm font-medium text-gray-500 truncate">
              {product.make} {product.model}
            </li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 bg-white p-6 rounded-xl shadow-sm">
          {/* Product Image */}
          <div className="w-full lg:w-1/2">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
              <img
                src={product.image}
                alt={`${product.make} ${product.model}`}
                className="w-full h-full object-contain p-4"
              />
              {product.discount > 0 && (
                <div className="absolute top-4 right-4 bg-gradient-to-r from-red-600 to-orange-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-md">
                  {product.discount}% OFF
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex-1">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">
                {product.make} {product.model}
              </h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
                <span className="text-sm text-gray-500 ml-1">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <p className="text-3xl font-bold text-blue-600">
                  ₹{product.price.toLocaleString()}
                </p>
                {product.originalPrice && product.originalPrice > product.price && (
                  <p className="text-lg text-gray-500 line-through">
                    ₹{product.originalPrice.toLocaleString()}
                  </p>
                )}
              </div>

              {/* Seller Info */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Seller Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="text-gray-700">{product.seller}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">{product.location}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-gray-700">{product.phoneNumber}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              <button className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Now
              </button>
              <button className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Contact Seller
              </button>
              <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-3 px-6 rounded-lg shadow-sm hover:shadow transition-all duration-300 flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="max-w-5xl mx-auto p-6 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-16 h-16 bg-gray-200 rounded-full mb-4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
          <div className="space-y-2 w-full">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
        </div>
      </div>
    )}
  </main>

  <Footer />
</div>
  );
};

export default ProductPage
