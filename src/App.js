import "./App.css";
import NavbarComponent from "./componentes/navbar";
import RestauranteComponent from "./componentes/restaurante";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";

const App = () => {
  return (
    <>
      <NavbarComponent />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RestauranteComponent />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
