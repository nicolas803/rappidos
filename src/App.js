import "./App.css";
import NavbarComponent from "./componentes/navbar";
import RestauranteComponent from "./componentes/restaurante";
import CarritoComponent from "./componentes/carrito";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import SeguimientoPedidoComponent from "./componentes/seguimientoPedido";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RestauranteComponent />} />
          <Route path="/carrito" element={<CarritoComponent />} />
          <Route path="/seguimientoPedido" element={<SeguimientoPedidoComponent />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
