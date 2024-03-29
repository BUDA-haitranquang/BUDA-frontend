import React from "react";
import { LayoutOptions } from "../layouts";

export const routes = [
  {
    path: "/staff",
    exact: true,
    component: React.lazy(() => import("src/pages/Staff")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/staff/:id",
    exact: true,
    component: React.lazy(() => import("src/pages/StaffDetail")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/note",
    exact: true,
    component: React.lazy(() => import("src/pages/StaffNote")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/account",
    exact: true,
    component: React.lazy(() => import("src/pages/MyAccount")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/dashboard/buy",
    exact: true,
    component: React.lazy(() => import("src/pages/Dashboard")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/product",
    exact: true,
    component: React.lazy(() => import("src/pages/Product")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/product/combo",
    exact: true,
    component: React.lazy(() => import("src/pages/ProductCombo")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/product/collation",
    exact: true,
    component: React.lazy(() => import("src/pages/Collation")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/product/delete",
    exact: true,
    component: React.lazy(() =>
      import("src/pages/sellorder/List/SellOrderList")
    ),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/product/:id",
    exact: true,
    component: React.lazy(() => import("src/pages/ProductDetail")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/ingredient/collation",
    exact: true,
    component: React.lazy(() =>
      import("src/pages/collation/IngredientCollation")
    ),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/ingredient/collation",
    exact: true,
    component: React.lazy(() =>
      import("src/pages/collation/IngredientCollation")
    ),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/ingredient/detail",
    exact: true,
    component: React.lazy(() => import("src/pages/Ingredient")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/ingredient/:id",
    exact: true,
    component: React.lazy(() => import("src/pages/IngredientsDetail")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/supplier",
    exact: true,
    component: React.lazy(() => import("src/pages/Supplier")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/customer",
    exact: true,
    component: React.lazy(() => import("src/pages/Customer")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/buy-order",
    exact: true,
    component: React.lazy(() => import("src/pages/buyorder/list/BuyOrder")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/business/sell",
    exact: true,
    component: React.lazy(() => import("src/pages/createorder/CreateOrder")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/business/buy/:id",
    exact: true,
    component: React.lazy(() =>
      import("src/pages/buyorder/detail/DetailBuyOrder")
    ),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/statistic/customer",
    exact: true,
    component: React.lazy(() => import("src/pages/Statistic/SellOrderStats")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/statistic/business",
    exact: true,
    component: React.lazy(() => import("src/pages/Statistic/Retention")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/statistic/revenue",
    exact: true,
    component: React.lazy(() => import("src/pages/Statistic/Revenue")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/statistic/product",
    exact: true,
    component: React.lazy(() => import("src/pages/Statistic/Product")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/business/sell/:id",
    exact: true,
    component: React.lazy(() =>
      import("src/pages/sellorder/detail/SellOrderDetail")
    ),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/cost/fixed-cost",
    exact: true,
    component: React.lazy(() => import("src/pages/FixedCost")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/cost/fixed-cost-bill",
    exact: true,
    component: React.lazy(() => import("src/pages/FixedCostBill")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/cost/other-cost",
    exact: true,
    component: React.lazy(() => import("src/pages/OtherCost")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/business/sell-history",
    exact: true,
    component: React.lazy(() =>
      import("src/pages/sellorder/List/SellOrderList")
    ),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/business/buy",
    exact: true,
    component: React.lazy(() =>
      import("src/pages/buyorder/create/CreateBuyOrder")
    ),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/business/buy-history",
    exact: true,
    component: React.lazy(() => import("src/pages/buyorder/list/BuyOrder")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/discount",
    exact: true,
    component: React.lazy(() => import("src/pages/discount/list/Discount")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/discount/:id",
    exact: true,
    component: React.lazy(() =>
      import("src/pages/discount/detail/DetailDiscount")
    ),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "/signup",
    exact: true,
    component: React.lazy(() => import("src/pages/SignUp")),
    layout: LayoutOptions.BLANK,
    auth: true,
  },
  {
    path: "/login",
    exact: true,
    component: React.lazy(() => import("src/pages/Login")),
    layout: LayoutOptions.BLANK,
    auth: true,
  },
  {
    path: "/print",
    exact: true,
    component: React.lazy(() => import("src/pages/PrintDemo")),
    layout: LayoutOptions.BLANK,
    auth: true,
  },
  {
    path: "/plan",
    exact: true,
    component: React.lazy(() => import("src/pages/Plans")),
    layout: LayoutOptions.BLANK,
    auth: true,
  },
  {
    path: "/dashboard",
    exact: true,
    component: React.lazy(() => import("src/pages/Dashboard")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
  {
    path: "*",
    exact: false,
    component: React.lazy(() => import("src/pages/Dashboard")),
    layout: LayoutOptions.MAIN,
    auth: false,
  },
];
