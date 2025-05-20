
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
  images: string[];
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
    setProduct(found || null);
  }, [id]);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 ">
        {product ? (
        <div className=" flex items-center mt-2 max-w-5xl mx-auto p-6 flex-col lg:flex-row gap-12">
          {/* Product Image */}
          <div className="w-full lg:w-1/2 pr-0 lg:pr-6">
            <img
              src={product?.images?.[0]}
              alt={product?.model}
              className="w-full h-[400px] object-cover rounded shadow-md"
            />
          </div>

          {/* Product Details */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4">
            <h1 className="text-3xl font-bold text-gray-900">
              {product?.make} - {product?.model}
            </h1>
            <p className="text-xl text-blue-600 font-semibold">
              ₹{product?.price?.toLocaleString()}
            </p>

            <div className="text-gray-700 text-base">
              <p>
                <strong>Seller:</strong> {product?.seller}
              </p>
              <p>
                <strong>Location:</strong> {product?.location}
              </p>
              <p>
                <strong>Phone:</strong> {product?.phoneNumber}
              </p>
            </div>

            <div className="flex gap-4 mt-6">
              <button className="bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition">
                Buy
              </button>
              <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
                Contact Seller
              </button>
              <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300 transition">
                Save
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto p-6 text-center text-gray-500">
          Loading...
        </div>
      )}
      </main>
      <Footer />
    </div>
  );
};

export default ProductPage
