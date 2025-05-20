import { useState } from "react";

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

const ProductCard = ({ product }: { product: Product }) => {

    const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {product.images?.[0] && (
        <div
          className="flex flex-col justify-center items-center p-4 w-full h-full border-2 border-gray-200 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg hover:border-blue-400 bg-white"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative w-full h-40 sm:h-48 mb-4 overflow-hidden rounded">
            <img
              src={product.images[0]}
              alt={product.model}
              className={`w-full h-full object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : ''}`}
              onError={(e) => (e.currentTarget.src = "/api/placeholder/300/300")}
            />
          </div>
         
          <h3 className="text-lg sm:text-xl font-bold text-gray-800 truncate w-full text-center">{product.make}</h3>
          <p className="text-base sm:text-lg font-medium text-gray-700 mb-2 truncate w-full text-center">{product.model}</p>
          <p className="text-lg sm:text-xl font-bold text-blue-600 mb-4">{product.price}</p>
         
          <a
            className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 active:bg-blue-800 transition-colors duration-200 font-medium"
            href={`/product/${product.id}`}
          >
            More Details
          </a>
        </div>
      )}
    </>
  );
};

export default ProductCard;
