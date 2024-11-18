import React, { useState } from "react";
import { format } from "date-fns";
import { useMediaQuery } from "react-responsive";
import AddProductForm from "../component/form/AddProductForm";
import CartTable from "../component/cart/CartTable";
import MobileTotalPrice from "../component/mobileTotalPrice/MobileTotalPrice";
import CartCards from "../component/cart/CartCards";

//Renderiza el carrito de compras y el formulario para agregar productos..............................................................
const Landing = ({ toast }) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );
  // Manejo el carrito manteniendo los productos en el local storge................................................................
  const [loading, setLoading] = useState(false);
  const cartCreationDate = localStorage.getItem("cartCreationDate") || null;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Realizo la petición a la API para obtener el producto y lo agrego al carrito.......................................................
  const addProductToCart = async (idProduct, cantidad) => {
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${idProduct}`
      );

      const product = await response.json();

      // Agrego un  producto nuevo al carrito...............................................................................................
      const newProduct = {
        ...product,
        quantity: parseInt(cantidad),
        totalPrice: parseInt(cantidad) * product.price,
      };

      setCart((prevCart) => {
        //Chequeo si el producto ya estaba en el carrito y sumo la cantidad nueva...............................................................
        const existingProductIndex = prevCart.findIndex(
          (p) => p.id === product.id
        );
        if (existingProductIndex !== -1) {
          const updatedCart = [...prevCart];
          // Obtengo el producto existente........................................................................................................
          const existingProduct = updatedCart[existingProductIndex];
          // Actualizo la cantidad (sumo) y precio total correctamente.....................................................................................
          existingProduct.quantity += parseInt(cantidad);
          existingProduct.totalPrice = existingProduct.quantity * product.price;

          toast.current.show({
            severity: "success",
            summary: "Agregado",
            detail: "Producto agregado correctamente al carrito",
            life: 3000,
          });
          localStorage.setItem("cart", JSON.stringify(updatedCart));
          return updatedCart;
        }

        toast.current.show({
          severity: "success",
          summary: "Agregado",
          detail: "Producto agregado correctamente al carrito",
          life: 3000,
        });
        if (!cartCreationDate)
          localStorage.setItem("cartCreationDate", new Date().toISOString());
        localStorage.setItem("cart", JSON.stringify([...prevCart, newProduct]));
        return [...prevCart, newProduct];
      });
    } catch (error) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "No existe un producto con ese ID",
        life: 3000,
      });
    }
  };

  // Funcion para aumentar la cantidad de productos en el carrito..........................................................................
  const incrementQuantity = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex((p) => p.id === product.id);
      if (productIndex !== -1) {
        updatedCart[productIndex].quantity += 1;
        updatedCart[productIndex].totalPrice =
          updatedCart[productIndex].quantity * product.price;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      return updatedCart;
    });
  };

  // Funcion para decrementar la cantidad de productos en el carrito........................................................................
  const decrementQuantity = (product) => {
    setCart((prevCart) => {
      const updatedCart = [...prevCart];
      const productIndex = updatedCart.findIndex((p) => p.id === product.id);
      if (productIndex !== -1 && updatedCart[productIndex].quantity > 1) {
        updatedCart[productIndex].quantity -= 1;
        updatedCart[productIndex].totalPrice =
          updatedCart[productIndex].quantity * product.price;
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      }
      if (updatedCart.length === 0) localStorage.removeItem("cartCreationDate");
      return updatedCart;
    });
  };

  // Funcion para eliminar un producto del carrito...............................................................................
  const deleteProduct = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((p) => p.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if (updatedCart.length === 0) localStorage.removeItem("cartCreationDate");
      return updatedCart;
    });
  };

  // Funcion para eliminar TODOS los productos del carrito........................................................................
  const cleanCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCreationDate");
  };

  return (
    <div className="landing-container flex flex-col border-4 border-brandblue-500 rounded-2xl justify-start items-center gap-4 px-4 w-full md:h-[720px] h-auto md:px-32">
      <AddProductForm
        onAddProduct={addProductToCart}
        setLoading={setLoading}
        loading={loading}
      />
      <div className="w-full">
        <h1 className="text-brandblue-500 text-sm md:text-lg md:px-4">
          {cartCreationDate
            ? `Carrito de compra: - Iniciado ${format(
                cartCreationDate,
                "dd/MM/yyyy HH:mm"
              )}`
            : "Carrito de compra: No iniciado."}
        </h1>
        {isMobile ? (
          <CartCards
            products={cart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            deleteProduct={deleteProduct}
            toast={toast}
            cleanCart={cleanCart}
          />
        ) : (
          <CartTable
            products={cart}
            loading={loading}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
            deleteProduct={deleteProduct}
            toast={toast}
            cleanCart={cleanCart}
          />
        )}
      </div>
      {isMobile && cart.length > 0 && (
        <MobileTotalPrice products={cart} cleanCart={cleanCart} toast={toast} />
      )}
    </div>
  );
};

export default Landing;
