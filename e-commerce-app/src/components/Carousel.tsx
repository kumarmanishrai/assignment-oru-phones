import { useState, useEffect } from "react";


const Carousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const slides = [
    {
      id: 'hero-slide-sell-phone',
      title: 'Sell Your Phone for the Best Price',
      subtitle: 'Get instant quotes from trusted buyers nationwide',
      description: 'Compare prices, get fair deals, and sell your phone with confidence. We connect you with verified buyers for maximum value.',
      cta: 'Get Quote Now',
      ctaSecondary: 'Learn More',
      background: 'from-green-500 to-emerald-600',
      image: '💰',
      features: ['Instant Price Quotes', 'Secure Transactions', 'Free Pickup Service']
    },
    {
      id: 'hero-slide-buy-phone',
      title: 'Buy Premium Used Phones',
      subtitle: 'Certified quality phones with warranty included',
      description: 'Discover amazing deals on pre-owned smartphones. All devices are thoroughly tested and come with our quality guarantee.',
      cta: 'Browse Deals',
      ctaSecondary: 'View Warranty',
      background: 'from-blue-500 to-cyan-600',
      image: '📱',
      features: ['Quality Tested', '30-Day Warranty', 'Best Price Match']
    },
    {
      id: 'hero-slide-compare-prices',
      title: 'Compare Prices Instantly',
      subtitle: 'Make informed decisions with real-time market data',
      description: 'Access comprehensive price comparisons across multiple platforms. Never overpay for your next smartphone purchase.',
      cta: 'Compare Now',
      ctaSecondary: 'Price Alerts',
      background: 'from-purple-500 to-violet-600',
      image: '📊',
      features: ['Real-time Data', 'Price History', 'Market Insights']
    },
    {
      id: 'hero-slide-oru-platform',
      title: 'ORU - Your Trusted Phone Marketplace',
      subtitle: 'The most reliable platform for phone transactions',
      description: 'Join thousands of satisfied customers who trust ORU for buying and selling phones. Safe, secure, and always fair.',
      cta: 'Join ORU',
      ctaSecondary: 'Success Stories',
      background: 'from-yellow-500 to-orange-500',
      image: '🏆',
      features: ['Trusted by 50K+', '5-Star Rated', '24/7 Support']
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, slides.length]);

  interface Slide {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    cta: string;
    ctaSecondary: string;
    background: string;
    image: string;
    features: string[];
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <section className="relative w-[95%] max-w-[1440px] mx-auto mt-10 mb-16 rounded-3xl overflow-hidden shadow-xl" id="hero-carousel-section">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          id={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
            index === currentSlide 
              ? 'opacity-100 transform translate-x-0' 
              : index < currentSlide 
                ? 'opacity-0 transform -translate-x-full' 
                : 'opacity-0 transform translate-x-full'
          }`}
        >
          <div className={`w-full min-h-[550px] bg-gradient-to-br ${slide.background} relative overflow-hidden`}>
            {/* Animated Background Elements */}
            <div className="absolute inset-0">
              <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
              <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-white/5 rounded-full blur-2xl animate-pulse delay-500"></div>
            </div>

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
              <div
                className="w-full h-full"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M0 0h40v40H0zm40 40h40v40H40z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                  backgroundSize: "40px 40px",
                }}
              ></div>
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  {/* Text Content */}
                  <div className="text-white space-y-8">
                    <div className="space-y-4">
                      <h1 className="text-5xl lg:text-7xl font-black leading-tight animate-in slide-in-from-left duration-1000">
                        {slide.title}
                      </h1>
                      <p className="text-xl lg:text-2xl font-medium text-white/90 animate-in slide-in-from-left duration-1000 delay-200">
                        {slide.subtitle}
                      </p>
                      <p className="text-lg text-white/80 max-w-lg animate-in slide-in-from-left duration-1000 delay-300">
                        {slide.description}
                      </p>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-4 animate-in slide-in-from-left duration-1000 delay-400">
                      {slide.features.map((feature, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full"
                          id={`${slide.id}-feature-${idx}`}
                        >
                          <svg className="w-5 h-5 text-yellow-300" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                          <span className="font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTAs */}
                    <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-left duration-1000 delay-500">
                      <button 
                        className="px-8 py-4 bg-white text-gray-900 font-bold text-lg rounded-2xl hover:bg-yellow-100 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                        id={`${slide.id}-primary-cta`}
                      >
                        {slide.cta}
                      </button>
                      <button 
                        className="px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold text-lg rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-105"
                        id={`${slide.id}-secondary-cta`}
                      >
                        {slide.ctaSecondary}
                      </button>
                    </div>
                  </div>

                  {/* Visual Element */}
                  <div className="flex justify-center lg:justify-end animate-in slide-in-from-right duration-1000 delay-300">
                    <div className="relative">
                      <div className="text-9xl lg:text-[12rem] filter drop-shadow-2xl animate-bounce">
                        {slide.image}
                      </div>
                      <div className="absolute inset-0 bg-white/20 rounded-full blur-3xl animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20" id="carousel-navigation">
        <div className="flex items-center gap-6 bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/30">
          {/* Previous Button */}
          <button
            onClick={prevSlide}
            id="carousel-prev-button"
            className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Slide Indicators */}
          <div className="flex gap-3" id="carousel-indicators">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                id={`carousel-indicator-${index}`}
                className={`w-4 h-4 rounded-full transition-all duration-300 hover:scale-125 ${
                  index === currentSlide 
                    ? 'bg-white shadow-lg' 
                    : 'bg-white/50 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            id="carousel-next-button"
            className="w-12 h-12 bg-white/20 hover:bg-white/30 rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110"
          >
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Auto-play Indicator */}
      <div className="absolute top-8 right-8 z-20" id="autoplay-indicator">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/30">
          <div className={`w-2 h-2 rounded-full ${isAutoPlaying ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
          <span className="text-white text-sm font-medium">
            {isAutoPlaying ? 'Auto' : 'Manual'}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20" id="carousel-progress">
        <div 
          className="h-full bg-yellow-400 transition-all duration-300 ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        ></div>
      </div>
    </section>
  );
};

export default Carousel;