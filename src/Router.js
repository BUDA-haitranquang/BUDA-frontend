import {
  ApolloClient,
  ApolloProvider,
  from,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { addRefreshToken, addToken } from "../src/redux/tokenSlice";
import CreateOrder from "./pages/createorder/CreateOrder";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Ingredient from "./pages/Ingredient";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import SignUp from "./pages/SignUp";
import Staff from "./pages/Staff";
import StaffDetail from "./pages/StaffDetail";
import Statistic from "./pages/Statistic";
import Supplier from "./pages/Supplier";

const AppRouter = () => {
  // const errorLink = onError(({ graphqlErrors, networkError }) => {
  //   if (graphqlErrors) {
  //     graphqlErrors.map(({ message, location, path }) => {
  //       alert(`Graphql error ${message}`);
  //     });
  //   }
  // });

  const { jwt, isAuth, refreshJwt } = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${jwt}`,
      },
    };
  });

  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          if (err.extensions.code === "UNAUTHENTICATED") {
            getNewAccessToken();
          }
        }
      }
    }
  );

  const link = from([
    errorLink,
    new HttpLink({ uri: "http://143.198.194.24:4000/" }),
  ]);

  const PrivateRoute = ({ authed, ...routeProps }) =>{
    console.log(authed);
    return authed === true ? <Route {...routeProps} /> : <Redirect to="/login" />;
  }
    

  const getNewAccessToken = async () => {
    return client
      .mutate({
        mutation: gql`
          mutation newAccessToken($token: String!) {
            newAccessToken(jwtSimple: { token: $token }) {
              accessToken
              refreshToken
            }
          }
        `,
        variables: { token: refreshJwt },
      })
      .then((res) => {
        const { accessToken, refreshToken } = res.data.newAccessToken;
        // return accessToken;
        dispatch(addToken(accessToken));
        // dispatch(addRefreshToken(refreshToken));
      })
      .then(() => console.log("new access token generated"))
      .catch((e) => {
        console.log(e);
      });
  };

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <PrivateRoute authed={isAuth} exact path="/staff" component={Staff} />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/staff/:id"
            component={StaffDetail}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/dashboard"
            component={Dashboard}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/product"
            component={Product}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/product/:id"
            component={ProductDetail}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/ingredient"
            component={Ingredient}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/supplier"
            component={Supplier}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/statistic"
            component={Statistic}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/customer"
            component={Customer}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/create-order"
            component={CreateOrder}
          />
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
