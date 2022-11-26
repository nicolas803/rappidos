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

const RepartidorAdminComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  const [pedidoModal, setPedidoModal] = useState({});

  const estadosRestaurante = [
    "cancelado",
    "porConfirmar",
    "enPreparacion",
    "enEspera",
  ];

  const cambiarEstado = (idPedido, nuevoEstado) => {
    console.log("Nuevo estado: ", nuevoEstado);
    console.log("idPedido cambio de estado: ", idPedido);
    const options = {
      method: "PATCH",
      url: `http://localhost:8000/api/pedido/${idPedido}/`,
      data: {
        id: idPedido,
        estado: nuevoEstado,
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
    window.location.reload();
  };
  const estadosRepartidor = ["cancelado", "enCamino", "pagado", "entregado"];

  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [datosRepartidor, setDatosRepartidor] = useState([]);
  const [datosEntregas, setDatosEntregas] = useState([]);

  // trae los pedidos terminados
  const optionsDatosEntregas = {
    method: "GET",
    url: "http://localhost:8000/api/pedido/",
    params: { estado: "entregado", delivery__id: "1" },
  };

  //pedidos disponobles
  const optionsPedidosRestaurante = {
    method: "GET",
    url: "http://localhost:8000/api/pedido_delivery/",
  };
  // info repartidor
  const optionsDatosRepartidor = {
    method: "GET",
    url: "http://localhost:8000/api/delivery/1/",
  };

  useEffect(() => {
    const getPedidos = async () => {
      await axios
        .request(optionsPedidosRestaurante)
        .then(function (response) {
          console.log("Pedidos: ", response.data);
          setPedidos(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    const getDatosRepartidor = async () => {
      axios
        .request(optionsDatosRepartidor)
        .then(function (response) {
          console.log(response.data);
          setDatosRepartidor(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    const getDatosEntrega = async () => {
      await axios
        .request(optionsDatosEntregas)
        .then(function (response) {
          console.log("response info", response.data);
          setDatosEntregas(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    getPedidos();
    getDatosRepartidor();
    getDatosEntrega();
  }, []);

  console.log(datosEntregas);
  const validaBoton = (idPedido, estado, tipoPago) => {
    if (estado === "enEspera") {
      return (
        <Button
          onClick={() => {
            cambiarEstado(idPedido, "enCamino");
          }}
          variant="primary"
        >
          Comenzar
        </Button>
      );
    } else if (estado === "enCamino") {
      if (tipoPago !== "efectivo") {
        return <Button variant="primary">Pagado</Button>;
      } else {
        return (
          <Button
            onClick={() => {
              cambiarEstado(idPedido, "entregado");
            }}
            variant="primary"
          >
            Entregar
          </Button>
        );
      }
    } else {
      return <Button variant="primary">entregado</Button>;
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
            <Card.Title>
              Bienvenido {datosRepartidor.nombre_delivery}{" "}
              {datosRepartidor.apellidos_delivery}
            </Card.Title>
            <br />
            <Card.Text className="marginLeft8">
              <FontAwesomeIcon icon={faCheck} />
              Pedidos completados: {datosEntregas.length}
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
                {/* Facturado: CLP ${datosRepartidor.facturado} */}
              </label>
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
              <Card.Body>
                <Card.Title
                  onClick={() => {
                    setPedidoModal(pedido);
                    setModalShow(true);
                  }}
                >
                  Pedido N° {pedido.id} &nbsp;
                  {validaBoton(pedido.id, pedido.estado, "efectivo")}
                </Card.Title>
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
          idPedido={pedidoModal}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default RepartidorAdminComponent;
