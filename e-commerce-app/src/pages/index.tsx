import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import dummyProducts from "../dummyProducts";
import FilterSideBar from "@/components/FilterSidebar";
import '../global.css'

type Product = {
    id: string;
    make: string;
    model: string;
    price: number;
    images: string[];
    seller: string;
    location: string;
    phoneNumber: number;
}

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow p-4">
        {/* Row 1: Links */}
        <section>
          <h2 className="text-lg font-bold mb-2">Quick Links</h2>
          <div className="flex flex-wrap gap-4">
            <a href="/category/Apple" className="text-blue-600 underline">Apple Phones</a>
            <a href="/category/Samsung" className="text-blue-600 underline">Samsung Phones</a>
            <a href="/admin" className="text-blue-600 underline">Admin Panel</a>
          </div>
        </section>

        {/* Row 2: Buttons */}
        <section>
          <h2 className="text-lg font-bold mb-2">Actions</h2>
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Sell a Phone</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Track Orders</button>
            <button className="px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-800">Customer Support</button>
          </div>
        </section>

        {/* Row 3: Cards */}
        <section>
          <h2 className="text-lg font-bold mb-4">Top Picks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {dummyProducts.slice(6, 16).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
