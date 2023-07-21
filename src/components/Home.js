import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import Header from "./createOrder/Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div className="menu-text">
        <p className="fonth"> KOD ACIKTIRIR </p>
        <p className="fonth"> PİZZA, DOYURUR </p>
        <Link to="/pizza">
          <button id="order-pizza" type="button" className="homepage-button">
            ACCIKTIM
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
