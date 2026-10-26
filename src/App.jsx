
import React, { useEffect, useState } from "react";

const App = () => {
  const [products, setProducts] = useState([]);
  const [searchProduct, setSearchProduct] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Fetch products once
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");

        if (!res.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await res.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
      } catch (err) {
        console.error("Error:", err.message);
      }
    };

    fetchData();
  }, []);

  // Debounce search input by 2 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(searchProduct);
    },100);

    return () => clearTimeout(timeout);
  }, [searchProduct]);

  // Filter products after debounce
  useEffect(() => {
    const query = debouncedSearch.toLowerCase().trim();

    const arr = products.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    setFilteredProducts(arr);
  }, [debouncedSearch, products]);

  return (
    <div>
      <input
        value={searchProduct}
        onChange={(e) => setSearchProduct(e.target.value)}
        className="p-2 m-4 w-96 border rounded"
        type="text"
        placeholder="Search Product..."
      />

      <div className="ml-4 text-xl h-64 w-96 overflow-y-auto">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <h1 className="bg-gray-200 p-2 hover:bg-gray-400 cursor-pointer">
              {product.title}
            </h1>
          </div>
        ))}

        {filteredProducts.length === 0 && (
          <p className="p-2 text-gray-500">No products found.</p>
        )}
      </div>
    </div>
  );
};

export default App;
