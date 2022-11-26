import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";

const SeguimientoPedidoComponent = (props) => {
  useEffect(() => {
    getEstadoPedido();
  }, []);
  const toHome = () => {
    window.location.href = "/";
  };

  const idPedido = sessionStorage.getItem("idPedido");

  const [infoPedido, setPedido] = useState({});

  const getUrl = "http://localhost:8000/api/pedido/" + idPedido;

  const getEstadoPedido = async () => {
    await axios
      .get(getUrl)
      .then(function (response) {
        console.log(response)
        setPedido(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    console.log(idPedido);
  };
  return (
    <div className="datosDelRestaurante">
      <div style={{ position: "absolute", top: "70px" }}>
        <br />
        <h1 className="datosDelRestaurante">Estado de su pedido</h1>
        <br />
        <br />
        <h1 className="datosDelRestaurante">Id de su pedido: {idPedido}</h1>
        <h1 className="datosDelRestaurante">Estado: {infoPedido.estado}</h1>
        <div className="datosDelRestaurante">
          <Button variant="primary" onClick={() => toHome()}>
            Volver al home
          </Button>
        </div>
        <br />{" "}
      </div>{" "}
    </div>
  );
};

export default SeguimientoPedidoComponent;
