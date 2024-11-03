/* eslint-disable react-hooks/exhaustive-deps */
import { useState } from "react";
import { Container, Navbar, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { useEffect } from "react";
import { ReadmeModal } from "./ReadmeModal";
import { BEARER, READ_ME } from "../../constants/endpoints.constants";
import axios, { HttpStatusCode } from "axios";
import { isRefreshTokenExpired } from "../../actions/validateToken";
import { ERROR_CODES } from "../../constants/error.code.contants";

export const Home = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [shouldReadme, setShouldReadme] = useState<boolean>(false);
  const navigate = useNavigate();
  const { userAuth, setIsTokenExpired, setUserSessionExpiredMsg } = useUser();
  const { username, accessToken, refreshToken } = userAuth;

  const handleOnLogout = () => {
    navigate("/");
  };

  useEffect(() => {
    if (!username) {
      navigate("/");
    }
  }, [username]);

  const handleOnReadme = () => {
    setShouldReadme(true);
  };
  const handleOnCloseReadme = () => {
    setShowModal(false);
    setShouldReadme(false);
  };

  useEffect(() => {
    const readme = async (accessToken?: string) => {
      try {
        const response: any = await axios({
          method: "get",
          url: READ_ME,
          headers: {
            Authorization: `${BEARER} ${accessToken}`,
          },
        });
        setShowModal(true);
        setContent(response?.data?.content);
      } catch (error: any) {
        const { errorCode } = error.response.data;
        if (
          error?.status === HttpStatusCode.Unauthorized &&
          errorCode === ERROR_CODES.ACCESS_TOKEN_EXPIRED
        ) {
          const refreshedToken = await isRefreshTokenExpired(
            refreshToken ?? ""
          );
          if (refreshedToken?.isExpired) {
            setIsTokenExpired(true);
            setUserSessionExpiredMsg(refreshedToken.sessionExpiredMsg ?? "");
            handleOnLogout();
          } else {
            await readme(refreshedToken?.accessToken);
          }
        }
      }
    };
    if (shouldReadme) {
      readme(accessToken);
    }
  }, [shouldReadme]);

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
        <Button
          style={{
            marginRight: "10px",
            color: "white",
            backgroundColor: "#c05460",
            borderColor: "#c05460",
          }}
          onClick={handleOnLogout}
        >
          Logout
        </Button>
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
          Hi {`${username}`}! Welcome to the application
        </p>
        <Button
          style={{
            width: "10%",
            color: "white",
            backgroundColor: "#f5884b",
            borderColor: "#f5884b",
          }}
          onClick={handleOnReadme}
        >
          Read Me
        </Button>
        <ReadmeModal
          showModal={showModal}
          content={content}
          handleOnClose={handleOnCloseReadme}
        />
      </Container>
    </>
  );
};
