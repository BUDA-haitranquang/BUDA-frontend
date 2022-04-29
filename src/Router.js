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
import Staff from "./pages/Staff";
import Discount from "./pages/Discount";
import StaffDetail from "./pages/StaffDetail";
import SignUp from "./pages/SignUp";
import Statistic from "./pages/Statistic";
import Supplier from "./pages/Supplier";
import BuyOrder from "./pages/buyorder/list/BuyOrder";
import CreateBuyOrder from "./pages/buyorder/create/CreateBuyOrder";
import DetailBuyOrder from "./pages/buyorder/detail/DetailBuyOrder";
import SellOrderStats from "./pages/SellOrderStats";
import FixCost from "./pages/FixedCost";
import FixCostBill from "./pages/FixedCostBill";
import Collation from "./pages/Collation";
import OtherCost from "./pages/OtherCost";
import SellOrderDetail from "./pages/sellorder/detail/SellOrderDetail";
import SellOrderList from "./pages/sellorder/list/SellOrderList";
import IngredientDetail from "./pages/IngerdientsDetail";
import TestMultiLanguage from "./pages/TestMultiLanguage";
import TestMultiLanguage2 from "./pages/TestMultiLanguage2";
import IngredientCollation from "./pages/collation/IngredientCollation";
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
    new HttpLink({ uri: "http://103.173.228.124:4000/" }),
  ]);

  const PrivateRoute = ({ authed, ...routeProps }) => {
    console.log(authed);
    return authed === true ? (
      <Route {...routeProps} />
    ) : (
      <Redirect to="/login" />
    );
  };

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
            path="/dashboard/buy"
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
            path="/product/collation"
            component={Collation}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/product/delete"
            component={SellOrderList}
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
            path="/ingredient/collation"
            component={IngredientCollation}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/ingredient/detail"
            component={Ingredient}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/ingredient/:id"
            component={IngredientDetail}
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
            path="/statistic/business"
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
            path="/business/sell"
            component={CreateOrder}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/buy-order"
            component={BuyOrder}
          />
         
          <PrivateRoute
            authed={isAuth}
            exact
            path="/business/buy/:id"
            component={DetailBuyOrder}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/statistic"
            component={SellOrderStats}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/business/sell/:id"
            component={SellOrderDetail}
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
          <PrivateRoute
            authed={isAuth}
            exact
            path="/cost/othercost"
            component={OtherCost}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/business/sell-history"
            component={SellOrderList}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/business/buy"
            component={CreateBuyOrder}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/business/buy-history"
            component={BuyOrder}
          />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/discount"
            component={Discount}
          />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <PrivateRoute
            authed={isAuth}
            exact
            path="/dashboard"
            component={Dashboard}
          />
          <PrivateRoute authed={isAuth} path="*" component={Dashboard} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
};
export default AppRouter;
