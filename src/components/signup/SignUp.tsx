/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { validateEmail } from "../../utils/validate-email-util";
import { validateUserName } from "../../utils/validate-userName-util";
import { validatePassword } from "../../utils/validate-password-util";
import { AUTH_SIGNUP } from "../../constants/endpoints.constants";
import { Container, Form, FloatingLabel, Button, Alert } from "react-bootstrap";
import axios, { HttpStatusCode } from "axios";
import { ErrorProps, UserProps } from "../../types";
import { useUser } from "../../hooks/useUser";
import { ERROR_CODES } from "../../constants/error.code.contants";

export const SignUp = () => {
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
  const [isDuplicateUser, setIsDuplicateUser] = useState<boolean>(false);
  const [duplicateUserMsg, setDuplicateUserMsg] = useState<string>("");
  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isValidationError, setIsValidationError] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(true);
  const [user, setUser] = useState<UserProps>({});
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const { isSignUpFromLogin, setUserAuth, userAuth, setIsTokenExpired } =
    useUser();
  const { username } = userAuth;

  useEffect(() => {
    if (!username && !isSignUpFromLogin) {
      navigate("/");
    }
  }, [username]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    setIsDuplicateUser(false);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();
    setShowAlert(true);
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  const handleOnLoginClick = () => {
    setIsTokenExpired(false);
  };

  const validate = (values: UserProps) => {
    validateUserName(values.username, initialFormErrors);
    validateEmail(values.email, initialFormErrors);
    validatePassword(values.password, initialFormErrors);
    setIsValidationError(
      initialFormErrors.emailInvalid! ||
        initialFormErrors.passwordInvalid! ||
        initialFormErrors.usernameInvalid!
    );
    return initialFormErrors;
  };

  useEffect(() => {
    const signup = async () => {
      const { username, email, password } = formValues;
      try {
        const response = await axios.post(AUTH_SIGNUP, {
          username,
          email,
          password,
        });
        const { statusCode, accessToken, refreshToken } = response.data;
        if (statusCode === HttpStatusCode.Created) {
          setUserAuth({ username, accessToken, refreshToken });
          navigate("/home");
        }
      } catch (error: any) {
        const { message, errorCode } = error.response.data;
        if (
          error?.status === HttpStatusCode.BadRequest &&
          errorCode === ERROR_CODES.USER_ALREADY_AVAILABLE
        ) {
          setIsDuplicateUser(true);
          setDuplicateUserMsg(message);
        }
      } finally {
        setIsSubmit(false);
        setUser({ ...formValues });
      }
    };
    if (!isValidationError && isSubmit && formValues) {
      setIsDuplicateUser(false);
      signup();
    }
  }, [isValidationError, isSubmit, formValues]);

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
      <h3 style={{ textAlign: "center", color: "#e45852" }}>Sign Up</h3>
      {isDuplicateUser && showAlert ? (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {`${user?.email} ${duplicateUserMsg}`}
        </Alert>
      ) : null}

      <FloatingLabel controlId="floatingInput" label="Username">
        <Form.Control
          type="text"
          name="username"
          placeholder="Username"
          value={formValues?.username}
          onChange={handleOnChange}
        />
      </FloatingLabel>
      <p style={{ color: "red", fontSize: "10px" }}>{formErrors.username}</p>
      <FloatingLabel controlId="floatingInput" label="Email address">
        <Form.Control
          type="email"
          name="email"
          placeholder="Email address"
          value={formValues?.email}
          onChange={handleOnChange}
        />
      </FloatingLabel>
      <p style={{ color: "red", fontSize: "10px" }}>{formErrors.email}</p>
      <FloatingLabel controlId="floatingPassword" label="Password">
        <Form.Control
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={formValues?.password}
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
          variant="primary"
          style={{
            width: "50%",
            marginTop: "10px",
            color: "white",
            backgroundColor: "#c05460",
            borderColor: "#c05460",
          }}
          onClick={handleOnSubmit}
        >
          Sign Up
        </Button>
        <p style={{ marginTop: "5%" }}>Already have an account? </p>
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
          onClick={handleOnLoginClick}
        >
          Login
        </Link>
      </div>
    </Container>
  );
};
