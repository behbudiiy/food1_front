import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import orderImg from "../../img/order img.jpg";
import { FaArrowLeft } from "react-icons/fa6";
import "./order.css";

const Order = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts, totalPrice } = location.state || {
    selectedProducts: [],
    totalPrice: 0,
  };

  return (
    <div className="order-page">
      <header className="order-header">
        {/* Back button navigatsiya uchun */}
        <button className="back-button" onClick={() => navigate(-1)}>
        <FaArrowLeft />
        </button>
        <h1>Test To'lash</h1>
      </header>

      <div className="order-summary">
        <div className="order-card">
          <img
            src={orderImg}
            alt="product"
            className="order-image"
          />
          <div className="order-info">
            <h2>Order #{Math.floor(Math.random() * 1000000000)}</h2>
            <p>{selectedProducts[0]?.description || "Perfect lunch"}</p>
            <span>{selectedProducts[0]?.brand || "Durger King"}</span>
          </div>
        </div>

        <div className="order-details">
          {selectedProducts.map((product) => (
            <div key={product._id} className="product-item">
              <span>{product.title} x{product.quantity}</span>
              <span>{(product.price * product.quantity).toFixed(2)} US$</span>
            </div>
          ))}
          <div className="product-item">
            <span>Free Delivery</span>
            <span>0,00 US$</span>
          </div>
        </div>

        <div className="order-total">
          <span>Jami</span>
          <span>{totalPrice.toFixed(2)} US$</span>
        </div>
      </div>

      <footer className="order-footer">
        <button className="pay-button">{totalPrice.toFixed(2)} US$ TO'LASH</button>
      </footer>
    </div>
  );
};

export default Order;
