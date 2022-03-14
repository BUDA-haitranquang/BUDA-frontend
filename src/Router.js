import {
  ApolloClient,
  ApolloProvider,
  from,
  HttpLink,
  InMemoryCache,
  useMutation,
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
import { NEW_ACCESS_TOKEN } from "./graphQl/authentication/authMutations";
import CreateOrder from "./pages/createorder/CreateOrder";
import Customer from "./pages/Customer";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Ingredient from "./pages/Ingredient";
import Login from "./pages/Login";
import Product from "./pages/Product";
import ProductDetail from "./pages/ProductDetail";
import Staff from "./pages/Staff";
import StaffDetail from "./pages/StaffDetail";
import SignUp from "./pages/SignUp";
import Statistic from "./pages/Statistic";
import Supplier from "./pages/Supplier";
import FixCost from "./pages/FixedCost";
import FixCostBill from "./pages/FixedCostBill";
import Collation from "./pages/Collation";
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
    new HttpLink({ uri: "http://143.198.194.24:4000/" }),
  ]);

  const { jwt, isAuth, refreshJwt } = useSelector((state) => state.token);
  // const [newAccessToken] = useMutation(NEW_ACCESS_TOKEN);
  const dispatch = useDispatch();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${jwt}`,
      },
    };
  });

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
  });

  const PrivateRoute = ({ authed, ...routeProps }) =>
    authed === true ? <Route {...routeProps} /> : <Redirect to="/login" />;

  // const getNewAccessToken = () => {
  //   newAccessToken({
  //     variables: {
  //       token: refreshJwt,
  //     },
  //   })
  //     .then((res) => {
  //       const { accessToken, refreshToken } = res.data.newAccessToken;
  //       dispatch(addToken(accessToken));
  //       dispatch(addRefreshToken(refreshToken));
  //     })
  //     .catch((e) => {
  //       console.log(e);
  //     });

  //   setTimeout(getNewAccessToken, 60 * 2);
  // };

  // getNewAccessToken();

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <PrivateRoute
            authed={isAuth}
            exact path="/staff"
            component={Staff}
          />
          <PrivateRoute
            authed={isAuth}
            exact path="/staff/:id"
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
            path="/product/"
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
            path="/product/collation"
            component={Statistic}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/product/delete"
            component={Statistic}
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
          <PrivateRoute
            authed={isAuth}
            exact
            path="/cost/fixedCost"
            component={FixCost}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/cost/fixedcostBill"
            component={FixCostBill}
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
