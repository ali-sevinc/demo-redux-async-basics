import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleOrder } from "./store/uiSlice";
import { initialCartFetch, sendCartData } from "./store/cartActions";

import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import Order from "./components/Orders/Order";
import Button from "./components/UI/Button";
import Notification from "./components/UI/Notification";

function App() {
  const isCartShown = useSelector((state) => state.ui.isCartShown);
  const isOrderHistoryShown = useSelector(
    (state) => state.ui.isOrderHistoryShown,
  );
  const notifications = useSelector((state) => state.ui.notifications);

  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  useEffect(
    function () {
      dispatch(initialCartFetch());
    },
    [dispatch],
  );

  useEffect(
    function () {
      if (cart.isChanged) {
        dispatch(sendCartData(cart));
      }
    },
    [cart, dispatch],
  );

  function handleShowOrder() {
    dispatch(toggleOrder());
  }

  return (
    <>
      {notifications && (
        <Notification
          status={notifications.status}
          title={notifications.title}
          message={notifications.message}
        />
      )}
      <Layout>
        {isCartShown && <Cart />}
        <Products />
        {isOrderHistoryShown && <Order />}
        <Button onClick={handleShowOrder} className="fixed bottom-10 right-5">
          Show Order History
        </Button>
      </Layout>
    </>
  );
}

export default App;
