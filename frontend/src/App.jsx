import React, { Suspense, lazy } from "react";

import { Route, Routes } from "react-router-dom";

import "./App.css";
import FloatChat from "./components/common/floatMessage/FloatChat";
import PrivateRoute from "./routes/PrivateRoute";
import Wishlist from "./components/modules/Whishlist";
import Cart from "./components/modules/Cart";
import ProductList from "./components/modules/ProductList";
import DeliveryPersonOrderDetail from "./components/modules/Dashboard/DeliveryOrderDetail";
import ProductListTable from "./components/modules/Dashboard/ProductList";
import ProductDetailMerchant from "./components/modules/Dashboard/ProductDetailMerchant";
import CustomerOrderList from "./components/modules/CustomerOrderList";
import OrderDetail from "./components/modules/Dashboard/OrderDetail";
import Checkout from "./components/modules/Checkout";
import PaymentSuccess from "./components/common/PaymentSuccess";
import PaymentFailed from "./components/common/PaymentFailed";

// Lazy-loaded components
const Landing = lazy(() => import("./components/screens/landingPage/Landing"));
const Auth = lazy(() => import("./components/screens/auth/Login/Auth"));
const Vegitables = lazy(() =>
  import("./components/screens/Catagories/Vegitables")
);
const Fruits = lazy(() => import("./components/screens/Catagories/Fruits"));
const Spices = lazy(() => import("./components/screens/Catagories/Spices"));
const CartItems = lazy(() => import("./components/screens/cart/CartItems"));
const ProductDetail = lazy(() =>
  import("./components/screens/productDetail/ProductDetail")
);
const Signup_customer = lazy(() =>
  import("./components/screens/auth/signup/Signup_customer")
);
const Forgot = lazy(() => import("./components/screens/auth/Forget/Forgot"));
const Signup_merchant = lazy(() =>
  import("./components/screens/auth/signup/Signup_merchant")
);
const UserProfile = lazy(() =>
  import("./components/screens/auth/user/UserProfile")
);
const UserSettings = lazy(() =>
  import("./components/screens/auth/user/UserSettings")
);
const Logout = lazy(() => import("./components/screens/auth/user/Logout"));
const AddProduct = lazy(() =>
  import("./components/screens/merchant/AddProduct")
);
const ChatPage = lazy(() =>
  import("./components/common/floatMessage/ChatPage")
);
const SubscriptionPage = lazy(() =>
  import("./components/screens/Subscription/Subscription")
);
const AboutusPage = lazy(() =>
  import("./components/screens/aboutus/AboutusPage")
);
const Dashboard = lazy(() =>
  import("./components/modules/Dashboard/Dashboard")
);
const DeliveryOrderDetail = lazy(() =>
  import("./components/modules/Dashboard/OrderDetail")
);
const OrderList = lazy(() =>
  import("./components/modules/Dashboard/OrderList")
);
const DeliveryList = lazy(() =>
  import("./components/modules/Dashboard/DeliveryList")
);

const App = () => (
  <>
    <FloatChat />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signUp" element={<Auth />} />
        <Route path="/product" element={<ProductList />} />
        <Route path="/Vegitables" element={<Vegitables />} />
        <Route path="/Fruits" element={<Fruits />} />
        <Route path="/Spices" element={<Spices />} />
        <Route path="/CartItems" element={<CartItems />} />
        <Route path="/aboutus" element={<AboutusPage />} />
        <Route path="/Signup_customer" element={<Signup_customer />} />
        <Route path="/Forgot" element={<Forgot />} />
        <Route path="/Signup_merchant" element={<Signup_merchant />} />

        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/Cart" element={<Cart />} />

        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/UserSettings" element={<UserSettings />} />
        <Route path="/Logout" element={<Logout />} />
        <Route path="/AddProduct" element={<AddProduct />} />
        <Route path="/Chat" element={<ChatPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/Subscription" element={<SubscriptionPage />} />
        <Route path="/payment/success" element={<PaymentSuccess />} />
        <Route path="/payment/failed" element={<PaymentFailed />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/myorders"
          element={
            <PrivateRoute>
              <CustomerOrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="/myorders/:id"
          element={
            <PrivateRoute>
              <OrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <PrivateRoute>
              <OrderList />
            </PrivateRoute>
          }
        />
        <Route
          path="/myproducts"
          element={
            <PrivateRoute>
              <ProductListTable />
            </PrivateRoute>
          }
        />
        <Route
          path="/myproducts/:id"
          element={
            <PrivateRoute>
              <ProductDetailMerchant />
            </PrivateRoute>
          }
        />
        <Route
          path="/order/:id"
          element={
            <PrivateRoute>
              <DeliveryOrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/delivery-order/:id"
          element={
            <PrivateRoute>
              <DeliveryPersonOrderDetail />
            </PrivateRoute>
          }
        />
        <Route
          path="/delivery-list"
          element={
            <PrivateRoute>
              <DeliveryList />
            </PrivateRoute>
          }
        />
      </Routes>
    </Suspense>
  </>
);
export default App;
