import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faStar,
  faTruck,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import ModalDetallesPedidoRepartidor from "./modalDetallesPedidoRepartidor";

const restURL = "http://localhost:8000/api/restaurante/1/";
const ProducURL = "http://localhost:8000/api/producto/?restaurante__id=1";

const RepartidorAdminComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  const [pedidoModal, setPedidoModal] = useState(0);

  const datosRepartidor = {
    nombre: "Kleiber Yonaiker",
    numeroPedidosCompletados: 69,
    facturado: 420000,
  };

  const estadosRestaurante = [
    "cancelado",
    "porConfirmar",
    "enPreparacion",
    "enEspera",
  ];

  const estadosRepartidor = ["cancelado", "enCamino", "pagado", "entregado"];

  const productos = [
    {
      id: "1",
      nombre_producto: "Pinga Fresca",
      descripcion_producto: "Una pinga fresca para compartir",
      precio_venta_producto: 9990,
      imagen_producto: "https://www.fillmurray.com/g/286/180",
    },
    {
      id: "2",
      nombre_producto: "Pinga Caliente",
      descripcion_producto: "Una pinga caliente como le gusta a Dido",
      precio_venta_producto: 4990,
      imagen_producto: "https://www.fillmurray.com/286/180",
    },
    {
      id: "3",
      nombre_producto: "Pinga Frita",
      descripcion_producto: "Pinga frita para la cochina de Nando8",
      precio_venta_producto: 990,
      imagen_producto: "https://www.fillmurray.com/g/286/180",
    },
  ];

  const pedidos = [
    {
      id: "1",
      imagen_producto: "https://www.fillmurray.com/70/70",
      nombre_producto: "Nombre producto o direccion",
      dierccionRestaurante: "Antonio Varas 666",
      dierccionCliente: "Leonor Cepeda 952",
      estado: "pagado",
      tipoPago: "efectivo",
    },
    {
      id: "2",
      imagen_producto: "https://www.fillmurray.com/70/70",
      nombre_producto: "Otro verga",
      dierccionRestaurante: "Antonio Varas 666",
      dierccionCliente: "Francisco Bilbao 4260",
      estado: "enCamino",
      tipoPago: "webpay",
    },
    {
      id: "2",
      imagen_producto: "https://www.fillmurray.com/70/70",
      nombre_producto: "Otro verga",
      dierccionRestaurante: "Antonio Varas 666",
      dierccionCliente: "Los Cancilleres 1670",
      estado: "enCamino",
      tipoPago: "efectivo",
    },
    {
      id: "3",
      imagen_producto: "https://www.fillmurray.com/70/70",
      nombre_producto: "Otra mas",
      estado: "enEspera",
      tipoPago: "efectivo",
    },
  ];

  const validaBoton = (estado, tipoPago) => {
    if (estado === "enEspera") {
      return <Button variant="primary">Comenzar</Button>;
    } else if (estado === "enCamino") {
      if (tipoPago !== "efectivo") {
        return <Button variant="primary">Pagado</Button>;
      } else {
        return <Button variant="primary">Entregar</Button>;
      }
    } else {
      return <Button variant="primary">Entregar</Button>;
    }
  };

  return (
    <>
      <Card>
        <Card.Body>
          <div>
            <br />
            <br />
            <br />
            <br />
            <Card.Title>Bienvenido {datosRepartidor.nombre}</Card.Title>
            <br />
            <Card.Text className="marginLeft8">
              <FontAwesomeIcon icon={faCheck} />
              Pedidos completados: {datosRepartidor.numeroPedidosCompletados}
              <br />
              <FontAwesomeIcon icon={faTruck} />
              Pedidos disponibles: {pedidos.length}
            </Card.Text>
            <br />
          </div>
          <div className="datosDelRestaurante">
            <div>
              <FontAwesomeIcon icon={faStar} />
              <label className="marginLeft8">5.0</label>
            </div>
            <div>
              <FontAwesomeIcon icon={faMoneyBill1Wave} />
              <label className="marginLeft8">
                Facturado: CLP ${datosRepartidor.facturado}
              </label>
            </div>
          </div>
        </Card.Body>
      </Card>
      <br />
      <h1 className="datosDelRestaurante">Pedidos</h1>
      {pedidos.map((pedido, index) => {
        return (
          <>
            <br />
            <Card className="cardPedidosRestaurante">
              <img src={pedido.imagen_producto} />
              <Card.Body>
                <Card.Title onClick={() => {setModalShow(true); setPedidoModal(index)}}>
                  {pedido.nombre_producto}
                </Card.Title>
                {validaBoton(pedido.estado)}
              </Card.Body>
            </Card>
          </>
        );
      })}
      <ModalDetallesPedidoRepartidor
        show={modalShow}
        onHide={() => setModalShow(false)}
        productos={productos}
        pedido={pedidos[pedidoModal]}
      />
    </>
  );
};

export default RepartidorAdminComponent;
