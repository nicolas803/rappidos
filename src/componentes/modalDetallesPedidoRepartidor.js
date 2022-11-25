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
  /* const productosCarrito = JSON.parse(
    JSON.parse(sessionStorage.getItem("pedidos"))
  );
  async function postPedido() {
    let infoPedido = {
      "estado": "OK",
      'restaurante': 1,
      'cliente': 1,
      'delivery': 1
    }

    let data
    let res = await axios.post('http://localhost:8000/api/pedido/', infoPedido).then((response) => {
      console.log(response);
      data = response
    })
      .catch((error) => {
        console.log(error);
        data = error
      });
    console.log(data);
  };

  async function postProdu() {
    let data
    console.log("LOG PRODUCtos", productosCarrito);
    productosCarrito.map(async (productoDelCarrito) => {
      console.log("carro", productoDelCarrito)
      let resProd = await axios.post('http://localhost:8000/api/detalle_Pedido/', productoDelCarrito).then((response) => {
        console.log(response);
        data = response
      })
        .catch((error) => {
          console.log(error);
          data = error
        });
      console.log(data);
    })
  };
  const pagar = () => {


    postPedido();
    postProdu();
    console.log("pagar")
    console.log("Lista de productos para el post: ", productosCarrito);


    //En productosCarrito esta la lista de productos
    //window.location.href = "/seguimientoPedido";
    props.onHide()


  } */
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
        {props.productos.map((producto) => {
          return (
            <Card.Body>
              <Card.Title>{producto.nombre_producto}</Card.Title>
              <Card.Text>{producto.descripcion_producto}</Card.Text>
              <Card.Text>${producto.precio_venta_producto}</Card.Text>
            </Card.Body>
          );
        })}
        <br/>
        <br/>
        <Card.Text><b>Restaurante: </b>{props.pedido.dierccionRestaurante}</Card.Text>
        <Card.Text><b>Cliente: </b>{props.pedido.dierccionCliente}</Card.Text>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalDetallesPedidoRepartidor;
