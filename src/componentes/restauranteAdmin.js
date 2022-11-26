import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar, faRoute } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
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
    console.log("Nuevo estado: ", nuevoEstado)
    console.log("idPedido cambio de estado: ", idPedido)
    const options = {
      method: 'PATCH',
      url: `http://localhost:8000/api/pedido/${idPedido}/`,
      data: {
        "id": idPedido, "estado": nuevoEstado
      }
    };

    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
    window.location.reload();
  }

  useEffect(() => {
    const getPedidos = async () => {
      await axios.request(optionsPedidosRestaurante).then(function (response) {
        console.log("Pedidos: ", response.data);
        setPedidos(response.data)
      }).catch(function (error) {
        console.error(error);
      });
    }
    const getDatosRestaurante = async () => {
      await axios.request(optionsRestaurante).then(function (response) {
        console.log("Datos Restaurante: ", response.data[0]);
        setDatosRestaurante(response.data[0])
      }).catch(function (error) {
        console.error(error);
      });
    }
    getPedidos()
    getDatosRestaurante()
  }, []);



  const optionsPedidosRestaurante = {
    method: 'GET',
    url: 'http://localhost:8000/api/pedido_restaurant/',
    params: { restaurante_id: '1' }
  };

  const optionsRestaurante = {
    method: 'GET',
    url: 'http://localhost:8000/api/restaurante/',
    params: { id: '1' }
  };


  const getProductosXPedido = async (idPedido) => {
    console.log(idPedido)
    const optionsProductos = {
      method: 'GET',
      url: `http://localhost:8000/api/detalle_Pedido/?pedido__id=${idPedido}/`,
      // params: { pedido_id: idPedido }
    };

    let result
    await axios.request(optionsProductos).then(function (response) {
      console.log("getProductosXPedido: ", response.data);
      result = response.data
    }).catch(function (error) {
      console.error(error);
    });
    return result
  }


  pedidos.map(async (pedido) => {
    const getProductos = await getProductosXPedido(pedido.id)
    pedidosConProductos.push(getProductos)
  })

  // const pedido = [
  //   {
  //     id: "1",
  //     imagen_producto: "https://www.fillmurray.com/70/70",
  //     nombre_producto: "Nombre producto o direccion",
  //     estado: "porConfirmar",
  //   },
  //   {
  //     id: "2",
  //     imagen_producto: "https://www.fillmurray.com/70/70",
  //     nombre_producto: "Otro verga",
  //     estado: "enPreparacion",
  //   },
  //   {
  //     id: "3",
  //     imagen_producto: "https://www.fillmurray.com/70/70",
  //     nombre_producto: "Otra mas",
  //     estado: "enEspera",
  //   },
  // ];



  const validaBotonIzq = (estado, idPedido) => {
    console.log("Id Pedido??: ", idPedido)
    if (estado === "porConfirmar") {
      return <Button /*onClick={() => { cambiarEstado(idPedido, "cancelado") }}*/ variant="primary">Rechazar</Button>;
    } else {
      return <Button /*onClick={() => { cambiarEstado(idPedido, "cancelado") }} */ variant="primary">Cancelar</Button>;
    }
  };

  const validaBotonDer = (estado, idPedido) => {
    if (estado === "porConfirmar") {
      return <Button onClick={() => { cambiarEstado(idPedido, "enPreparacion") }} variant="primary">Por confirmar</Button>;
    } else if (estado === "enPreparacion") {
      return <Button onClick={() => { cambiarEstado(idPedido, "enEspera") }} variant="warning">En preparación</Button>;
    } else {
      return (
        <Button variant="success" disabled>
          Listo para retiro
        </Button>
      );
    }
  };


  return (
    <div>
      <div>
        <img src={datosRestaurante.imagen_restaurante} style={{ width: "100%" }} />
      </div>
      <Card>
        <Card.Body>
          <div>
            <br />
            <Card.Title>{datosRestaurante.nombre_fantasia_restaurante}</Card.Title>
            <br />
            <Card.Text>{datosRestaurante.tipo_restaurante}</Card.Text>
            <br />
          </div>
          <div className="datosDelRestaurante">
            <div>
              <FontAwesomeIcon icon={faStar} />
              <label className="marginLeft8">{datosRestaurante.clasificacion_restaurante}</label>
            </div>
            <div>
              <FontAwesomeIcon icon={faRoute} />
              <label className="marginLeft8">{datosRestaurante.direccion_restaurante}</label>
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
                <Card.Title onClick={() => { setModalShow(true); setIdModal(pedido.id) }}>Pedido N°{pedido.id}</Card.Title>
                {validaBotonIzq(pedido.estado, pedido.id)} &nbsp;
                {validaBotonDer(pedido.estado, pedido.id)}
              </Card.Body>
            </Card>
          </>
        );
      })}

      {modalShow ? (
        <ModalDetallesPedido show={modalShow} onHide={() => setModalShow(false)} productos={pedidosConProductos} />
      ) : (
        <></>
      )

      }
    </div>
  );
};

export default RestauranteAdminComponent;
