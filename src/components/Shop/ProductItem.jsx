import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../store/cartSlice";

import Button from "../UI/Button";
import Card from "../UI/Card";

function ProductItem({ title, price, description, id }) {
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();
  async function handleAddItem() {
    const item = {
      title,
      price,
      description,
      id,
      amount: 1,
    };

    dispatch(addItem(item));
  }
  return (
    <li>
      <Card>
        <header className="flex items-baseline justify-between ">
          <h3 className="mx-0 my-2">{title}</h3>
          <div className="round-[30px] rounded-md bg-stone-800 px-6 py-1 text-2xl text-white ">
            ${price.toFixed(2)}
          </div>
        </header>
        <p className="text-stone-500 ">{description}</p>
        <div className="flex justify-end">
          <Button
            className="w-36 border-stone-800 text-stone-800 hover:border-blue-300 hover:bg-blue-400"
            disabled={isLoading}
            onClick={handleAddItem}
          >
            {!isLoading ? "Add to Cart" : "Adding..."}
          </Button>
        </div>
      </Card>
    </li>
  );
}

export default ProductItem;
