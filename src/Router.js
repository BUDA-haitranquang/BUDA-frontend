import React from "react";
import Dashboard from "./pages/Dashboard";
import Customer from "./pages/Customer";
import Supplier from "./pages/Supplier";
import Product from "./pages/Product";
import Login from "./pages/Login";
import Error from "./pages/Error";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from '@apollo/client/link/context';
import Ingredient from './pages/Ingredient';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import { useSelector } from "react-redux";


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
  
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/product" component={Product} />
          <Route exact path="/product/:id" children={ProductDetail} />
          <Route exact path="/supplier" component={Supplier} />
          <Route exact path="/customer" component={Customer} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Dashboard} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};
export default AppRouter;
