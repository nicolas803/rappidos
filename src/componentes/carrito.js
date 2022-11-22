import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import ModalPagos from "./modalPagos";

const CarritoComponent = () => {
  const [modalShow, setModalShow] = useState(false);

  const productosCarrito = JSON.parse(
    JSON.parse(sessionStorage.getItem("pedidos"))
  );
  console.log("EL STATE: ", productosCarrito);
  const productosRestaurante = [
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
  return (
    <>
      <br />
      <h1 className="datosDelRestaurante">Productos del carrito</h1>
      <br />
      {productosCarrito.map((producto) => {
        {
          console.log("log nuevo", producto);
        }
        const productoEncontrado = productosRestaurante.find(
          (productoRestaurante) => productoRestaurante.id === producto.id
        );
        console.log("Producto encontrado: ", productoEncontrado);
        return (
          <>
            <Card>
              <Card.Img
                variant="top"
                src={productoEncontrado.imagen_producto}
              />
              <Card.Body>
                <Card.Title>{productoEncontrado.nombre_producto}</Card.Title>
                <Card.Text>{productoEncontrado.descripcion_producto}</Card.Text>
                <Card.Text>
                  ${productoEncontrado.precio_venta_producto}
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
    </>
  );
};

export default CarritoComponent;
