import "../global.css";

const FilterSideBar = () => {
  return (
    <aside className="w-full h-full pb-20 p-4 border-r border-gray-300 bg-white flex flex-col flex-grow overflow-y-auto pr-1">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      
      {/* Brand Filter */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Brand</h3>
        {["Apple", "Samsung", "OnePlus", "Xiaomi", "Realme"].map((brand) => (
          <div key={brand} className="flex items-center mb-1">
            <input type="checkbox" id={brand} name="brand" className="mr-2" />
            <label htmlFor={brand} className="cursor-pointer">{brand}</label>
          </div>
        ))}
      </div>
      
      {/* Price Range */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Price</h3>
        {[
          "Under ₹10,000",
          "₹10,000 - ₹30,000",
          "₹30,000 - ₹60,000",
          "Above ₹60,000",
        ].map((range, idx) => (
          <div key={idx} className="flex items-center mb-1">
            <input type="radio" id={`price-${idx}`} name="price" className="mr-2" />
            <label htmlFor={`price-${idx}`} className="cursor-pointer">{range}</label>
          </div>
        ))}
      </div>
      
      {/* RAM */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">RAM</h3>
        {["4 GB", "6 GB", "8 GB", "12 GB+"].map((ram) => (
          <div key={ram} className="flex items-center mb-1">
            <input type="checkbox" id={ram} name="ram" className="mr-2" />
            <label htmlFor={ram} className="cursor-pointer">{ram}</label>
          </div>
        ))}
      </div>
      
      {/* Storage */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Storage</h3>
        {["64 GB", "128 GB", "256 GB", "512 GB"].map((storage) => (
          <div key={storage} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={storage}
              name="storage"
              className="mr-2"
            />
            <label htmlFor={storage} className="cursor-pointer">{storage}</label>
          </div>
        ))}
      </div>
      
      {/* Condition */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Condition</h3>
        {["New", "Used", "Refurbished"].map((cond, idx) => (
          <div key={cond} className="flex items-center mb-1">
            <input type="radio" id={`condition-${idx}`} name="condition" className="mr-2" />
            <label htmlFor={`condition-${idx}`} className="cursor-pointer">{cond}</label>
          </div>
        ))}
      </div>
      
      {/* Location */}
      <div className="mb-6">
        <h3 className="font-semibold mb-2">Location</h3>
        <select className="w-full border rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option value="">All Locations</option>
          {["Delhi", "Mumbai", "Bangalore", "Hyderabad", "Chennai"].map(
            (city) => (
              <option key={city} value={city}>
                {city}
              </option>
            )
          )}
        </select>
      </div>

      {/* Apply filters button */}
      <button className="w-full py-5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors duration-200 font-medium">
        Apply Filters
      </button>
    </aside>
  );
};

export default FilterSideBar;
