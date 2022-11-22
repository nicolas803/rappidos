import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faStar, faRoute } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const RestauranteComponent = () => {
  const restaurante = {
    nombre_fantasia_restaurante: "Mc Vergas",
    tipo_restaurante: "Vergas pa la gente",
    clasificacion_restaurante: 4.9,
    direccion_restaurante: "Micasa",
    imagen_restaurante: "https://www.fillmurray.com/g/360/200",
  };
  const productoRestaurante = [
    {
      nombre_producto: "Pinga Fresca",
      descripcion_producto: "Una pinga fresca para compartir",
      precio_venta_producto: 9990,
      imagen_producto: "https://www.fillmurray.com/g/286/180",
    },
    {
      nombre_producto: "Pinga Caliente",
      descripcion_producto: "Una pinga caliente como le gusta a Dido",
      precio_venta_producto: 4990,
      imagen_producto: "https://www.fillmurray.com/286/180",
    },
    {
      nombre_producto: "Pinga Frita",
      descripcion_producto: "Pinga frita para la cochina de Nando8",
      precio_venta_producto: 990,
      imagen_producto: "https://www.fillmurray.com/g/286/180",
    },
  ];

  const getGay = () => {
    axios
      .get("https://swapi.dev/api/people/1")
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        console.error(e);
      });
  };

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
                <Button variant="primary" onClick={getGay}>Comprar</Button>
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
