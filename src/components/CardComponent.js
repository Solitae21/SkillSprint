import React from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import DefaultPic from "../assets/img/redcolor.png";
import { Spinner } from "react-bootstrap";


export default function CardComponent({ thumbnail ,courseName, instructor, isEnrolled, handleEnroll, handleView , loading }) {
    const courseDetails = {
        courseName: courseName,
        instructor: instructor,
        thumbnail: thumbnail
    }
  return (
    <Card className="rounded-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src={thumbnail || DefaultPic} style={{ height: "10rem" }}/>
      <Card.Body className="bg-primary text-white d-flex flex-column">
        <Card.Title className="fw-bold">{courseName}</Card.Title>
        <Card.Text className="flex-fill">{instructor}</Card.Text>
        <div className="d-flex align-items-end w-100">
          {!loading && <Button className="btn-secondary rounded-5 border-0 flex-fill py-3 fw-bold" onClick={isEnrolled === "no" ? ()=>{handleEnroll(courseDetails)} : ()=>{handleView(courseDetails)}}>
            {isEnrolled === "no" ? "Enroll" : "View"}
          </Button>}
          {loading && <Button className="btn-secondary rounded-5 border-0 flex-fill py-3 fw-bold" disabled>
            <Spinner animation="border" size="sm" />
          </Button>}
        </div>
      </Card.Body>
    </Card>
  );
}
