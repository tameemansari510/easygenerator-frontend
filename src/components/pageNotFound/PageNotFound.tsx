import { Container } from "react-bootstrap";

export const PageNotFound = () => {
  return (
    <Container
      className="container"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1
        style={{
          position: "relative",
          textAlign: "center",
          color: "white",
          margin: "50px auto",
          marginTop: "30%",
        }}
      >
        404
      </h1>
      <h1
        style={{
          position: "relative",
          textAlign: "center",
          color: "white",
        }}
      >
        Page Not Found
      </h1>
    </Container>
  );
};
