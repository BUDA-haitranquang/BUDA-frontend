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
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ProductDetail from "./pages/ProductDetail";
import GetProducts from "./api/GetProducts";

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
      authorization: `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJidWRhdGVzdGVyQGdtYWlsLmNvbSIsInJvbGVzIjpbeyJhdXRob3JpdHkiOiJVU0VSIn1dLCJleHAiOjE2Mzc1ODc2NzksInVzZXJJRCI6MiwiaWF0IjoxNjM3NDE0ODc5fQ.hGqbF8fiSSwSeWFcw_j_UBq8ikFV3wh70eh6wXE2JljnfAfVQbFmdIHK750rtV4MD0f6JiYKrdsfJauvumiiqw`,
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
      {/* <Router>
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
      </Router> */}
      <GetProducts />
    </ApolloProvider>
  );
};
export default AppRouter;
