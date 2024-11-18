import React, { useState } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import "primereact/resources/themes/bootstrap4-dark-blue/theme.css";

const AddProductForm = ({ onAddProduct, setLoading, loading }) => {
  const [cantidad, setCantidad] = useState("");
  const [idProduct, setIdProduct] = useState("");

// Función para agregar un producto al carrito..........................................................
  const handleAddProduct = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAddProduct(idProduct, cantidad);
    setCantidad("");
    setIdProduct("");
    setLoading(false);
  };

  return (
    <form
      className="flex flex-col gap-4 w-full justify-between items-center md:items-end py-4 md:p-4 md:flex-row"
      onSubmit={(e) => handleAddProduct(e)}
    >
      <div className="flex flex-col gap-8  sm:gap-6 w-full">
        <h1 className="text-brandblue-500 text-sm md:text-lg">
          Agrega los productos al carro de compra:
        </h1>
        <div className="flex flex-col gap-20 w-full md:flex-row sm:gap-6">
          <FloatLabel>
            <InputText
              className="px-4 py-2 sm:w-full"
              id="cantidad"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
            />
            <label htmlFor="cantidad">Cantidad</label>
          </FloatLabel>
          <FloatLabel>
            <InputText
              className="px-4 py-2 sm:w-full"
              id="idProduct"
              value={idProduct}
              onChange={(e) => setIdProduct(e.target.value)}
            />
            <label htmlFor="idProduc">ID del producto</label>
          </FloatLabel>
        </div>
      </div>
      <div className="flex h-full w-full justify-end items-end">
        <Button
          className="bg-brandblue-500 text-white border border-brandblue-500 hover:bg-transparent hover:border-brandblue-500 hover:text-brandblue-500 active:bg-transparent active:border-brandblue-500 active:text-brandblue-500 px-4 py-2 rounded transition duration-200 ease-in-out h-10 font-semibold"
          label="Agregar"
          rounded
          disabled={!idProduct || !cantidad}
          loading={loading}
          icon="pi pi-cart-plus"
        />
      </div>
    </form>
  );
};

export default AddProductForm;
