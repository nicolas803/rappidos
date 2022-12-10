import React from "react";
import Card from "react-bootstrap/Card";

const CardCarritoComponent = (props) => {
    const producto = props.producto;
    return (
        <Card>
            <Card.Img variant="top" src={producto.imagen_producto} />
            <Card.Body>
                <Card.Title>{producto.nombre_producto}</Card.Title>
                <Card.Text>{producto.descripcion_producto}</Card.Text>
                <Card.Text>${producto.precio_venta_producto}</Card.Text>
            </Card.Body>
        </Card>
    );
};

export default CardCarritoComponent;
