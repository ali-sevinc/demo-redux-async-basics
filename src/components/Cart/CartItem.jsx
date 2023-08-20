import { addItem, removeItem } from "../../store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";

function CartItem({ title, quantity, total, price, id }) {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  function handleAddItem() {
    dispatch(addItem({ id, price }));
  }
  function handleRemoveItem() {
    dispatch(removeItem(id));
  }

  return (
    <li className="mx-0 my-4 border border-blue-500 p-4  text-blue-500 ">
      <header className="flex items-baseline justify-between">
        <h3 className="m-0 mb-2 text-3xl ">{title}</h3>
        <div className="text-2xl font-bold">
          ${total.toFixed(2)}{" "}
          <span className="text-base font-normal italic ">
            (${price.toFixed(2)}/kg)
          </span>
        </div>
      </header>
      <div className="flex items-center justify-between">
        <div>
          x <span className="text-2xl font-bold ">{quantity}</span>
        </div>
        <div className="mx-0 my-2 flex justify-end">
          <Button disabled={isLoading} onClick={handleRemoveItem}>
            -
          </Button>
          <Button className="ml-2" disabled={isLoading} onClick={handleAddItem}>
            +
          </Button>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
