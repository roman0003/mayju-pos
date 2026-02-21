import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
 
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
 
  const handleLogin = async (e) => {
    e.preventDefault();
 
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
 
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
 
    } catch (err) {
      alert("Login failed");
    }
  };
 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form 
        onSubmit={handleLogin}
        className="bg-white p-8 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Mayju POS Login
        </h2>
 
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
 
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
 
        <button className="w-full bg-black text-white p-2">
          Login
        </button>
      </form>
    </div>
  );
}
 
export default Login;
