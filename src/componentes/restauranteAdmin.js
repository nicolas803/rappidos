import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar, faRoute } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import ModalDetallesPedido from "./modalDetallesPedido";

const restURL = "http://localhost:8000/api/restaurante/1/";
const ProducURL = "http://localhost:8000/api/producto/?restaurante__id=1";

const RestauranteAdminComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  const estadosRestaurante = [
    "cancelado",
    "porConfirmar",
    "enPreparacion",
    "enEspera",
  ];

  const estadosRepartidor = ["cancelado", "enCamino", "pagado", "entregado"];

  const options = {
    method: 'GET',
    url: 'http://localhost:8000/api/producto/',
    params: { restaurante__id: '1' }
  };


  const productos = useState([]);

  useEffect(() => {
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }, []);

  const pedidos = [
    {
      id: "1",
      imagen_producto: "https://www.fillmurray.com/70/70",
      nombre_producto: "Nombre producto o direccion",
      estado: "porConfirmar",
    },
    {
      id: "2",
      imagen_producto: "https://www.fillmurray.com/70/70",
      nombre_producto: "Otro verga",
      estado: "enPreparacion",
    },
    {
      id: "3",
      imagen_producto: "https://www.fillmurray.com/70/70",
      nombre_producto: "Otra mas",
      estado: "enEspera",
    },
  ];

  const validaBotonIzq = (estado) => {
    if (estado === "porConfirmar") {
      return <Button variant="primary">Rechazar</Button>;
    } else {
      return <Button variant="primary">Cancelar</Button>;
    }
  };

  const validaBotonDer = (estado) => {
    if (estado === "porConfirmar") {
      return <Button variant="primary">Preparar</Button>;
    } else if (estado === "enPreparacion") {
      return <Button variant="primary">Listo para retiro</Button>;
    } else {
      return (
        <Button variant="primary" disabled>
          {estado}
        </Button>
      );
    }
  };

  return (
    <>
      <div>
        <img src="https://www.fillmurray.com/358/250" />
      </div>
      <Card>
        <Card.Body>
          <div>
            <br />
            <Card.Title>Vergas King</Card.Title>
            <br />
            <Card.Text>restaurante.tipo_restaurante</Card.Text>
            <br />
          </div>
          <div className="datosDelRestaurante">
            <div>
              <FontAwesomeIcon icon={faStar} />
              <label className="marginLeft8">5.0</label>
            </div>
            <div>
              <FontAwesomeIcon icon={faRoute} />
              <label className="marginLeft8">Antonio Varas 666</label>
            </div>
          </div>
        </Card.Body>
      </Card>
      <br />
      <h1 className="datosDelRestaurante">Pedidos</h1>
      {pedidos.map((pedido) => {
        return (
          <>
            <br />
            <Card className="cardPedidosRestaurante">
              <img src={pedido.imagen_producto} />
              <Card.Body>
                <Card.Title onClick={() => setModalShow(true)}>{pedido.nombre_producto}</Card.Title>
                {validaBotonIzq(pedido.estado)}
                {validaBotonDer(pedido.estado)}
              </Card.Body>
            </Card>
          </>
        );
      })}
      <ModalDetallesPedido show={modalShow} onHide={() => setModalShow(false)} productos={productos} />
    </>
  );
};

export default RestauranteAdminComponent;
