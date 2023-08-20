import { useEffect, useState } from "react";
import useFirebase from "../../hooks/useFirebase";
import { URL } from "../../helpers/consts";

import ProductItem from "./ProductItem";
import Loader from "../UI/Loader";

function Products() {
  const [products, setProducts] = useState([]);
  const { error, isLoading, fetchData } = useFirebase();

  useEffect(
    function () {
      async function getCart() {
        const res = await fetchData({}, URL + "/items.json");
        const resData = await res;
        const data = [];
        for (const key in res) {
          data.push({
            id: resData[key].id,
            title: resData[key].title,
            price: resData[key].price,
            description: resData[key].description,
          });
        }
        setProducts(data);
      }
      getCart();
    },
    [fetchData],
  );

  if (isLoading) return <Loader />;
  if (!isLoading && error)
    return <p className="mt-20 text-center text-red-400">{error}</p>;

  return (
    <section>
      <h2 className="mx-auto my-8 text-center uppercase text-white">
        Buy your favorite products
      </h2>
      <ul className="mx-0 my-0 list-none">
        {products.map((item) => (
          <ProductItem
            id={item.id}
            key={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
          />
        ))}
      </ul>
    </section>
  );
}

export default Products;
