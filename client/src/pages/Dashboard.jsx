import { useEffect, useState } from "react";
import axios from "axios";
 
function Dashboard() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
 
  const token = localStorage.getItem("token");
 
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/products",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      setProducts(res.data);
    };
 
    fetchProducts();
  }, []);
 
  // Add to cart
  const addToCart = (product) => {
    const existing = cart.find(p => p.id === product.id);
 
    if (existing) {
      setCart(cart.map(p =>
        p.id === product.id
          ? { ...p, quantity: p.quantity + 1 }
          : p
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };
 
  // Calculate total
  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
 
  // Checkout
  const handleCheckout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/bills",
        {
          customerName: "Walk-in Customer",
          items: cart.map(item => ({
            productId: item.id,
            quantity: item.quantity
          }))
        },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
 
      alert("Bill created successfully!");
      setCart([]);
 
    } catch (err) {
      alert(err.response?.data?.error || "Checkout failed");
    }
  };
 
  return (
    <div className="flex h-screen">
 
      {/* Products Section */}
      <div className="w-2/3 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">Products</h1>
 
        <div className="grid grid-cols-3 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              className="border p-4 rounded shadow cursor-pointer"
              onClick={() => addToCart(product)}
            >
              <h2 className="font-bold">{product.name}</h2>
              <p>₹ {product.price}</p>
            </div>
          ))}
        </div>
      </div>
 
      {/* Cart Section */}
      <div className="w-1/3 bg-gray-100 p-6">
        <h2 className="text-xl font-bold mb-4">Cart</h2>
 
        {cart.map(item => (
          <div key={item.id} className="flex justify-between mb-2">
            <span>
              {item.name} x {item.quantity}
            </span>
            <span>
              ₹ {item.price * item.quantity}
            </span>
          </div>
        ))}
 
        <hr className="my-4" />
 
        <h3 className="font-bold">
          Total: ₹ {total}
        </h3>
 
        <button
          onClick={handleCheckout}
          className="mt-4 w-full bg-black text-white p-2"
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
 
    </div>
  );
}
 
export default Dashboard;