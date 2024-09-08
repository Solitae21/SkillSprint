import React, { useState, useEffect, useContext } from "react";
import {
  Navbar,
  Nav,
  Container,
  Offcanvas,
  NavDropdown,
  Button,
} from "react-bootstrap";
import { dummyCourses } from "../data/dummyCourses";
import { courseCategories } from "../data/courseCategories";
import { AuthContext } from "../hooks/AuthContext";
import { useNavigate } from "react-router-dom";
import ViewCourseModal from "./ViewCourseModal";

export default function NavbarComponent({ showSearch, enrolledCourses }) {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [viewCourseModalShow, setViewCourseModalShow] = useState(false);
  const [viewed, setViewed] = useState({});
  const { email, logout, isLoggedIn } = useContext(AuthContext);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  const [isOpenProfile, setIsOpenProfile] = useState(false);

  const toggleDropdownProfile = () => setIsOpenProfile(!isOpenProfile);
  const closeDropdownProfile = () => setIsOpenProfile(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSearch = (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term) {
      const filtered = dummyCourses.filter((course) =>
        course.courseName.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  };

  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };

  const handleView = (course) => {
    setViewed(course);
    setViewCourseModalShow(true);
  };
  return (
    <Navbar expand="lg" sticky="top" className="p-4 navbar-style">
      <Container fluid>
        <Navbar.Brand href="#home">
          <div className="logo-left">
            Skill<span className="logo-right">Sprint</span>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="offcanvasNavbar"
          onClick={handleShow}
          className="custom-toggler"
        />
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={show}
          onHide={handleClose}
          className="custom-offcanvas"
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">
              <div className="logo-left">
                Skill<span className="logo-right">Sprint</span>
              </div>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="align-items-center justify-content-end flex-grow-1 pe-3">
              {
                <div
                  className={`search-wrapper position-relative ${
                    showSearch ? "show" : ""
                  }`}
                >
                  <input
                    type="search"
                    name="search-nav"
                    id="search-nav"
                    className="search-course-nav border border-1"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearch}
                  />
                  {searchTerm && filteredCourses.length > 0 && (
                    <ul className="dropdown-menu show">
                      {filteredCourses.map((course , index) => (
                        <li key={index} onClick={()=>handleView(course)}>
                          <a className="dropdown-item" href="#">
                            {course.courseName}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              }
              <div className="custom-dropdown-container">
                <button
                  className="custom-dropdown-toggle"
                  onClick={toggleDropdown}
                >
                  Categories
                </button>
                <div
                  className={`custom-dropdown-menu ${
                    isOpen ? "custom-show" : ""
                  }`}
                >
                  {courseCategories.map((category) => (
                    <button
                      className="custom-dropdown-item"
                      onClick={closeDropdown}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
              {isLoggedIn && (
                <Nav.Link
                  href="#courses"
                  onClick={enrolledCourses}
                  className="z-3"
                >
                  <i className="bi bi-book-fill"></i>
                </Nav.Link>
              )}
              {isLoggedIn && (
                <div className="custom-dropdown-container">
                  <button
                    className="custom-dropdown-toggle"
                    onClick={toggleDropdownProfile}
                  >
                    <div className="d-flex gap-2 justify-content-center align-items-center">
                      {email}
                      <i className="bi bi-person-circle"></i>
                    </div>
                  </button>
                  <div
                    className={`custom-dropdown-menu ${
                      isOpenProfile ? "custom-show" : ""
                    }`}
                  >
                    <button
                      className="custom-dropdown-item text-secondary"
                      onClick={logout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
              {!isLoggedIn && (
                <Button
                  className="btn-secondary border-0 px-3 py-2 z-3"
                  onClick={handleSignIn}
                >
                  Login
                </Button>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
      <ViewCourseModal
        show={viewCourseModalShow}
        course={viewed}
        onHide={() => {
          setViewCourseModalShow(false);
        }}
      />
    </Navbar>
  );
}
