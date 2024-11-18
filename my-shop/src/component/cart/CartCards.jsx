import React from "react";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import CartCard from "./CartCard";
import { formatCurrency } from "../../utils/helpers";

const CartCards = ({
  products,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  cleanCart,
}) => {

  const totalPrices = products.reduce(
    (total, product) => total + product.totalPrice,
    0
  );

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <CartCard
            key={product.id}
            product={product}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            deleteProduct={deleteProduct}
          />
        ))}
      </div>
      <div className="mt-4 text-right">
        <strong>Total: {formatCurrency(totalPrices)}</strong>
      </div>
    </div>
  );
};

export default CartCards;
