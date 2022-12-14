import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

function ModalPagos(props) {
  const [show, setShow] = useState(false);

  const productosCarrito = JSON.parse(
    JSON.parse(sessionStorage.getItem("pedidos"))
  );
  async function postPedido() {
    let infoPedido = {
      estado: "OK",
      restaurante: 1,
      cliente: 1,
      delivery: 1,
    };

    let data;
    let res = await axios
      .post("http://localhost:8000/api/pedido/", infoPedido)
      .then((response) => {
        console.log(response);
        data = response;
      })
      .catch((error) => {
        console.log(error);
        data = error;
      });
    console.log(data);
  }

  async function postProdu() {
    let data;
    console.log("LOG PRODUCtos", productosCarrito);
    productosCarrito.map(async (productoDelCarrito) => {
      console.log("carro", productoDelCarrito);
      let resProd = await axios
        .post("http://localhost:8000/api/detalle_Pedido/", productoDelCarrito)
        .then((response) => {
          console.log(response);
          data = response;
        })
        .catch((error) => {
          console.log(error);
          data = error;
        });
      console.log(data);
    });
  }
  const pagar = () => {
    postPedido();
    postProdu();
    console.log("pagar");
    console.log("Lista de productos para el post: ", productosCarrito);

    setShow(true);
    //En productosCarrito esta la lista de productos
    //window.location.href = "/seguimientoPedido";
    //props.onHide();
  };

  const funcionPostPago = () => {
    //agregar codigo gay

    //
    setShow(false);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {!show ? (
        <>
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
            <p>El metodo de pago WebPay estar?? disponible proximamente. </p>
            <p>Por ahora prefiera el uso de efectivo.</p>
            <p>Muchas gracias.</p>
          </Modal.Body>
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Pagado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Se p??go se ha realizado correctamente.</p>
          </Modal.Body>
        </>
      )}
      <Modal.Footer>
        {show ? (
          <Button onClick={funcionPostPago}>Revisar estado</Button>
        ) : (
          <Button onClick={props.onHide}>Close</Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPagos;
