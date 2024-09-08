import React from "react";
import { Container, Row, Col } from "react-bootstrap";

export default function FooterComponent() {
  return (
    <section className="bg-primary">
      <Container className="p-5">
        <Container fluid className="pb-4">
          <Row>
            <Col md={10} className="p-0">
              <div className="d-flex fw-light gap-5">
                <ul className="footer-list m-0 p-0">
                  <li>About Us</li>
                  <li>Contact Us</li>
                  <li>Help and Support</li>
                  <li>FAQ</li>
                </ul>
                <ul className="footer-list m-0 p-0">
                  <li>Terms</li>
                  <li>Privacy Policy</li>
                  <li>Cookie Settings</li>
                  <li>Accessibility Stater</li>
                </ul>
              </div>
            </Col>
            <Col md={2} className="socials">
              <div className=" h-100 d-flex text-white justify-content-center align-items-center gap-3 fs-2">
                <a href="#facebook">
                  <i class="bi bi-facebook"></i>
                </a>
                <a href="#instagram">
                  <i class="bi bi-instagram"></i>
                </a>
                <a href="#x">
                  <i class="bi bi-twitter-x"></i>
                </a>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row>
            <Col md={10} className="p-0 d-flex justify-content-center align-items-center">
              <h4 className="logo-left flex-fill">
                Skill<span className="logo-right">Sprint</span>
              </h4>
            </Col>
            <Col md={2} className="p-0 d-flex align-items-center">
              <p className="text-white fw-lighter fs-6">
                © 2024 SkillSprint, Inc.
              </p>
            </Col>
          </Row>
        </Container>
      </Container>
    </section>
  );
}
