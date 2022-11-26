import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const SeguimientoPedidoComponent = (props) => {
  const toHome = () => {
    window.location.href = "/";
  }

  const idPedido = sessionStorage.getItem("idPedido")

  const [infoPedido, setPedido] = useState({});

  const getUrl = 'http://localhost:8000/api/pedido/' + idPedido;

  axios.get(getUrl).then(function (response) {
    setPedido(response);
  }).catch(function (error) {
    console.error(error);
  });
  console.log(sessionStorage.getItem("idPedido"))
  return (
    <>
      <div style={{ position: "absolute", top: "70px" }}>
        <br />
        <h1 className="datosDelRestaurante">Estado de su pedido</h1>
        <br />
        <br />
        <h1 className="datosDelRestaurante">{idPedido}</h1>
        <h1 className="datosDelRestaurante">{infoPedido.estado}</h1>
        <div className="datosDelRestaurante">
          <Button variant="primary" onClick={() => toHome()}>
            Volver al home
          </Button>
        </div>
        <br /> </div>   </>
  );
};

export default SeguimientoPedidoComponent;
