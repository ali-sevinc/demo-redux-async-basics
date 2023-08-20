function OrderItem({ cart, total }) {
  const cartItems = cart.map((items) => {
    return {
      id: items.id,
      title: items.title,
      amount: items.amount,
    };
  });
  return (
    <li className="w-[20rem] border border-[#ccc] py-2">
      {cartItems.map((item) => (
        <div key={item.id} className="flex items-center justify-around">
          <div>
            <span>{item.title}</span> x <span>{item.amount}</span>
          </div>
        </div>
      ))}
      <p className="text-center">Total Price: ${total.toFixed(2)}</p>
    </li>
  );
}

export default OrderItem;
