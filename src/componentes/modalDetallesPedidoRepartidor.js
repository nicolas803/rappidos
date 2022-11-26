import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

function ModalDetallesPedidoRepartidor(props) {
  console.log("props: ", props);
  const [productos, setProductos] = useState([]);
  
  const optionsProductos = {
    method: "GET",
    url: `http://localhost:8000/api/detalle_Pedido/?pedido__id=${props.idPedido.id}`,
  };

  useEffect(() => {
    axios
      .request(optionsProductos)
      .then(function (response) {
        setProductos(response.data);
        console.log("data: ", productos);
      })
      .catch(function (error) {
        console.error(error);
      });
  },[]);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Pedido</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {productos.map((producto) => {
          return (
            <Card.Body>
              <Card.Title>{producto.nombre_producto}</Card.Title>
              <Card.Text>{producto.descripcion_producto}</Card.Text>
              <Card.Text>${producto.precio_venta}</Card.Text>
            </Card.Body>
          );
        })}
        <br />
        <br />
        <Card.Text><b>Restaurante: </b>{props.idPedido.direccion_restaurante}</Card.Text>
        <Card.Text><b>Cliente: </b>Antonio Varas 666</Card.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDetallesPedidoRepartidor;
