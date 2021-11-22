import React from "react";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Supplier from "./pages/Supplier";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Error from "./pages/Error";
import Ingredient from './pages/Ingredient';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
const AppRouter = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/product" component={Product} />
        <Route exact path="/product/:id" children={ProductDetail} />
        <Route exact path="/supplier" component={Supplier} />
        <Route exact path="/customer" component={Customer} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/" component={Dashboard} />
        <Route exact path="/ingredient" component={Ingredient} />
        <Route path="*" component={Error} />
      </Switch>
    </Router>
  );
};
export default AppRouter;
