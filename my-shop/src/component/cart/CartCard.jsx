import { Button } from "primereact/button";
import { Image } from "primereact/image";
import React from "react";
import { formatCurrency } from "../../utils/helpers";
import { Accordion, AccordionTab } from "primereact/accordion";

const CartCard = ({
  product,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
}) => {
  return (
    <div
      key={product.id}
      className="card p-4 flex flex-col gap-4 justify-between rounded-lg bg-[#1C1C1E]"
    >
      <div className="flex flex-row justify-between items-center">
        <h3 className="text-md font-bold w-auto text-pretty">
          {product.title}
        </h3>
        <div className="flex flex-row w-18">
          <Button
            rounded
            icon="pi pi-trash"
            className="bg-transparent text-red-600 border border-red-600 h-6 w-6"
            onClick={() => deleteProduct(product)}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between items-center w-full gap-4">
        <div className="flex flex-col gap-4 w-3/4 self-end">
          <div className="flex-col ">
            <div className="flex flex-row gap-4 text-sm px-3 text-gray-400 font-semibold">
              <p> {product.quantity} x </p>
              <p> {formatCurrency(product.price)}</p>
            </div>
            <div className="flex justify-between w-full">
              <div className="flex gap-2">
                <Button
                  icon="pi pi-minus-circle"
                  onClick={() => decrementQuantity(product)}
                />
                <span className="mx-2">{product.quantity}</span>
                <Button
                  icon="pi pi-plus-circle"
                  onClick={() => incrementQuantity(product)}
                />
              </div>
              <p className="font-bold text-brandblue-500 text-base">
                {" "}
                {formatCurrency(product.totalPrice)}
              </p>
            </div>
          </div>
        </div>
        <div className="w-1/4">
          <Image
            src={product.image}
            alt={product.title}
            className="h-24 w-24 object-cover overflow-hidden"
            preview
          />
        </div>
      </div>
    </div>
  );
};

export default CartCard;
