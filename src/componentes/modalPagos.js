import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMoneyBill1Wave,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

function ModalPagos(props) {
    const productosCarrito = JSON.parse(
        JSON.parse(sessionStorage.getItem("pedidos"))
      );
    const pagar = () => {
        console.log("Lista de productos para el post: ", productosCarrito);
        //En productosCarrito esta la lista de productos
        window.location.href ="/seguimientoPedido";
        props.onHide()
    }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Metodo de pago
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Button onClick={pagar}>
          <FontAwesomeIcon icon={faMoneyBill1Wave} /> Efectivo
        </Button>
        <br />
        <br />
        <Button disabled>
          <FontAwesomeIcon icon={faCreditCard} /> WebPay
        </Button>
        <p>El metodo de pago WebPay estará disponible proximamente. </p>
        <p>Por ahora prefiera el uso de efectivo.</p>
        <p>Muchas gracias.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalPagos;
