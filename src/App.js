import "./App.css";
import NavbarComponent from "./componentes/navbar";
import RestauranteComponent from "./componentes/restaurante";
import CarritoComponent from "./componentes/carrito";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import SeguimientoPedidoComponent from "./componentes/seguimientoPedido";
import RestauranteAdminComponent from "./componentes/restauranteAdmin";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RestauranteComponent />} />
          <Route path="/carrito" element={<CarritoComponent />} />
          <Route path="/seguimientoPedido" element={<SeguimientoPedidoComponent />} />
          <Route path="/restauranteAdmin" element={<RestauranteAdminComponent />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
