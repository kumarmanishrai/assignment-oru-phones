import Image from "next/image";

export default function AppDownloadBanner() {
  return (
    <section
      className="bg-gradient-to-r from-gray-900 to-gray-800 py-20 my-18 mx-4 md:mx-8 lg:mx-16 xl:mx-12 rounded-2xl relative overflow-visible"
      id="app-promotion-banner"
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 px-6">
        {/* Text Content - Left Side */}
        <div className="md:w-1/2 space-y-6 text-center md:text-left z-10">
          {/* ...existing text/buttons/links... */}
          <h1 className="text-2xl md:text-4xl lg:text-2xl font-bold text-yellow-400 leading-tight">
            Buy & Sell Old–Refurbished–Used
            <br />
            Phones Easily On Our App
          </h1>

           <p className="text-lg md:text-xl text-gray-300 mb-8">
            Get the ORUphones app now!
          </p>

          {/* App Store Buttons */}
           <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mb-12">
            <a
              href="#"
              className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              id="google-play-button"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M1.571 23.664l10.531-10.501 3.712 3.701-12.519 6.941a1.563 1.563 0 01-1.723-.141zm.966-7.133l13.713-13.715 1.736 1.736-13.713 13.715-1.736-1.736zM18.29 1.856l2.637 2.637-13.713 13.714-2.637-2.637L18.29 1.856z" />
              </svg>
              Google Play
            </a>

            <a
              href="#"
              className="bg-gray-800 hover:bg-gray-700 text-yellow-400 px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
              id="app-store-button"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.536 8.464c1.494 1.494 2.4 3.562 2.4 5.85 0 2.288-.906 4.356-2.4 5.85-1.494 1.494-3.562 2.4-5.85 2.4-2.288 0-4.356-.906-5.85-2.4-1.494-1.494-2.4-3.562-2.4-5.85 0-2.288.906-4.356 2.4-5.85 1.494-1.494 3.562-2.4 5.85-2.4 2.288 0 4.356.906 5.85 2.4zm-5.85-6.364c-3.037 0-5.85 1.563-7.5 4.166-1.65 2.603-1.65 5.73 0 8.333 1.65 2.603 4.463 4.166 7.5 4.166s5.85-1.563 7.5-4.166c1.65-2.603 1.65-5.73 0-8.333-1.65-2.603-4.463-4.166-7.5-4.166z" />
              </svg>
              App Store
            </a>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center md:justify-start gap-6 border-t border-yellow-400/20 pt-6">
            <a
              href="#"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
              id="about-link"
            >
              Sell Online
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
              id="phones-link"
            >
              Phones
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-yellow-400 transition-colors"
              id="deals-link"
            >
              Top Deals Near You
            </a>
          </div>
        </div>

        {/* Image - Right Side (Centered with Margin) */}
        <div className="md:w-1/2 flex justify-center items-center relative z-20">
          <div
            className="
              relative
              w-full
              flex
              justify-center
              items-center
            "
            style={{
              // This allows the image to overflow the section
              pointerEvents: "none",
            }}
          >
            <Image
              src="https://www.oruphones.com/assets/Footer/advertisement.svg"
              alt="ORUphones App Preview"
              width={500}
              height={500}
              className="
                w-full max-w-md lg:max-w-lg xl:max-w-xl
                drop-shadow-2xl
                rounded-4xl
                transition-transform duration-300
                md:-mt-4
                md:translate-y-4
                md:translate-x-20
                lg:-mt-52
                lg:translate-y-4
                lg:translate-x-2
              "
              style={{
                zIndex: 2,
              }}
            />
            
        </div>
        </div>
        </div>
    </section>
  );
}
