import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

export const ErrorFallback = () => {
  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container style={{ width: "100%", marginLeft: "0px" }}>
          <Navbar.Brand href="/home">
            <img
              alt=""
              src="/easygenerator.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
            />{" "}
            Easygenerator
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container
        className="container"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p
          style={{
            position: "relative",
            textAlign: "center",
            color: "white",
            margin: "50px auto",
            marginTop: "30%",
          }}
        >
          Something went wrong! Login after sometime.
        </p>
        <Link
          style={{
            width: "50%",
            color: "white",
            backgroundColor: "#f5884b",
            borderColor: "#f5884b",
          }}
          to="/"
          type="submit"
          className="btn"
        >
          Logout
        </Link>
      </Container>
    </>
  );
};
