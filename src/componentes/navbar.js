import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faCartShopping } from '@fortawesome/free-solid-svg-icons'

import RappiDosImage from '../assets/image/rappidosLogo.png'


const NavbarComponent = () => {
  return (
    <Navbar bg="white" variant="dark" expand="lg" fixed="top">
      <Container fluid>
        <Navbar.Brand href="/">
          <img src={RappiDosImage} height={70} alt="Logo" />
        </Navbar.Brand>
        <Nav.Link href="/carrito"><FontAwesomeIcon icon={faCartShopping} /></Nav.Link>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
