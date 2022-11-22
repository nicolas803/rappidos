import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

function ModalPagos(props) {
  const productosCarrito = JSON.parse(
    JSON.parse(sessionStorage.getItem("pedidos"))
  );
  async function postPedido() {
    let infoPedido = {
      "estado": "OK",
      'restaurante': 1,
      'cliente': 1,
      'delivery': 1
    }

    let res = await axios.post('http://localhost:8000/api/pedido/', infoPedido);
    let data = res.data;
    console.log('post');
  }
  const pagar = () => {


    postPedido();
    console.log("pagar")
    console.log("Lista de productos para el post: ", productosCarrito);


    //En productosCarrito esta la lista de productos
    window.location.href = "/seguimientoPedido";
    props.onHide()


  }
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Metodo de pago
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={pagar} method="POST">
          <FontAwesomeIcon icon={faMoneyBill1Wave} /> Efectivo
        </Button>
        <br />
        <br />
        <Button disabled>
          <FontAwesomeIcon icon={faCreditCard} /> WebPay
        </Button>
        <p>El metodo de pago WebPay estará disponible proximamente. </p>
        <p>Por ahora prefiera el uso de efectivo.</p>
        <p>Muchas gracias.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPagos;
