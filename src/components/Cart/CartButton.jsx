import { useDispatch, useSelector } from "react-redux";
import Button from "../UI/Button";
import { toggleCart } from "../../store/uiSlice";
function CartButton() {
  const cart = useSelector((state) => state.cart.cart);
  const totalNumberItem = cart.reduce((cur, item) => cur + item.amount, 0);

  const dispatch = useDispatch();

  function handleToggleCart() {
    dispatch(toggleCart());
  }
  return (
    <Button onClick={handleToggleCart} className="text-cyan-500">
      <span className="mx-2 my-0">My Cart</span>
      <span className="mx-2 my-0 rounded-[30px] bg-cyan-500 px-5 py-1 text-stone-900">
        {totalNumberItem}
      </span>
    </Button>
  );
}

export default CartButton;
