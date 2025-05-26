import { useState } from "react";

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

const ProductCard = ({ product }: { product: Product }) => {

    // const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {product?.image && (
        <div 
  key={product.id} 
  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
>
  {/* Product Image */}
  <div className="relative pt-[100%] bg-gray-50 group">
    <img 
      src={product?.image} 
      alt={product?.model} 
      className="absolute top-0 left-0 w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
    />
    {product?.discount && (
      <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white text-xs font-bold px-2 py-1 rounded-full">
        {product.discount}% OFF
      </div>
    )}
  </div>

  {/* Product Info */}
  <div className="p-5 flex-grow flex flex-col">
    <h3 className="font-semibold text-gray-800 mb-1">{product.model}</h3>
    
    {/* Rating */}
    <div className="flex items-center mb-2">
      {[...Array(5)].map((_, i) => (
        <svg 
          key={i} 
          className={`w-4 h-4 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 fill-current'}`} 
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
    </div>

    {/* Price */}
    <div className="flex items-end justify-between mt-auto">
      <div>
        <span className="text-lg font-bold text-gray-900">${product.price}</span>
        {product?.originalPrice && (
          <span className="text-xs text-gray-500 line-through ml-1">${product.originalPrice}</span>
        )}
      </div>
      <div className="flex gap-2">
        {/* Add to Cart Button */}
        <button 
        id={`cart-${product.model}`}
          className="p-2 bg-gradient-to-r from-yellow-100 to-yellow-200 rounded-lg hover:from-yellow-200 hover:to-yellow-300 transition-all duration-300"
          aria-label="Add to cart"
        >
          <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
          </svg>
        </button>
        
        {/* More Details Button */}
        <a 
          href={`/product/${product.id}`} 
          id={`button-product-${product.model}`}
          className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center"
        >
          Details
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</div>
      )}
    </>
  );
};

export default ProductCard;
