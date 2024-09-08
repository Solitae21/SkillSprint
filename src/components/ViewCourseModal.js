import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import React from "react";

export default function ViewCourseModal(props) {
  const { course } = props;
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton ></Modal.Header> */}
      <Modal.Body className="text-center bg-primary text-white p-5">
        <img src={course.thumbnail} alt="thumbnail" width={"300px"}/>
        <h4 className="py-3">{course.courseName}</h4>
        <p>{course.instructor}</p>
        <Button onClick={()=>props.handleEnroll(course)}>Enroll</Button>
        <Button
          onClick={props.onHide}
          className="btn-secondary px-3 py-2 rounded-5 border-0"
        >
          Close
        </Button>
      </Modal.Body>
    </Modal>
  );
}
