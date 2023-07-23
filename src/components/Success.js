import React from "react";
import "./Success.css";
import Header from "./createOrder/Header";

const Success = () => {
  return (
    <div>
      <Header />
      <div className="success">
        <p className="fonts"> TEBRİKLER ! </p>

        <p className="fonts"> SİPARİŞİNİZ ALINDI ! </p>
      </div>
    </div>
  );
};

export default Success;
