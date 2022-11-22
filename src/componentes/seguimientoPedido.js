import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const SeguimientoPedidoComponent = () => {
    const toHome = () => {
        window.location.href ="/";
    }
  return (
    <>
      <br />
      <h1 className="datosDelRestaurante">Estado de su pedido</h1>
      <br />
      <br />
      <h1 className="datosDelRestaurante">OK</h1>
      <div className="datosDelRestaurante">
        <Button variant="primary" onClick={() => toHome()}>
          Volver al home
        </Button>
      </div>
      <br />    </>
  );
};

export default SeguimientoPedidoComponent;
