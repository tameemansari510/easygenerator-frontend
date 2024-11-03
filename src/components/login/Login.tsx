/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Container, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validate-email-util";
import { validatePassword } from "../../utils/validate-password-util";
import axios, { HttpStatusCode } from "axios";
import { AUTH_LOGIN } from "../../constants/endpoints.constants";
import { ErrorProps, UserProps } from "../../types";
import { useUser } from "../../hooks/useUser";
import { ERROR_CODES } from "../../constants/error.code.contants";

export const Login = () => {
  const initialFormValues: UserProps = {
    username: "",
    email: "",
    password: "",
  };
  const initialFormErrors: ErrorProps = {
    username: "",
    email: "",
    password: [],
  };
  const [formValues, setFormValues] = useState<UserProps>(initialFormValues);
  const [formErrors, setFormErrors] = useState<ErrorProps>(initialFormErrors);
  const [isSubmit, setIsSubmit] = useState(false);
  const [isValidationError, setIsValidationError] = useState<boolean>(false);
  const [userUnauthorized, setUserUnauthorized] = useState<boolean>(false);
  const [userUnauthorizedMsg, setUserUnauthorizedMsg] = useState<string>("");
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    setUserAuth,
    setIsSignUpFromLogin,
    isTokenExpired,
    setIsTokenExpired,
    userSessionExpiredMsg,
  } = useUser();

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserUnauthorized(false);
    setIsTokenExpired(false);
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    setIsTokenExpired(false);
    setShowAlert(true);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const validate = (values: UserProps) => {
    validateEmail(values.email, initialFormErrors);
    validatePassword(values.password, initialFormErrors);
    setIsValidationError(
      initialFormErrors.emailInvalid! || initialFormErrors.passwordInvalid!
    );
    return initialFormErrors;
  };

  useEffect(() => {
    const { email, password } = formValues;
    const login = async () => {
      try {
        const response = await axios.post(AUTH_LOGIN, {
          email,
          password,
        });
        const { statusCode, username, accessToken, refreshToken } =
          response.data;
        if (statusCode === HttpStatusCode.Ok) {
          setUserUnauthorized(false);
          setUserAuth({
            username,
            accessToken,
            refreshToken,
          });
          navigate("/home");
        }
      } catch (error: any) {
        const { message, errorCode } = error.response.data;
        if (
          error?.status === HttpStatusCode.Unauthorized &&
          (errorCode === ERROR_CODES.USER_NOT_AVAILABLE ||
            errorCode === ERROR_CODES.WRONG_PASSWORD)
        ) {
          setUserUnauthorized(true);
          setUserUnauthorizedMsg(message);
        }
      } finally {
        setIsSubmit(false);
      }
    };
    if (!isValidationError && isSubmit && formValues) {
      login();
    }
  }, [isValidationError, isSubmit, formValues]);

  const handleOnSignUp = () => {
    setIsSignUpFromLogin(true);
  };

  const handleOnCloseAlert = () => {
    setShowAlert(false);
  };

  const handleOnShowPassword = () => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };
  return (
    <Container
      style={{
        backgroundColor: "white",
        width: "25%",
        margin: "50px auto",
        marginTop: "10%",
        padding: "40px",
        borderRadius: "10px",
        boxShadow: "1px 1px 8px rgba(219,99,111)",
      }}
      className="container"
    >
      <h3 style={{ textAlign: "center", color: "#e45852" }}>Sign In</h3>
      {!isValidationError &&
        (userUnauthorized && showAlert ? (
          <Alert variant="danger" onClose={handleOnCloseAlert} dismissible>
            {userUnauthorizedMsg}
          </Alert>
        ) : isTokenExpired ? (
          <Alert variant="danger" onClose={handleOnCloseAlert} dismissible>
            {userSessionExpiredMsg}
          </Alert>
        ) : null)}
      <FloatingLabel controlId="floatingInput" label="Email address">
        <Form.Control
          type="email"
          name="email"
          placeholder="Email address"
          onChange={handleOnChange}
        />
      </FloatingLabel>
      <p style={{ color: "red", fontSize: "10px" }}>{formErrors.email}</p>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          onChange={handleOnChange}
        />
      </FloatingLabel>
      <Form.Check
        onClick={handleOnShowPassword}
        type="switch"
        id="custom-switch"
        label="Show Password"
      />
      {formErrors.password?.map((error) => {
        return (
          <p
            style={{
              color: "red",
              fontSize: "10px",
              marginBottom: "-5px",
            }}
          >
            {error}
          </p>
        );
      })}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "10px",
        }}
      >
        <Button
          style={{
            width: "50%",
            marginTop: "10px",
            color: "white",
            backgroundColor: "#c05460",
            borderColor: "#c05460",
          }}
          onClick={handleOnSubmit}
        >
          Login In
        </Button>
        <p style={{ marginTop: "5%" }}>Don't have account? </p>
        <Link
          style={{
            width: "50%",
            color: "white",
            backgroundColor: "#f5884b",
            borderColor: "#f5884b",
          }}
          to="/signup"
          type="submit"
          className="btn"
          onClick={handleOnSignUp}
        >
          Sign Up
        </Link>
      </div>
    </Container>
  );
};
