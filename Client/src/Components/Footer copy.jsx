import React from 'react'
import {
    Container,
    Row,
    Col,
   
  } from "react-bootstrap";
export default function Footer() {
  return (
   <>
   <footer style={{backgroundColor:'#003b67'}} className="footer py-5 text-white ">
        <div style={{textAlign:'center', width:'90%', padding:'10px 10px',margin:'auto'}}>
        <strong className="text-uppercase">Contact Us</strong>
        <p>To find out the cheating free exams with face detection of any movement</p>
        </div>
   
        <Container className="text-start px-5">
          <Row>
            <Col xs={6} md={4} className=" mt-md-0 mt-3">
              <strong className="text-uppercase">Services</strong>
              <p></p>
              <p>
              Best writing freelance services online. Outsource your writing project and get it quickly done and delivered remotely online
              </p>
            </Col>

            <Col xs={6} md={4} className="mt-md-0 mt-3">
              <strong class="text-uppercase">Explore</strong>
              <p></p>
              <p>Face Detection</p>
              <p>Eyes Movement Detection</p>
              <p>object detection</p>
              <p>Alarm</p>
            </Col>

            <Col md={4} className="mt-md-0 mt-3">
              <strong class="text-uppercase">Get our Services for exam</strong>
              <p></p>
            </Col>
          </Row>
        </Container>
      </footer> 
   
   </>
  )
}
