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
import { useDispatch, useSelector } from "react-redux";
import { Suspense } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import routes, { RouteConfig } from "./configs/routes";
import { Layouts, LayoutType } from "./layouts";
import { addRefreshToken, addToken, removeToken } from "src/redux/tokenSlice";

interface Props {
  auth: Boolean;
  path: string;
  exact: any;
  render: any;
}

function App() {
  const filterRoutesAndPathsByLayout = (layout: LayoutType) => {
    const layoutRoutes = [] as RouteConfig[];
    const layoutPaths = [] as string[];

    if (routes) {
      routes.forEach((route: any) => {
        if (
          !(
            process.env.NODE_ENV === "production" && route.disableInProduction
          ) &&
          !route.redirect &&
          route.layout === layout
        ) {
          layoutRoutes.push(route);
          layoutPaths.push(route.path);
        }
      });
    }

    return { layoutRoutes, layoutPaths };
  };

  const filterRedirectRoutes = () => {
    let redirectRoutes = [] as RouteConfig[];
    if (routes) {
      redirectRoutes = routes.filter(
        (route: any) =>
          !(
            process.env.NODE_ENV === "production" && route.disableInProduction
          ) && route.redirect
      );
    }

    return redirectRoutes;
  };

  const redirectRoutes = filterRedirectRoutes();

  const { jwt, isAuth, refreshJwt } = useSelector((state: any) => state.token);
  const dispatch = useDispatch();

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        authorization: `Bearer ${jwt}`,
      },
    };
  });

  let countRetryGetToken = 0;
  const errorLink = onError(
    ({ graphQLErrors, networkError, operation, forward }) => {
      if (graphQLErrors) {
        for (let err of graphQLErrors) {
          if (err.extensions.code === "UNAUTHENTICATED") {
            if (countRetryGetToken > 3) {
              dispatch(removeToken());
              setTimeout((window as any).location.reload(), 0);
              window.location.reload();
            }
            countRetryGetToken++;

            getNewAccessToken().then(() => {
              const oldHeaders = operation.getContext().headers;
              operation.setContext({
                headers: {
                  ...oldHeaders,
                  authorization: `Bearer ${jwt}`,
                },
              });
            });

            return forward(operation);
          }
        }
      }

      if (networkError) console.log("NETWORK_ERROR_GRAPHQL");
    }
  );

  const link = from([
    errorLink,
    new HttpLink({
      uri: "http://103.173.228.124:4000/",
      // uri: "http://159.89.203.89:4000/",
    }),
  ]);

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
        dispatch(addToken(accessToken));
        dispatch(addRefreshToken(refreshToken));
        return accessToken;

        // dispatch(addRefreshToken(refreshToken));
      })
      .then(() => console.log("new access token generated"))
      .then(() => (countRetryGetToken = 0))
      .catch((e) => {
        console.log(e);
      });
  };

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: authLink.concat(link),
  });

  const CustomRoute = ({ auth, path, exact, render }: Props) => {
    return auth === true ? (
      <Route path={path} exact={exact} render={render} />
    ) : (
      <Redirect to="/login" />
    );
  };

  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Switch>
          {Object.keys(Layouts).map((layout: string, idx) => {
            const LayoutTag = Layouts[layout];
            const { layoutRoutes, layoutPaths } = filterRoutesAndPathsByLayout(
              layout as LayoutType
            );

            return (
              <Route key={idx} path={[...layoutPaths]}>
                <LayoutTag>
                  <Switch>
                    {layoutRoutes.map((route) => (
                      <CustomRoute
                        key={route.path}
                        path={route.path}
                        exact={route.exact === true}
                        auth={route.auth || isAuth}
                        render={(props: any) => {
                          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                          const Component = route.component!;
                          return (
                            <Suspense fallback={null}>
                              <Component {...props} />
                            </Suspense>
                          );
                        }}
                      />
                    ))}
                  </Switch>
                </LayoutTag>
              </Route>
            );
          })}

          {redirectRoutes.map((route) => (
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            <Redirect
              from={route.path}
              key={route.path}
              to={route.to!}
              exact={route.exact}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </ApolloProvider>
  );
}

export default App;