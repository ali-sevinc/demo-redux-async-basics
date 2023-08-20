import { useDispatch, useSelector } from "react-redux";
import useFirebase from "../../hooks/useFirebase";
import { clearCart } from "../../store/cartSlice";
import { toggleCart } from "../../store/uiSlice";
import { URL } from "../../helpers/consts";

import Button from "../UI/Button";
import Card from "../UI/Card";
import Loader from "../UI/Loader";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";

function Cart() {
  const { error, isLoading, fetchData } = useFirebase();
  const dispatch = useDispatch();
  const loadingAction = useSelector((state) => state.ui.isLoading);

  function handleCloseCart() {
    dispatch(toggleCart());
  }
  const cart = useSelector((state) => state.cart.cart);
  const totalPrices = cart.reduce(
    (cur, item) => cur + item.price * item.amount,
    0,
  );

  async function handleOrder() {
    await fetchData(
      { method: "POST", body: JSON.stringify({ cart, totalPrices }) },
      URL + "/itemOrders.json",
    );
    if (error) return;
    dispatch(clearCart());
    await fetchData(
      { method: "PUT", body: JSON.stringify({ cart: [], totalAmount: 0 }) },
      URL + "/cart.json",
    );
    handleCloseCart();
  }

  if (isLoading) return <Loader />;
  if (!isLoading && error)
    return <p className="text-center text-red-400">Something went wrong!</p>;

  return (
    <Modal onCloseModal={handleCloseCart}>
      <Card className="max-h-96 max-w-[100%] overflow-scroll overflow-x-hidden bg-white text-black">
        {cart.length === 0 && (
          <h3 className="my-4 text-center">There is no item in your cart</h3>
        )}
        {cart.length > 0 && (
          <>
            <h2 className="mx-0 my-2 text-center text-2xl font-semibold text-blue-500">
              Your Shopping Cart
            </h2>
            <ul className="m-0 list-none p-0 ">
              {cart.map((item) => (
                <CartItem
                  id={item.id}
                  key={item.id}
                  title={item.title}
                  quantity={item.amount}
                  total={item.price * item.amount}
                  price={item.price}
                />
              ))}
            </ul>
            <p className="text-right text-blue-400">
              Total Prices: ${totalPrices.toFixed(2)}
            </p>
            <div className="mt-4 text-right">
              <Button
                disabled={loadingAction}
                className="mr-4"
                onClick={handleCloseCart}
              >
                Close
              </Button>
              <Button disabled={loadingAction} onClick={handleOrder}>
                Order
              </Button>
            </div>
          </>
        )}
        {cart.length === 0 && (
          <Button className="mr-4 " onClick={handleCloseCart}>
            Close
          </Button>
        )}
      </Card>
    </Modal>
  );
}

export default Cart;
