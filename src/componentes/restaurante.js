import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar, faRoute } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const restURL = "http://localhost:8000/api/restaurante/1/";
const ProducURL = "http://localhost:8000/api/producto/?restaurante__id=1"
const RestauranteComponent = () => {
  const [restaurante, setRestaurante] = React.useState([]);


  React.useEffect(() => {

    axios
      .get(restURL)
      .then((response) => {
        console.log(response.data)
        setRestaurante(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);


  const [productoRestaurante, setProducto] = React.useState([]);


  React.useEffect(() => {

    axios
      .get(ProducURL)
      .then((response) => {
        console.log(response.data)
        setProducto(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);



  return (
    <>
      <div>
        <img src={restaurante.imagen_restaurante} />
      </div>
      <Card>
        <Card.Body>
          <div>
            <br />
            <Card.Title>{restaurante.nombre_fantasia_restaurante}</Card.Title>
            <br />
            <Card.Text>{restaurante.tipo_restaurante}</Card.Text>
            <br />
          </div>
          <div className="datosDelRestaurante">
            <div>
              <FontAwesomeIcon icon={faClock} />
              <label className="marginLeft8">30Min</label>
            </div>
            <div>
              <FontAwesomeIcon icon={faStar} />
              <label className="marginLeft8">
                {restaurante.clasificacion_restaurante}
              </label>
            </div>
            <div>
              <FontAwesomeIcon icon={faRoute} />
              <label className="marginLeft8">
                {restaurante.direccion_restaurante}
              </label>
            </div>
          </div>
        </Card.Body>
      </Card>
      <br />
      <br />
      {productoRestaurante.map((producto) => {
        return (
          <>
            <Card>
              <Card.Img variant="top" src={producto.imagen_producto} />
              <Card.Body>
                <Card.Title>{producto.nombre_producto}</Card.Title>
                <Card.Text>{producto.descripcion_producto}</Card.Text>
                <Card.Text>${producto.precio_venta_producto}</Card.Text>
                <Button variant="primary">Comprar</Button>
              </Card.Body>
            </Card>
            <br />
          </>
        );
      })}
    </>
  );
};

export default RestauranteComponent;
