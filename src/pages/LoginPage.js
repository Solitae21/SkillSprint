import React, { useState, useEffect, useContext } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { AuthContext } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 768);
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AuthContext);
  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get('email');
    login(email);
    navigate('/');
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className="h-100 w-100">
      <Container fluid className="h-100 w-100">
        <Row className="h-100 w-100">
          {!isSmallScreen && (
            <Col
              className="bg-login text-white sm-screen d-flex justify-content-center align-items-center px-5"
              md={5}
            >
              <div>
                <h1 className="animate">Master new skills.</h1>
                <h1 className="animate2">Learn wherever you are.</h1>
                <p className="animate3">Empower your journey and unlock a world of opportunities.</p>
              </div>
            </Col>
          )}
          <Col className="bg-primary py-5" xs={12} md={7}>
            <form
              onSubmit={handleSubmit}
              className="w-100 h-100 d-flex flex-column justify-content-center align-items-center gap-5"
            >
              <div className="text-center pointer" onClick={()=>navigate("/")}>
                <span className="logo-left fs-1">
                  Skill<span className="logo-right">Sprint</span>
                </span>
              </div>
              <h1 className="text-white fw-normal">Login Account</h1>
              <div className="d-flex flex-column w-100 justify-content-center align-items-center gap-4">
                <div className="d-flex flex-column w-75">
                  <label className="text-secondary">Email address</label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-box mt-1"
                    required
                  />
                </div>
                <div className="d-flex flex-column w-75">
                  <label className="text-secondary">Password</label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    className="input-box mt-1"              
                    required
                  />
                  <Button onClick={handleShowPassword}>Show</Button>
                </div>
              </div>
              <Button
                type="submit"
                className="rounded-5 px-4 py-2 bg-secondary border-0"
              >
                Login
              </Button>
              <div className="d-flex flex-column w-50 text-center text-white fw-light gap-2">
                <p>
                  Don't have an account?{" "}
                  <span className="underline text-secondary pointer" onClick={()=>navigate("/register")}>
                    Register here
                  </span>
                </p>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
