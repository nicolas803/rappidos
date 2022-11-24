import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar, faRoute } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";

const restURL = "http://localhost:8000/api/restaurante/1/";
const ProducURL = "http://localhost:8000/api/producto/?restaurante__id=1";

const RestauranteAdminComponent = () => {
  const estadosRestaurante = [
    "cancelado",
    "porConfirmar",
    "enPreparacion",
    "enEspera",
  ];

  const estadosRepartidor = ["cancelado", "enCamino", "pagado", "entragado"];

  const pedido = {
    imagen: "sexo.url",
    titulo: "Nombre producto o direccion",
    estado: "",
  };

  return (
    <>
      <h1>RESTAURANTE</h1>
    </>
  );
};

export default RestauranteAdminComponent;
