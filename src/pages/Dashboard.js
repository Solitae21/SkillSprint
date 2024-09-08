import React, { useState, useEffect, useRef, useContext } from "react";
import NavbarComponent from "../components/NavbarComponent";
import { Button, Container, Spinner } from "react-bootstrap";
import CardComponent from "../components/CardComponent";
import ChipComponent from "../components/ChipComponent";
import FooterComponent from "../components/FooterComponent";
import { dummyCourses } from "../data/dummyCourses";
import EnrolledModal from "../components/EnrolledModal";
import { webDevelopmentTopics } from "../data/dummyTopics";
import { AuthContext } from "../hooks/AuthContext";
import ViewCourseModal from "../components/ViewCourseModal";

export default function Dashboard() {
  const getVisibleCount = () => {
    if (window.innerWidth >= 1200) return 8;
    if (window.innerWidth >= 992) return 4;
    if (window.innerWidth >= 768) return 4;
    return 2;
  };
  const [showSearch, setShowSearch] = useState(false);
  const [visibleCount, setVisibleCount] = useState(getVisibleCount());
  const [displayCourses, setDisplayCourses] = useState(dummyCourses);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [enrolledModalShow, setEnrolledModalShow] = useState(false);
  const [viewCourseModalShow, setViewCourseModalShow] = useState(false);
  const [viewed, setViewed] = useState({});
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const { isLoggedIn } = useContext(AuthContext);

  const sectionRef = useRef(null);

  const scrollToSection = () => {
    sectionRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      if (scrollPosition > 100) {
        setShowSearch(true);
      } else {
        setShowSearch(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setVisibleCount(getVisibleCount());
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleViewMore = () => {
    setVisibleCount((prevCount) => prevCount + getVisibleCount());
  };

  const handleEnroll = (course) => {
    setEnrolledCourses((prevEnrol) => [...prevEnrol, course]);
    setLoading(true);
    setEnrolledModalShow(true);
    setDisplayCourses((prevDisplayCourses) =>
      prevDisplayCourses.filter((crs) => crs.courseName !== course.courseName)
    );
  };

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

  const handleView = (course) => {
    setViewed(course);
    setViewCourseModalShow(true);
  };

  return (
    <div className="w-100">
      <NavbarComponent
        showSearch={showSearch}
        enrolledCourses={scrollToSection}
      />
      <section className="section1">
        <div className="h-100 w-100 px-5 d-flex flex-column justify-content-center align-items-center text-tertiary">
          <h1 className="fw-bolder animate3">Learn Fast. Learn Anywhere.</h1>
          <p className="animate3">
            Whether you're looking to pick up a new skill, advance in your
            career, or pursue a hobby, SkillSprint provides a seamless learning
            experience that fits into your busy lifestyle.
          </p>
          <div className="col-md-6 pt-3 d-flex position-relative">
            <input
              type="search"
              name="search-course"
              id="search-course"
              placeholder="Search Courses"
              className="search-course flex-fill"
              value={searchTerm}
              onChange={handleSearch}
            />
            {searchTerm && filteredCourses.length > 0 && (
              <ul className="dropdown-menu show">
                {filteredCourses.map((course, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setViewed(course);
                      setViewCourseModalShow(true);
                    }}
                  >
                    <a className="dropdown-item" href="#">
                      {course.courseName} - {course.instructor}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>
      <section>
        <Container className="py-5">
          <h3 className="text-secondary fw-bold">Popular Courses</h3>
          <div className="py-4 d-flex flex-wrap gap-3">
            {displayCourses.length === 0 && <h3>Nothing to show here.</h3>}
            {displayCourses.slice(0, visibleCount).map((val, index) => (
              <CardComponent
                key={index}
                courseName={val.courseName}
                instructor={val.instructor}
                thumbnail={val.thumbnail}
                isEnrolled={"no"}
                handleEnroll={handleEnroll}
                loading={loading}
              />
            ))}
          </div>
          {visibleCount < displayCourses.length && (
            <Button
              className="btn-secondary border-0 px-3 py-2"
              onClick={handleViewMore}
            >
              Show More
            </Button>
          )}
        </Container>
      </section>
      {isLoggedIn && (
        <section className="bg-gray" ref={sectionRef}>
          <Container className="py-5">
            <h3 className="text-secondary fw-bold">Enrolled Courses</h3>
            <div className="py-4 d-flex flex-wrap gap-3">
              {enrolledCourses.length === 0 && (
                <h3>You have no enrolled courses yet.</h3>
              )}
              {enrolledCourses.slice(0, visibleCount).map((val, index) => (
                <CardComponent
                  key={index}
                  courseName={val.courseName}
                  instructor={val.instructor}
                  thumbnail={val.thumbnail}
                  isEnrolled={"yes"}
                  handleEnroll={handleEnroll}
                  loading={loading}
                  handleView={handleView}
                />
              ))}
            </div>
            {visibleCount < enrolledCourses.length && (
              <Button
                className="btn-secondary border-0 px-3 py-2"
                onClick={handleViewMore}
              >
                Show More
              </Button>
            )}
          </Container>
        </section>
      )}
      {isLoggedIn && (
        <section>
          <Container className="py-5">
            <h3 className="text-secondary fw-bold">
              Topics you might want to explore
            </h3>
            <div className="py-4 d-flex flex-wrap gap-3">
              {webDevelopmentTopics.map((topic) => (
                <ChipComponent topicName={topic} />
              ))}
            </div>
          </Container>
        </section>
      )}
      <FooterComponent />
      <EnrolledModal
        show={enrolledModalShow}
        onHide={() => {
          setEnrolledModalShow(false);
          setLoading(false);
        }}
      />

      <ViewCourseModal
        show={viewCourseModalShow}
        course={viewed}
        handleEnroll={handleEnroll}
        onHide={() => {
          setViewCourseModalShow(false);
        }}
      />
    </div>
  );
}
