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

const authLink = setContext((_, { headers }) => {
  // // get the authentication token from local storage if it exists
  // const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJidWRhdGVzdGVyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjE2MzgwMDgzOTMsInVzZXJJRCI6MiwiaWF0IjoxNjM3ODM1NTkzfQ.uzyuRkjd24xO7pksAmN5ios6YYh4b5v4ywcUmKo0INDqAWJVskKY7cQs1mEO-B9cg2oImPkZ4e46VBH93Da9Vw`,
    }
  }
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  // link: link,
  link: authLink.concat(link)
});

const AppRouter = () => {
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
          <Route exact path ='/ingredient' component={Ingredient}/>
          <Route exact path="/" component={Dashboard} />
          <Route path="*" component={Error} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};
export default AppRouter;
