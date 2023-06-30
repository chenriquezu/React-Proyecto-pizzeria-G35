import { Container } from "react-bootstrap";
import Pizzas from "../components/Pizzas";

const Home = () => {
  return (
    <Container className="text-center">
      <div className="jumbotron">
          <h1 className="display-4 font-weight-bold titulo1">¡Pizzería Donatelos!</h1>
          <p className="lead font-weight-bold titulo2">¡Tenemos las Mejores Preparaciones para tu paladar!</p>
      </div>
      <Pizzas />
    </Container>
  );
};
export default Home;
