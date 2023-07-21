import React from "react";
import "./Success.css";
import Header from "./createOrder/Header";

const Success = () => {
  return (
    <div>
      <Header />
      <div className="success">
        <p> TEBRİKLER ! </p>

        <p> SİPARİŞİNİZ ALINDI ! </p>
      </div>
    </div>
  );
};

export default Success;
