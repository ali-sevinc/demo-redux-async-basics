import CartButton from "../Cart/CartButton";

function MainHeader() {
  return (
    <header className="flex h-20 w-full items-center justify-between bg-stone-800 px-[10%] py-0">
      <h1 className="text-3xl font-extrabold text-white">ReduxCart</h1>
      <nav>
        <ul className="m-0 list-none p-0">
          <li>
            <CartButton />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default MainHeader;
