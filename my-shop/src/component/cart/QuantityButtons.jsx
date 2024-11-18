import React from "react";

const QuantityButtons = ({
  product,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <i
        className="pi pi-plus-circle  h-6 w-6 hover:text-brandblue-400 hover:cursor-pointer"
        onClick={() => incrementQuantity(product)}
      />
      {product.quantity > 1 ? (
        <i
          className="pi pi-minus-circle h-6 w-6  hover:text-brandblue-400 hover:cursor-pointer"
          onClick={() => decrementQuantity(product)}
        />
      ) : (
        <i
          className="pi pi-times-circle h-6 w-6 hover:text-red-600 hover:cursor-pointer"
          onClick={() => deleteProduct(product)}
        />
      )}
    </div>
  );
};

export default QuantityButtons;
