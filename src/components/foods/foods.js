import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./foods.css";

const Food = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const navigate = useNavigate(); // Marshrutlash uchun

  // API'dan ma'lumotlarni olish
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/foods/");
        const data = await response.json();
        if (data.success) {
          setProducts(data.data);
        } else {
          console.error("Error fetching products:", data.message);
        }
      } catch (error) {
        console.error("Server error:", error);
      }
    };
    fetchProducts();
  }, []);

  // Savatga qo'shish
  const handleAddToCart = (id) => {
    setCart((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  // Savatdan chiqarish
  const handleRemoveFromCart = (id) => {
    setCart((prev) => {
      const updatedCart = { ...prev };
      if (updatedCart[id] > 1) {
        updatedCart[id] -= 1;
      } else {
        delete updatedCart[id];
      }
      return updatedCart;
    });
  };

  // VIEW ORDER tugmasini bosganda
  const handleViewOrder = () => {
    // Savatdan faqat olingan mahsulotlar
    const selectedProducts = products
      .filter((product) => cart[product._id])
      .map((product) => ({
        ...product,
        quantity: cart[product._id],
      }));

    // Agar savatda mahsulot bo'lmasa, xabar berish
    if (selectedProducts.length === 0) {
      alert("Please add items to the cart before proceeding.");
      return; // Bu yerda sahifaga o'tishni to'xtatamiz
    }

    // Aks holda, order sahifasiga o'tish
    navigate("/about", { state: { selectedProducts } });
  };

  return (
    <div className="app">
      <div className="products-grid">
        {products.map((product) => (
          <div key={product._id} className="product-card">
            <div className="product-image">{product.image}</div>
            <div className="product-info">
              <span className="product-name">{product.title}</span>
              <span className="product-price">${product.price.toFixed(2)}</span>
            </div>
            {cart[product._id] ? (
              <div className="product-actions">
                <button onClick={() => handleRemoveFromCart(product._id)}>-</button>
                <span>{cart[product._id]}</span>
                <button onClick={() => handleAddToCart(product._id)}>+</button>
              </div>
            ) : (
              <button
                className="add-button"
                onClick={() => handleAddToCart(product._id)}
              >
                ADD
              </button>
            )}
          </div>
        ))}
      </div>
      <button className="view-order" onClick={handleViewOrder}>
        VIEW ORDER
      </button>
    </div>
  );
};

export default Food;
