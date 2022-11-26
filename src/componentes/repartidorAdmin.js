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


  const estadosRestaurante = [
    "cancelado",
    "porConfirmar",
    "enPreparacion",
    "enEspera",
  ];

  const estadosRepartidor = ["cancelado", "enCamino", "pagado", "entregado"];

  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [datosRepartidor, setDatosRepartidor] = useState([]);

  const optionsPedidosRestaurante = {
    method: 'GET',
    url: 'http://localhost:8000/api/pedido_restaurant/',
    params: { restaurante_id: '1' }
  };

  const optionsDatosRepartidor = { method: 'GET', url: 'http://localhost:8000/api/delivery/1/' };

  useEffect(() => {
    const getPedidos = async () => {
      await axios.request(optionsPedidosRestaurante).then(function (response) {
        console.log("Pedidos: ", response.data);
        setPedidos(response.data)
      }).catch(function (error) {
        console.error(error);
      });
      axios.request(optionsDatosRepartidor).then(function (response) {
        console.log(response.data);
        setDatosRepartidor(response.data);
      }).catch(function (error) {
        console.error(error);
      });
    }
  }, []);


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
            {/* <Card.Title>Bienvenido {datosRepartidor.nombre}</Card.Title> */}
            <br />
            <Card.Text className="marginLeft8">
              <FontAwesomeIcon icon={faCheck} />
              Pedidos completados: 1
              <br />
              <FontAwesomeIcon icon={faTruck} />
              {/* Pedidos disponibles: {pedidos.length} */}
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
                {/* Facturado: CLP ${datosRepartidor.facturado} */}
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
              {/* <img src={pedido.imagen_producto} /> */}gay
              <Card.Body>
                <Card.Title onClick={() => { setModalShow(true); setPedidoModal(index) }}>
                  {pedido.nombre_producto}
                </Card.Title>
                {validaBoton(pedido.estado)}
              </Card.Body>
            </Card>
          </>
        );
      })}
      {modalShow ? (
        <ModalDetallesPedidoRepartidor
          show={modalShow}
          onHide={() => setModalShow(false)}
          productos={productos}
          pedido={pedidos[pedidoModal]}
        />
      ) : (
        <></>
      )

      }
    </>
  );
};

export default RepartidorAdminComponent;
