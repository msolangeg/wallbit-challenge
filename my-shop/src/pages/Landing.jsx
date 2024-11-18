import React, { useState } from "react";
import AddProductForm from "../component/form/AddProductForm";
import CartTable from "../component/cart/CartTable";
import {format} from "date-fns";
import { useMediaQuery } from "react-responsive";
import "./landing.css";
import CartCards from "../component/cart/CartCards";

//Página principal que muestra el formulario y la tabla del carrito
const Landing = ({toast}) => {
  const [cart, setCart] = useState(
    localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart")) : []
  ); // Estado compartido para manejar los productos del carrito
  const [loading, setLoading] = useState(false);
  const cartCreationDate = localStorage.getItem("cartCreationDate") || null;
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // Función para agregar un producto al carrito
  const addProductToCart = async (idProduct, cantidad) => {
   
    try {
      const response = await fetch(
        `https://fakestoreapi.com/products/${idProduct}`
      );

      const product = await response.json();

      // Agregar el producto con la cantidad al carrito
      const newProduct = {
        ...product,
        quantity: parseInt(cantidad),
        totalPrice: parseInt(cantidad) * product.price,
      };

      
      setCart((prevCart) => {
        // Verificar si el producto ya está en el carrito
        const existingProductIndex = prevCart.findIndex(
          (p) => p.id === product.id
          );
          
          if (existingProductIndex !== -1) {
            const updatedCart = [...prevCart];
          
            // Obtener el producto existente
            const existingProduct = updatedCart[existingProductIndex];
          
            // Actualizar cantidad y precio total correctamente
            existingProduct.quantity += parseInt(cantidad); // Sumar solo la nueva cantidad
            existingProduct.totalPrice = existingProduct.quantity * product.price; // Recalcular el precio total
          
            toast.current.show({
              severity: 'success',
              summary: 'Agregado',
              detail: 'Producto agregado correctamente al carrito',
              life: 3000,
            });
            localStorage.setItem("cart", JSON.stringify(updatedCart));
            return updatedCart;
          }
        // Si no está en el carrito, agregarlo
        toast.current.show({severity:'success', summary: 'Agregado', detail:'Producto agregado correctamente al carrito', life: 3000});
        if(!cartCreationDate) localStorage.setItem("cartCreationDate", new Date().toISOString());
        localStorage.setItem("cart", JSON.stringify([...prevCart, newProduct]));

        return [...prevCart, newProduct];
      });
    } catch (error) {
      toast.current.show({severity:'error', summary: 'Error', detail:'No existe un producto con ese ID', life: 3000});
    }
  };

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
      if(updatedCart.length === 0) localStorage.removeItem("cartCreationDate");
      return updatedCart;
    });
  };

  const deleteProduct = (product) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((p) => p.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      if(updatedCart.length === 0) localStorage.removeItem("cartCreationDate");
      return updatedCart;
    });
  };

  const cleanCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
    localStorage.removeItem("cartCreationDate");
  };

  return (
    <div className="landing-container flex flex-col border-4 border-brandblue-500 rounded-2xl justify-start items-center gap-4 px-4 w-full md:h-[720px] h-auto md:px-32">
      <AddProductForm onAddProduct={addProductToCart} setLoading={setLoading} loading={loading} />
      <div className="w-full">
        <h1 className="text-brandblue-500 text-sm md:text-lg md:px-4">
          {cartCreationDate ? `Carrito de compra - Iniciado ${format(cartCreationDate, 'dd/MM/yyyy HH:mm')}` : "Carrito de compra"}
        </h1>
       {isMobile ? <CartCards products={cart} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} deleteProduct={deleteProduct} toast={toast} cleanCart={cleanCart}/> : <CartTable products={cart} loading={loading} incrementQuantity={incrementQuantity} decrementQuantity={decrementQuantity} deleteProduct={deleteProduct} toast={toast} cleanCart={cleanCart}/>}
      </div>
    </div>
  );
};

export default Landing;
