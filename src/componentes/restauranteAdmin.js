import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faRoute } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import ModalDetallesPedido from "./modalDetallesPedido";

const RestauranteAdminComponent = () => {
  const [modalShow, setModalShow] = useState(false);
  const [idModal, setIdModal] = useState(0);
  const pedidosConProductos = [];
  const estadosRestaurante = [
    "cancelado",
    "porConfirmar",
    "enPreparacion",
    "enEspera",
  ];
  const estadosRepartidor = ["cancelado", "enCamino", "pagado", "entregado"];
  const [productos, setProductos] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [datosRestaurante, setDatosRestaurante] = useState({});

  const cambiarEstado = (idPedido, nuevoEstado) => {
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
  };

  useEffect(() => {
    const getPedidos = async () => {
      await axios
        .request(optionsPedidosRestaurante)
        .then(function (response) {
          setPedidos(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    };
    const getDatosRestaurante = async () => {
      await axios
        .request(optionsRestaurante)
        .then(function (response) {
          setDatosRestaurante(response.data[0]);
        })
        .catch(function (error) {
          console.error(error);
        });
    };

    getPedidos();
    getDatosRestaurante();
  }, []);

  const optionsPedidosRestaurante = {
    method: "GET",
    url: "http://localhost:8000/api/pedido_restaurant/",
    params: { restaurante_id: "1" },
  };

  const optionsRestaurante = {
    method: "GET",
    url: "http://localhost:8000/api/restaurante/",
    params: { id: "1" },
  };

  const validaBotonIzq = (estado, idPedido) => {
    if (estado === "porConfirmar") {
      return (
        <Button
          /*onClick={() => { cambiarEstado(idPedido, "cancelado") }}*/ variant="primary"
        >
          Rechazar
        </Button>
      );
    } else {
      return (
        <Button
          /*onClick={() => { cambiarEstado(idPedido, "cancelado") }} */ variant="primary"
        >
          Cancelar
        </Button>
      );
    }
  };

  const validaBotonDer = (estado, idPedido) => {
    if (estado === "porConfirmar") {
      return (
        <Button
          onClick={() => {
            cambiarEstado(idPedido, "enPreparacion");
          }}
          variant="primary"
        >
          Por Confirmar
        </Button>
      );
    } else if (estado === "enPreparacion") {
      return (
        <Button
          onClick={() => {
            cambiarEstado(idPedido, "enEspera");
          }}
          variant="warning"
        >
          Listo para retiro
        </Button>
      );
    } else {
      return (
        <Button variant="success" disabled>
          {estado}
        </Button>
      );
    }
  };

  return (
    <div>
      <div>
        <img
          src={datosRestaurante.imagen_restaurante}
          style={{ width: "100%" }}
        />
      </div>
      <Card>
        <Card.Body>
          <div>
            <br />
            <Card.Title>
              {datosRestaurante.nombre_fantasia_restaurante}
            </Card.Title>
            <br />
            <Card.Text>{datosRestaurante.tipo_restaurante}</Card.Text>
            <br />
          </div>
          <div className="datosDelRestaurante">
            <div>
              <FontAwesomeIcon icon={faStar} />
              <label className="marginLeft8">
                {datosRestaurante.clasificacion_restaurante}
              </label>
            </div>
            <div>
              <FontAwesomeIcon icon={faRoute} />
              <label className="marginLeft8">
                {datosRestaurante.direccion_restaurante}
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
                    setModalShow(true);
                    setIdModal(pedido.id);
                  }}
                >
                  Pedido N°{pedido.id}
                </Card.Title>
                {validaBotonIzq(pedido.estado, pedido.id)} &nbsp;
                {validaBotonDer(pedido.estado, pedido.id)}
              </Card.Body>
            </Card>
          </>
        );
      })}

      {modalShow ? (
        <ModalDetallesPedido
          show={modalShow}
          onHide={() => setModalShow(false)}
          idPedido={idModal}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RestauranteAdminComponent;
