import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react"


function ModalDetallesPedido(props) {

  console.log("props: ", props)
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Pedido
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* {
          props.productos.map(producto => {
            return (
              <Card.Body>
                <Card.Title>{producto.nombre_producto}</Card.Title>
                <Card.Text>{producto.descripcion_producto}</Card.Text>
                <Card.Text>${producto.precio_venta_producto}</Card.Text>
              </Card.Body>
            )
          })
        } */}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDetallesPedido;
