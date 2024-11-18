import React from "react";
import { ConfirmDialog } from "primereact/confirmdialog";
import CartCard from "./CartCard";

const CartCards = ({
  products,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  toast,
}) => {
  //Agrego padding cuando el carrito tiene productos.......................................................................
  const requirePadding = products.length > 0 ? "pb-12 mt-4" : "mt-4";

  //Renderizo como se verá el carrito.....................................................................................
  return (
    <div className={requirePadding}>
      <ConfirmDialog
        acceptClassName="bg-brandblue-500 text-white border border-brandblue-500 hover:bg-transparent hover:border-brandblue-500 hover:text-brandblue-500 active:bg-transparent active:border-brandblue-500 active:text-brandblue-500 px-4 py-2 rounded transition duration-200 ease-in-out h-10 font-semibold"
        rejectClassName="bg-transparent text-brandblue-500 border border-brandblue-500 hover:bg-transparent hover:border-brandblue-600 hover:text-brandblue-600 active:bg-transparent active:border-brandblue-500 active:text-brandblue-500 px-4 py-2 rounded transition duration-200 ease-in-out h-10 font-semibold"
      />

      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <CartCard
            key={product.id}
            product={product}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            deleteProduct={deleteProduct}
            toast={toast}
          />
        ))}
      </div>
    </div>
  );
};

export default CartCards;
