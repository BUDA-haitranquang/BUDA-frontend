import React, { useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Supplier from "./pages/Supplier";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Error from "./pages/Error";
import SignUp from "./pages/SignUp";
import Statistic from "./pages/Statistic";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
import Ingredient from "./pages/Ingredient";
import { BrowserRouter as Router, Redirect, Switch, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { useSelector } from "react-redux";
import Staff from "./pages/Staff";
import StaffDetail from "./pages/StaffDetail";


const AppRouter = () => {
  const errorLink = onError(({ graphqlErrors, networkError }) => {
    if (graphqlErrors) {
      graphqlErrors.map(({ message, location, path }) => {
        alert(`Graphql error ${message}`);
      });
    }
  });

  const link = from([
    errorLink,
    new HttpLink({ uri: "http://143.198.194.24:4000/"}),
  ]);
  
  const {jwt} = useSelector(state => state.token)
  
  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${jwt}`,
      }
    }
  });
  
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link)
  });

  const {isAuth} = useSelector((state) => state.token);

  const PrivateRoute = ({authed, ...routeProps }) => (
    authed === true
      ? <Route {...routeProps} />
      : <Redirect to="/login"/>
  )
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <PrivateRoute authed={isAuth} exact path="/product" component={Product} />
          <PrivateRoute authed={isAuth} exact path="/product/:id" component={ProductDetail} />
          <PrivateRoute authed={isAuth} exact path="/ingredient" component={Ingredient} />
          <PrivateRoute authed={isAuth} exact path="/supplier" component={Supplier} />
          <PrivateRoute authed={isAuth} exact path="/statistic" component={Statistic} />
          <PrivateRoute authed={isAuth} exact path="/customer" component={Customer} />
          <PrivateRoute authed={isAuth} exact path="/staff" component={Staff} />
          <PrivateRoute authed={isAuth} exact path="/staff/:id" component={StaffDetail} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute authed={isAuth} exact path="/" component={Dashboard} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};
export default AppRouter;
