import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import "./about.css";

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedProducts } = location.state || { selectedProducts: [] };

  const totalPrice = selectedProducts.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const handlePayment = () => {
    navigate("/order", { state: { selectedProducts, totalPrice } });
  };

  const goBack = () => {
    navigate("/"); // food.js sahifasiga qaytish
  };

  return (
    <div className="about-page">
      <button className="about-back-button" onClick={goBack}>
      <FaArrowLeft />
      </button>
      <h2>Your Order</h2>
      <div className="about-order-list">
        {selectedProducts.map((product) => (
          <div key={product._id} className="about-order-item">
            <div className="about-order-image">{product.image}</div>
            <div className="about-order-info">
              <span className="about-order-name">
                {product.title} x{product.quantity}
              </span>
              <span className="about-order-description">
                {product.description || "No description available"}
              </span>
            </div>
            <div className="about-order-price">
              ${(product.price * product.quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="about-order-total">
        <span>Total:</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      <button className="about-pay-button" onClick={handlePayment}>
        PAY ${totalPrice.toFixed(2)}
      </button>
    </div>
  );
};

export default About;
