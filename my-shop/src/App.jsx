import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import React, { useState } from "react";
import Landing from "./pages/Landing";
import juantoposvg from "./assets/image/juantoposvg2.png";
import Navbar from "./component/navbar/Navbar";
import employed from "./assets/image/employed.png";
import "primeicons/primeicons.css";
import "./App.css";

function App() {
  const toast = React.useRef(null);
  const [visible, setVisible] = useState(false);
  return (
    <div className="bg-[#010114] flex flex-col gap-6 w-full min-h-screen h-full pb-10 pt-5 px-4 md:px-40 ">
      <Navbar />
      <Dialog
        header="Empleado del mes de Noviembre"
        visible={visible}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <img className="h-[600px]" src={employed} alt="logo" />
      </Dialog>
      <div className="flex flex-row justify-center md:justify-start items-center gap-4 w-full">
        <button onClick={() => setVisible(true)}>
          <img className="w-16" src={juantoposvg} alt="logo" />
        </button>
        <h1 className="text-3xl font-bold">Tienda - EL TOPO </h1>
      </div>
      <div className="flex flex-row h-full">
        <Toast ref={toast} />
        <Landing toast={toast} />
      </div>
    </div>
  );
}

export default App;
