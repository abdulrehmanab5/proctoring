
import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import Navbar from './Navbar'
import Footer from './Footer'
import Aboutusupdate from './Aboutusupdate'


function Aboutus() {
    return (
        <>
        <Row>
        <Navbar/>
        <div style={{paddingTop:'75px'}}>
            <h1 className="text-center">{("Proctoring System")}</h1>
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col lg={6}>
                        <h2 className="text-break">{("Mission")}</h2>

                        <h4 className="semiBold">Automated platform for online examination system</h4>
                        <h2 className="extraBold">Creativity of proctoring</h2>
                        <p className="">
                        Our website will be an upgrade version of zoom due to Covid-19 many people went through online examination which was not precise at that moment but our aim is to make it precise as much as we can so that in any case we can have a better online examination system.
                        </p>
                        <Row className="d-flex justify-content-center" >
                            <div style={{ width: "190px" }}>
                                <Button title="Get Started">Get Started</Button>
                            </div>
                            <div style={{ width: "190px", marginLeft: "15px" }}>
                                <Button title="Contact Us" border >Contact US</Button>
                            </div>
                        </Row>

                    </Col>
                    {/* <Col lg={1}>

                    </Col> */}
                    <Col lg={6}>
                        <img 
                            className="d-block w-100 mb-3"
                            src="/assets/images/mission.png"
                            alt="mission"

                        />
                    </Col>
                </Row>

                <Row className="d-flex justify-space between">
                    <Col lg={6}>
                        <img
                            className="d-block w-100 mb-3"
                            src="/assets/images/exam.png"
                            alt="mission"

                        />
                    </Col>
                    {/* <Col lg={2}>

                    </Col> */}
                    <Col lg={6}>
                        <h2 className="text-break">{("Vision")}</h2>

                        <h4 className="semiBold">Scalability of virtual examination</h4>
                        <h2 className="extraBold">Cheating Free Exam</h2>
                        <p className="">
                        To acquire transparency and to judge actual skills of students where he or she is standing. Our broad vision was to normalize merit by taking these small initiatives.OPP is also able to include authentification of the examinee’s identity to verify that this is the actual person taking the examination
                        </p>
                        <p className="">
                        To acquire transparency and to judge actual skills of students where he or she is standing. Our broad vision was to normalize merit by taking these small initiatives
                        </p>
                        <Row className="d-flex justify-content-center" >
                            <div style={{ width: "190px" }}>
                                <Button title="Get Started">Get Started</Button>
                            </div>
                            <div style={{ width: "190px", marginLeft: "15px" }}>
                                <Button title="Contact Us" border >Contact US</Button>
                            </div>
                        </Row>

                    </Col>
                </Row>
            </Container>
        </div>

<section>
    <Aboutusupdate/>
</section>

        <section>
            <Footer/>
        </section>
        </Row>
        </>
    );
}
export default Aboutus;