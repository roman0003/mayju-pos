import { useEffect, useState } from "react";
import axios from "axios";
 
function Dashboard() {
  const [products, setProducts] = useState([]);
 
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem("token");
 
        const res = await axios.get(
          "http://localhost:5000/api/products",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
 
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
 
    fetchProducts();
  }, []);
 
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">
        Products
      </h1>
 
      <div className="grid grid-cols-3 gap-4">
        {products.map(product => (
          <div 
            key={product.id}
            className="border p-4 rounded shadow"
          >
            <h2 className="font-bold">{product.name}</h2>
            <p>₹ {product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
 
export default Dashboard;
