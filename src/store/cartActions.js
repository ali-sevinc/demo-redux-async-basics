import { URL } from "../helpers/consts";
import { replaceCart } from "./cartSlice";
import { setLoading, setNotification } from "./uiSlice";

//thunk functions
export function sendCartData(cartData) {
  return async function (dispatch) {
    dispatch(setLoading(true));
    dispatch(
      setNotification({
        status: "pending",
        title: "Sending..",
        message: "Sending cart data...",
      }),
    );

    async function sendingRequest() {
      const res = await fetch(URL + "/cart.json", {
        method: "PUT",
        body: JSON.stringify({
          cart: cartData.cart,
          totalAmount: cartData.totalAmount,
        }),
      });
      if (!res.ok) throw new Error("Sending cart data failed");
    }

    try {
      await sendingRequest();

      dispatch(
        setNotification({
          status: "success",
          title: "Success..",
          message: "Cart data successfully sent...",
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          status: "error",
          title: "Failed..",
          message: err.message,
        }),
      );
    } finally {
      dispatch(setLoading(false));
    }
  };
}

export function initialCartFetch() {
  return async function (dispatch) {
    async function fetchData() {
      const res = await fetch(URL + "/cart.json");
      if (!res.ok) throw new Error("Fetching cart data failed...");
      const data = await res.json();
      return data;
    }
    try {
      const cartData = await fetchData();
      if (!cartData) return;
      dispatch(
        replaceCart({
          cart: cartData.cart || [],
          totalAmount: cartData.totalAmount || 0,
        }),
      );
    } catch (err) {
      dispatch(
        setNotification({
          status: "error",
          title: "Failed..",
          message: err.message,
        }),
      );
    }
  };
}
