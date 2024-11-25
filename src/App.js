import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Food from "./components/foods/foods";
import About from "./components/about/about";
import Order from "./components/order/order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Food />} />
        <Route path="/about" element={<About />} />
        <Route path="/order" element={<Order />} />
      </Routes>
    </Router>
  );
}

export default App;
