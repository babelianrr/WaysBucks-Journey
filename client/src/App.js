import { useContext, useEffect } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./context/userContext";

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import './index.css';

import Auth from "./pages/Auth";
import Product from "./pages/Product";
import DetailProduct from "./pages/DetailProduct";
import Cart from "./pages/Cart";
import Profile from "./pages/Profile";
import UpdateProfile from "./pages/UpdateProfile";
import Dashboard from "./pages/Dashboard";
import ProductAdmin from "./pages/ProductAdmin";
import CategoryAdmin from "./pages/CategoryAdmin";
import UpdateCategoryAdmin from "./pages/UpdateCategoryAdmin";
import AddCategoryAdmin from "./pages/AddCategoryAdmin";
import AddProductAdmin from "./pages/AddProductAdmin";
import UpdateProductAdmin from "./pages/UpdateProductAdmin";
import TransactionAdmin from "./pages/TransactionAdmin";
import AccTrxAdmin from "./pages/AccTrxAdmin";
import DecTrxAdmin from "./pages/DecTrxAdmin";

import { API, setAuthToken } from "./config/api";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  let history = useHistory();
  const [state, dispatch] = useContext(UserContext);
  console.clear();
  console.log(state);
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    if (!state.isLogin) {
      history.push("/auth");
    } else {
      if (state.user.role === "admin") {
        history.push("/product-admin");
      } else if (state.user.role === "customer") {
        history.push("/");
      }
    }
  }, [state]);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data.user;

      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <Switch>
      <Route exact path="/" component={Product} />
      <Route path="/auth" component={Auth} />
      <Route path="/product/:id" component={DetailProduct} />
      <Route path="/cart" component={Cart} />
      <Route path="/profile" component={Profile} />
      <Route path="/update-profile/:id" component={UpdateProfile} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/product-admin" component={ProductAdmin} />
      <Route path="/topping-admin" component={CategoryAdmin} />
      <Route path="/transaction-admin" component={TransactionAdmin} />
      <Route path="/update-topping/:id" component={UpdateCategoryAdmin} />
      <Route path="/add-topping" component={AddCategoryAdmin} />
      <Route path="/add-product" component={AddProductAdmin} />
      <Route path="/update-product/:id" component={UpdateProductAdmin} />
      <Route path="/acc-transaction/:id" component={AccTrxAdmin} />
      <Route path="/dec-transaction/:id" component={DecTrxAdmin} />
    </Switch>
  );
}

export default App;
