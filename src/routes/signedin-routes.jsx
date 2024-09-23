import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import About from "../pages/About/About";
import Products from "../pages/Products/Products";
import ProductsDetails from "../pages/ProductsDetails/ProductsDetails";
import ConsumerLayout from "../layouts/consumer-layout";
import AdvertiserLayout from "../layouts/advertiser-layout";
import CreateProduct from "../pages/CreateProduct/CreateProduct";
import OwnProducts from "../pages/OwnProducts/OwnProducts";
import FacebookCampaigns from "../pages/FacebookCampaings/FacebookCampaings";
import Subscription from "../pages/Subscription/Subscription";
import Profile from "../pages/Profile/Profile";

const defaultRoutes = [
  {
    path: "about",
    element: <About />,
  },
];

const consumerRouter = createBrowserRouter([
  {
    path: "/",
    element: <ConsumerLayout />,
    children: [
      ...defaultRoutes,
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "products/:id",
        element: <ProductsDetails />,
      },
      {
        path: "subscription",
        element: <Subscription />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

const advertiserRouter = createBrowserRouter([
  {
    path: "/",
    element: <AdvertiserLayout />,
    children: [
      ...defaultRoutes,
      {
        index: true,
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "products",
        element: <OwnProducts />,
      },
      {
        path: "products/create",
        element: <CreateProduct />,
      },
      {
        path: "products/edit/:id",
        element: <CreateProduct />,
      },
      {
        path: "products/:id",
        element: <ProductsDetails />,
      },
      {
        path: "publications/create",
        element: <FacebookCampaigns />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
]);

export default { consumerRouter, advertiserRouter };
