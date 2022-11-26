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

  let total = 0;
  let costo = 3000;
  // hace json del carrito
  const productosCarrito = JSON.parse(
    JSON.parse(sessionStorage.getItem("pedidos"))
  );

  // console.log("prod carrito", productosCarrito)

  // function return total pedido
  for (let x of productosCarrito) {
    total = total + x.precio_venta_producto;
    // console.log(x.precio_venta_producto)
    // console.log('total', total)
  }

  // post de pedido
  const [post, setPost] = useState({
    id: 0,
    estado: "",
    restaurante: 0,
    cliente: 0,
    delivery: 0,
    monto_envio: 0,
    monto_total_pedido: 0,
  });
  async function pedido() {
    axios
      .post("http://localhost:8000/api/pedido/", {
        estado: "mmvo",
        restaurante: 1,
        cliente: 1,
        delivery: 1,
        monto_envio: costo,
        monto_total_pedido: total + costo,
      })
      .then((response) => {
        console.log(response.data);
        setPost(response.data);
      })
      .catch((e) => console.log("error", e));
  }

  sessionStorage.setItem("idPedido", JSON.stringify(post.id));
  // async function para det pedido
  async function detallePedido(id, producto) {
    const detallePedidos = {
      method: "POST",
      url: "http://localhost:8000/api/detalle_Pedido/",
      data: {
        pedido: id,
        producto: producto,
      },
    };

    axios
      .request(detallePedidos)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // pagar llama a las dos func que hacen post
  const pagar = async () => {
    //En productosCarrito esta la lista de productos
    await pedido();
    console.log("p carrito", productosCarrito);
    for (let x of productosCarrito) {
      // console.log("id pedidossss", post.id);
      // console.log("id prod", x.id);
      setTimeout(await detallePedido(post.id, x.id), 3500);
    }

    // props.onHide()
    // window.location.href = "/seguimientoPedido"

    setShow(true);
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
              Total a pagar
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <pre> Total productos $ {total} </pre>
            <pre> Costo de envio $ {costo}</pre>
            <pre> Total general $ {total + costo}</pre>
          </Modal.Body>
          <Modal.Header>
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
        </>
      ) : (
        <>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">Pagado</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Se págo se ha realizado correctamente.</p>
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
