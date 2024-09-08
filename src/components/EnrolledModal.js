import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";

export default function EnrolledModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Modal.Header closeButton ></Modal.Header> */}
      <Modal.Body className="text-center bg-primary text-white p-5">
        <h4 className="pb-3">You've successfully enrolled in this course.</h4>
        <Button onClick={props.onHide} className="btn-secondary px-3 py-2 rounded-5 border-0">Close</Button>
      </Modal.Body>
    </Modal>
  );
}
