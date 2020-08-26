import React from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardText,
  Container,
  Col,
  Row,
} from "reactstrap";

const Favorites = (props) => {
  return (
    <Container>
      <Row>
        {/* map array right here for favorites*/}
        <Col xs="6" sm="4" md="3" lg="2">
          <Card>
            <CardImg></CardImg>
            <CardTitle></CardTitle>
            <CardText></CardText>
            <CardText></CardText>
            <CardText></CardText>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Favorites;
