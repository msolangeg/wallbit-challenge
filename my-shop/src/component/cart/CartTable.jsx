import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Image } from "primereact/image";
import { formatCurrency } from "../../utils/helpers";
import QuantityButtons from "./QuantityButtons";

const CartTable = ({
  products,
  loading,
  incrementQuantity,
  decrementQuantity,
  deleteProduct,
  toast,
  cleanCart,
}) => {
  //Template image de primereact...............................................................
  const imageBodyTemplate = (product) => {
    return (
      <Image
        src={product.image}
        alt={product.title}
        className="w-2rem h-2rem"
        preview
      />
    );
  };
  //Calculo el total price de los productos......................................................
  const totalPrices = products.reduce(
    (total, product) => total + product.totalPrice,
    0
  );

  //Limpia el carrito de TODOS los productos y muestra el toast.................................................
  const accept2 = () => {
    cleanCart();
    toast.current.show({
      severity: "success",
      summary: "Eliminado",
      detail: "Productos eliminados correctamente",
      life: 3000,
    });
  };

  //Elimna el producto y muestra el toast.......................................................................
  const accept = (product) => {
    deleteProduct(product);
    toast.current.show({
      severity: "success",
      summary: "Eliminado",
      detail: "Producto eliminado correctamente",
      life: 3000,
    });
  };

  //Cierra el toast al presionar No...........................................................
  const reject = () => {};

  //Toast para confirmar si deseo eliminar UN solo producto del carrito.......................
  const confirm1 = (product) => {
    confirmDialog({
      message: "¿Estas seguro de eliminar el producto?",
      header: "Confirmación",
      icon: "pi pi-exclamation-triangle",
      defaultFocus: "accept",
      accept: () => accept(product),
      acceptLabel: "Eliminar",
      reject,
    });
  };

  //Toast para confirmar si deseo eliminar TODOS los productos del carrito...................
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

  //Muestra el mensaje de carrito vacio en el lugar donde renderizara el carrito...........................................................
  const emptyMessage = () => {
    if (loading) {
      return (
        <div className="flex flex-col justify-center items-center p-2 text-center gap-6 w-full bg-red-500">
          <i className="pi pi-spin pi-spinner text-6xl text-brandblue-500 w-full" />
        </div>
      );
    }
    return (
      //Renderizo el mensaje de carrito vacio..............................................................................................
      <div className="flex flex-col justify-center items-center p-2 text-center gap-6">
        <p className="text-xl px-40">
          Aún no has agregado productos al carrito.
          <br /> ¡Añade algunos para comenzar, utilizando el ID del producto y
          tus conexiones astrales para averiguarlos!
        </p>
        <i className="pi pi-cart-arrow-down text-6xl text-brandblue-500" />
      </div>
    );
  };

  //Chequeo si hay productos en el carrito y muestro el precio total....................................................................
  const totalPriceRender = () => {
    if (products.length === 0) {
      return null;
    }
    return (
      <div className="w-40 p-2 text-center">
        <span className="mr-2">Total:</span>
        {formatCurrency(totalPrices)}
      </div>
    );
  };

  //Calcula y renderiza la cantidad de productos en el carrito...........................................................................
  const quantityRender = (product) => {
    return (
      <div className="flex flex-row justify-center items-center w-20 p-2 text-center gap-4">
        {product.quantity}
        <QuantityButtons
          product={product}
          incrementQuantity={incrementQuantity}
          decrementQuantity={decrementQuantity}
          deleteProduct={deleteProduct}
        />
      </div>
    );
  };

  //Renderiza el boton para eliminar un producto del carrito............................................................................
  const renderDeleteButton = (product) => {
    return (
      <div className="flex flex-row justify-center items-center w-20 p-2 text-center gap-4">
        <i
          className="pi pi-times-circle h-6 w-6 hover:text-red-600 hover:cursor-pointer"
          onClick={() => confirm1(product)}
        />
      </div>
    );
  };

  //Chequeo si hay productos en el carrito y muestro el boton para eliminar todos los productos............................................
  const deleteAllRender = () => {
    if (products.length === 0) {
      return null;
    }
    return (
      <div className="flex flex-row justify-center items-center p-2 text-center gap-4 w-fit">
        <Button
          label="Eliminar carrito"
          className=" hover:text-red-600 hover:cursor-pointer"
          onClick={() => confirm2()}
        />
      </div>
    );
  };

  //Renderiza la tabla de productos en el carrito...................................................................................
  return (
    <div className="card w-full">
      <ConfirmDialog
        acceptClassName="bg-brandblue-500 text-white border border-brandblue-500 hover:bg-transparent hover:border-brandblue-500 hover:text-brandblue-500 active:bg-transparent active:border-brandblue-500 active:text-brandblue-500 px-4 py-2 rounded transition duration-200 ease-in-out h-10 font-semibold"
        rejectClassName="bg-transparent text-brandblue-500 border border-brandblue-500 hover:bg-transparent hover:border-brandblue-600 hover:text-brandblue-600 active:bg-transparent active:border-brandblue-500 active:text-brandblue-500 px-4 py-2 rounded transition duration-200 ease-in-out h-10 font-semibold"
      />
      <DataTable
        className="p-4 rounded-3xl min-h-56 w-full"
        value={products}
        emptyMessage={emptyMessage}
        scrollable
        scrollHeight="500px"
        stripedRows
        style={{ minWidth: "100%" }}
        loading={loading}
      >
        <Column
          className="p-2"
          field="quantity"
          header="Cant."
          body={(row) => quantityRender(row)}
        />
        <Column className="p-2" field="title" header="Producto" />

        <Column
          className="w-40 p-2 text-center"
          field="price"
          header="Precio Unit."
          body={(product) => formatCurrency(product.price)}
        />
        <Column
          className="w-40 p-2 text-center"
          field="totalPrice"
          header="Precio Total"
          body={(product) => formatCurrency(product.totalPrice)}
          footer={totalPriceRender}
        />
        <Column
          className="w-20 p-2 "
          header="Imagen"
          body={imageBodyTemplate}
        />
        <Column
          className="w-auto h-full p-2 flex flex-row justify-center items-center"
          header="Acciones"
          body={(product) => renderDeleteButton(product)}
          footer={deleteAllRender}
        />
      </DataTable>
    </div>
  );
};

export default CartTable;
