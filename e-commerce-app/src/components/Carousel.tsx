import { useState, useEffect, SetStateAction } from 'react';

export default function Carousel() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const totalSlidesCount = 4;

  // Auto-advance carousel
  useEffect(() => {
    const autoAdvanceInterval = setInterval(() => {
      setCurrentSlideIndex((prevIndex) => (prevIndex + 1) % totalSlidesCount);
    }, 5000);

    return () => clearInterval(autoAdvanceInterval);
  }, []);

  const navigateToSlide = (slideIndex: SetStateAction<number>) => {
    setCurrentSlideIndex(slideIndex);
  };

  const navigateSlide = (direction: number) => {
    setCurrentSlideIndex((prevIndex) => 
      (prevIndex + direction + totalSlidesCount) % totalSlidesCount
    );
  };

  // Realistic iPhone component
  interface RealisticIPhoneProps {
    id: string;
    className?: string;
    showScreen?: boolean;
  }
  const RealisticIPhone = ({ id, className = "", showScreen = true }: RealisticIPhoneProps) => (
    <div id={id} className={`relative ${className}`}>
      <div className="w-20 h-36 bg-gray-900 rounded-lg shadow-lg relative overflow-hidden">
        {/* Phone frame */}
        <div className="absolute inset-1 bg-black rounded-md">
          {/* Screen */}
          {showScreen && (
            <div className="absolute inset-1 bg-gradient-to-br from-blue-400 to-purple-600 rounded-sm flex items-center justify-center">
              <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">📱</span>
              </div>
            </div>
          )}
          {/* Home indicator */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-gray-600 rounded-full"></div>
        </div>
        {/* Camera */}
        <div className="absolute top-2 left-3 w-2 h-2 bg-gray-800 rounded-full"></div>
        <div className="absolute top-2 left-6 w-1 h-1 bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );

  // Android phone component
  interface RealisticAndroidProps {
    id: string;
    className?: string;
  }
  const RealisticAndroid = ({ id, className = "" }: RealisticAndroidProps) => (
    <div id={id} className={`relative ${className}`}>
      <div className="w-20 h-36 bg-gray-800 rounded-xl shadow-lg relative overflow-hidden">
        {/* Phone frame */}
        <div className="absolute inset-0.5 bg-black rounded-lg">
          {/* Screen */}
          <div className="absolute inset-1 bg-gradient-to-br from-green-400 to-blue-500 rounded-sm flex items-center justify-center">
            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">🤖</span>
            </div>
          </div>
          {/* Navigation buttons */}
          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex space-x-2">
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
            <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
          </div>
        </div>
        {/* Camera cluster */}
        <div className="absolute top-2 right-2 w-3 h-3 bg-gray-700 rounded-sm flex flex-wrap">
          <div className="w-1 h-1 bg-gray-900 rounded-full m-0.5"></div>
          <div className="w-1 h-1 bg-gray-900 rounded-full m-0.5"></div>
        </div>
      </div>
    </div>
  );

  // Enhanced Piggy Bank component
  interface EnhancedPiggyBankProps {
    id: string;
  }
  const EnhancedPiggyBank = ({ id }: EnhancedPiggyBankProps) => (
    <div id={id} className="relative">
      <div className="w-32 h-20 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full relative shadow-lg">
        {/* Body */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full"></div>
        
        {/* Ears */}
        <div className="absolute -top-2 left-6 w-4 h-6 bg-yellow-400 rounded-t-full transform rotate-12"></div>
        <div className="absolute -top-2 right-6 w-4 h-6 bg-yellow-400 rounded-t-full transform -rotate-12"></div>
        
        {/* Snout */}
        <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-6 bg-yellow-400 rounded-full">
          {/* Nostrils */}
          <div className="absolute top-2 left-2 w-1 h-1 bg-yellow-600 rounded-full"></div>
          <div className="absolute top-2 right-2 w-1 h-1 bg-yellow-600 rounded-full"></div>
        </div>
        
        {/* Eyes */}
        <div className="absolute top-3 left-8 w-2 h-2 bg-gray-800 rounded-full"></div>
        <div className="absolute top-3 right-8 w-2 h-2 bg-gray-800 rounded-full"></div>
        
        {/* Coin slot */}
        <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-6 h-1 bg-yellow-600 rounded-full"></div>
        
        {/* Legs */}
        <div className="absolute -bottom-1 left-4 w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="absolute -bottom-1 right-4 w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="absolute -bottom-1 left-12 w-3 h-3 bg-yellow-500 rounded-full"></div>
        <div className="absolute -bottom-1 right-12 w-3 h-3 bg-yellow-500 rounded-full"></div>
        
        {/* Tail */}
        <div className="absolute top-6 -right-2 w-1 h-4 bg-yellow-400 rounded-full transform rotate-45"></div>
      </div>
      
      {/* Floating coins */}
      <div className="absolute -top-4 -right-4 w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-500 flex items-center justify-center text-xs animate-bounce">
        $
      </div>
      <div className="absolute -top-2 -left-6 w-4 h-4 bg-yellow-300 rounded-full border-2 border-yellow-400 flex items-center justify-center text-xs animate-bounce delay-300">
        ¢
      </div>
    </div>
  );

  return (
    <div id="phone-marketplace-carousel-container" className="w-full mt-6 max-w-7xl mx-auto relative overflow-hidden rounded-2xl shadow-2xl bg-white">
      <div 
        id="carousel-slides-track"
        className="flex transition-transform duration-700 ease-in-out"
        style={{ transform: `translateX(-${currentSlideIndex * 100}%)` }}
      >
        {/* Slide 1: Sell Your Old Phones */}
        <div id="sell-phones-slide" className="flex-shrink-0 w-full min-h-[500px] bg-gradient-to-br from-yellow-50 to-white flex items-center px-16 py-12">
          <div id="sell-phones-content" className="flex-1 pr-8">
            <h2 id="sell-phones-title" className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Sell Your Old Phones Nearby
            </h2>
            <p id="sell-phones-description" className="text-xl text-gray-600 mb-8 leading-relaxed">
              Get the best price for your used phone quickly and easily.
            </p>
            <button id="sell-phones-cta-button" className="bg-gray-800 hover:bg-yellow-500 hover:text-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3">
              <span className="text-2xl">📱</span> Sell
            </button>
          </div>
          <div id="sell-phones-visual" className="flex-1 flex items-center justify-center">
            <div id="phone-money-visual" className="relative">
              <div id="money-circle-animation" className="w-64 h-64 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <div id="dollar-bills-stack" className="text-6xl">💰</div>
              </div>
              <div id="floating-phone-icon" className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center animate-bounce">
                <span className="text-2xl">📱</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 2: Selling Phones In Bulk */}
        <div id="bulk-selling-slide" className="flex-shrink-0 w-full min-h-[500px] bg-gradient-to-br from-yellow-100 to-yellow-50 flex items-center px-16 py-12">
          <div id="bulk-selling-content" className="flex-1 pr-8">
            <h2 id="bulk-selling-title" className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Selling Phones In Bulk?
            </h2>
            <p id="bulk-selling-description" className="text-xl text-gray-600 mb-8 leading-relaxed">
              Register your online store with ORUphones to connect with more buyers and get more nearby walk-in customers to your store.
            </p>
            <button id="bulk-selling-cta-button" className="bg-gray-800 hover:bg-yellow-500 hover:text-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3">
              <span className="text-2xl">🏪</span> Register as Store
            </button>
          </div>
          <div id="bulk-selling-visual" className="flex-1 flex items-center justify-center">
            <div id="store-building-visual" className="relative">
              <div id="store-main-building" className="w-48 h-32 bg-gradient-to-b from-yellow-300 to-yellow-400 rounded-lg shadow-2xl relative">
                {/* Store front */}
                <div id="store-front-window" className="absolute inset-4 bg-white rounded-md shadow-inner">
                  <div id="store-display-phones" className="flex justify-center items-center h-full gap-2">
                    <div className="w-4 h-6 bg-gray-800 rounded-sm"></div>
                    <div className="w-4 h-6 bg-gray-700 rounded-sm"></div>
                    <div className="w-4 h-6 bg-gray-600 rounded-sm"></div>
                  </div>
                </div>
                {/* Store sign */}
                <div id="store-sign" className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-gray-800 px-4 py-2 rounded-lg font-bold text-sm shadow-lg">
                  ORUSTORE
                </div>
                {/* Door */}
                <div id="store-entrance-door" className="absolute bottom-0 right-4 w-8 h-16 bg-yellow-600 rounded-t-lg"></div>
              </div>
              {/* Floating customers */}
              <div id="floating-customer-icons" className="absolute -top-8 -left-8 animate-bounce">
                <span className="text-3xl">👥</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3: Compare Prices */}
        <div id="compare-prices-slide" className="flex-shrink-0 w-full min-h-[500px] bg-gradient-to-br from-white to-yellow-50 flex items-center px-16 py-12">
          <div id="compare-prices-content" className="flex-1 pr-8">
            <h2 id="compare-prices-title" className="text-5xl font-bold text-gray-800 mb-6 leading-tight">
              Compare Prices For Used Phones
            </h2>
            <p id="compare-prices-description" className="text-xl text-gray-600 mb-8 leading-relaxed">
              Whether buying or selling phones, our tool ensures you get the best price on ORUphones.
            </p>
            <button id="compare-prices-cta-button" className="bg-gray-800 hover:bg-yellow-500 hover:text-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3">
              <span className="text-2xl">📊</span> Compare Prices
            </button>
          </div>
          <div id="compare-prices-visual" className="flex-1 flex items-center justify-center">
            <div id="phone-comparison-display" className="flex gap-6 items-end">
              <div id="phone-comparison-group-1" className="flex flex-col items-center">
                <RealisticIPhone id="comparison-iphone-1" className="animate-bounce" />
                <div id="iphone-price-tag-1" className="mt-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded text-sm font-bold">$299</div>
              </div>
              <div id="phone-comparison-group-2" className="flex flex-col items-center">
                <RealisticAndroid id="comparison-android-1" className="animate-bounce delay-150" />
                <div id="android-price-tag-1" className="mt-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded text-sm font-bold">$199</div>
              </div>
              <div id="phone-comparison-group-3" className="flex flex-col items-center">
                <RealisticIPhone id="comparison-iphone-2" className="animate-bounce delay-300" showScreen={false} />
                <div id="iphone-price-tag-2" className="mt-2 bg-yellow-400 text-gray-800 px-2 py-1 rounded text-sm font-bold">$399</div>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 4: Tight Budget */}
        <div id="tight-budget-slide" className="flex-shrink-0 w-full min-h-[500px] bg-gradient-to-br from-yellow-200 to-yellow-100 flex items-center px-16 py-12">
          <div id="tight-budget-content" className="flex-1 pr-8">
            <h2 id="tight-budget-title" className="text-5xl font-bold mb-6 leading-tight">
              <span className="text-yellow-600">Tight Budget?</span>
              <br />
              <span className="text-gray-800">Save Big on Used Phones!</span>
            </h2>
            <p id="tight-budget-description" className="text-xl text-gray-600 mb-8 leading-relaxed">
              Discover great deals on top-quality used phones, nearby.
            </p>
            <button id="tight-budget-cta-button" className="bg-gray-800 hover:bg-yellow-500 hover:text-gray-800 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center gap-3">
              <span className="text-2xl">🛒</span> Buy Now
            </button>
          </div>
          <div id="tight-budget-visual" className="flex-1 flex items-center justify-center">
            <EnhancedPiggyBank id="savings-piggy-bank" />
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        id="carousel-prev-arrow"
        onClick={() => navigateSlide(-1)}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-yellow-400 hover:bg-opacity-90 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 shadow-lg hover:scale-110"
      >
        ‹
      </button>
      <button 
        id="carousel-next-arrow"
        onClick={() => navigateSlide(1)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-80 hover:bg-yellow-400 hover:bg-opacity-90 text-gray-800 w-12 h-12 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 shadow-lg hover:scale-110"
      >
        ›
      </button>

      {/* Navigation Dots */}
      <div id="carousel-navigation-dots" className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-3">
        {[0, 1, 2, 3].map((index) => (
          <button
            key={index}
            id={`carousel-dot-${index + 1}`}
            onClick={() => navigateToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlideIndex === index
                ? 'bg-yellow-500 scale-125 shadow-lg'
                : 'bg-white bg-opacity-50 hover:bg-yellow-300 hover:bg-opacity-70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}