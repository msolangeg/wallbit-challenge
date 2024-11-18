import React from "react";
import { formatCurrency } from "../../utils/helpers";
import { confirmDialog } from "primereact/confirmdialog";

//Función y Toast para confirmar si deseo eliminar TODOS los productos del carrito en versión Mobile...................................
const MobileTotalPrice = ({ products, cleanCart, toast }) => {
  const totalPrices = products.reduce(
    (total, product) => total + product.totalPrice,
    0
  );

  const accept2 = () => {
    cleanCart();
    toast.current.show({
      severity: "success",
      summary: "Eliminado",
      detail: "Productos eliminados correctamente",
      life: 3000,
    });
  };

  const reject = () => {};
  const confirm2 = () => {
    confirmDialog({
      message: "¿Estas seguro de eliminar todos los productos?",
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => accept2(),
      acceptLabel: "Eliminar",
      reject,
    });
  };


  //Rebderiza en versión mobile un footer con el total de los productos del carrito y un boton para limpiar el carrito..................................
  return (
    <div className="bg-[#242426] w-full p-4 fixed bottom-0 flex flex-row justify-between ">
      {" "}
      <div className="mt-4 text-right">
        <strong>Total: {formatCurrency(totalPrices)}</strong>
      </div>
      <button
        onClick={() => confirm2()}
        className="bg-brandblue-500 text-white font-bold py-2 px-4 rounded"
      >
        Eliminar carrito
      </button>
    </div>
  );
};

export default MobileTotalPrice;
