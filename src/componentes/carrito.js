import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ModalPagos from "./modalPagos";
import axios from "axios";


const ProducURL = "http://localhost:8000/api/producto/?restaurante__id=1"
const CarritoComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  const productosCarrito = JSON.parse(
    JSON.parse(sessionStorage.getItem("pedidos"))
  );
  //console.log("EL STATE: ", productosCarrito);
  const [productosRestaurante, setProducto] = useState([]);
  useEffect(() => {
    axios
      .get(ProducURL)
      .then((response) => {
        // console.log(response.data)
        setProducto(response.data);
      })
      .catch((e) => {
        // console.error(e);
      });
  }, []);

  return (
    <>
      <div style={{ position: "absolute", top: "70px" }}>
        <br />
        <h1 className="datosDelRestaurante">Productos del carrito</h1>
        <br />
        {productosCarrito.map((producto) => {
          {
            // console.log("log nuevo", producto);
          }
          // console.log("log nuevo", producto);

          const productoEncontrado = productosRestaurante.find(
            (productoRestaurante) => productoRestaurante.id === producto.id
          );
          // console.log("Producto encontrado: ", productoEncontrado);
          return (
            <>
              <Card>
                <Card.Img
                  variant="top"
                  src={producto.imagen_producto}
                />
                <Card.Body>
                  <Card.Title>{producto.nombre_producto}</Card.Title>
                  <Card.Text>{producto.descripcion_producto}</Card.Text>
                  <Card.Text>
                    ${producto.precio_venta_producto}
                  </Card.Text>
                </Card.Body>
              </Card>
              <br />
            </>
          );
        })}
        <br />
        <div className="datosDelRestaurante">
          <Button variant="primary" onClick={() => setModalShow(true)}>
            Pagar
          </Button>
        </div>
        <br />
        <ModalPagos show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </>
  );
};

export default CarritoComponent;
