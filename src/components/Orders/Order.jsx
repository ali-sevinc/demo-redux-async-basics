import { useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import { toggleOrder } from "../../store/uiSlice";
import { useDispatch } from "react-redux";
import { URL } from "../../helpers/consts";

import Card from "../UI/Card";
import OrderItem from "./OrderItem";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import Loader from "../UI/Loader";

function Order() {
  const dispatch = useDispatch();

  const [orders, setOrders] = useState([]);
  const { fetchData, isLoading, error } = useFirebase();

  useEffect(
    function () {
      async function getCart() {
        const res = await fetchData({}, URL + "/itemOrders.json");
        const resData = await res;
        const data = [];
        for (const key in resData) {
          data.push({
            id: key,
            total: resData[key].totalPrices,
            cart: resData[key].cart,
          });
        }
        setOrders(data);
      }
      getCart();
    },
    [fetchData],
  );

  function handleCloseOrder() {
    dispatch(toggleOrder());
  }

  return (
    <Modal onCloseModal={handleCloseOrder}>
      {isLoading && <Loader />}
      {!isLoading && error && (
        <p className="text-center text-red-500"> {error}</p>
      )}
      {!isLoading && !error && (
        <Card className="h-[30vh] max-w-[23rem] overflow-x-hidden overflow-y-scroll bg-white text-center">
          <h2 className="text-center text-xl">Order History</h2>
          <ul className="flex flex-col text-center ">
            {orders.map((item) => (
              <OrderItem key={item.id} cart={item.cart} total={item.total} />
            ))}
          </ul>
          <Button
            onClick={handleCloseOrder}
            className="mt-4 border-[#aaa] text-[#aaa] hover:border-[#555] hover:bg-[#555]"
          >
            Close
          </Button>
        </Card>
      )}
    </Modal>
  );
}

export default Order;
