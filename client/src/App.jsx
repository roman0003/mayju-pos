import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const shopName = import.meta.env.VITE_SHOP_NAME;

  return (
    <div className="bg-[#D4AF37] text-white p-4">
      <h1 className="text-3xl font-bold">{shopName} POS</h1>
    </div>

  );
}

export default App;
