import React from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import OrderForm from "./components/createOrder/OrderForm";
import Success from "./components/Success";

const App = () => {
  return (
    <div>
      <nav>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/pizza">
            <OrderForm />
          </Route>
          <Route path="/siparisonayi">
            <Success />
          </Route>
        </Switch>
      </nav>
    </div>
  );
};
export default App;
