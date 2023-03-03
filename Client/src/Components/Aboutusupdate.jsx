
import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";


function Aboutus() {
    return (
        <div>
           
            <div style={{textAlign:'center', width:'60%', padding:'70px 0',margin:'auto'}}>
            <h1 style={{fontWeight:'bold', color:'black'}} className="text-center">{("About Us")}</h1>
           
            </div>
            
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col lg={5}>
                    <div className="card border-dark mb-3">
  <img style={{padding:'50px'  }} src="/assets/images/aboutus.png" className="card-img-top" alt='....' />
  <div style={{backgroundColor:'#eeeee4' , borderRadius:'2px 22px 2px 2px'}} className="card-body">
    <h5 className="card-title" style={{textAlign:'center', fontWeight:'bold'}}></h5>
    <p  className="card-text" >

    An online proctoring program (OPP), sometimes called remote proctoring, generally refer to a digital technique for monitoring and controlling student activities during an exam through webcams over the internet, thus preventing and detecting any possibility of malpractice through proctoring.
</p>
    
    
  </div>
</div>
                    </Col>

                    <Col lg={7}>
                    <div className="card border-dark mb-3" style={{backgroundColor:'#eeeee4', color:"black" ,borderRadius:'2px 32px 2px 2px'}}>
  <img style={{borderRadius:'2px 32px 2px 2px' , height:'470px'}} src="/assets/images/bg.png" className="card-img-top" alt='....' />
  <div className="card-body" style={{borderRadius:'2px 22px 2px 2px'}}>
  
    <p className="card-text">
    OPP can record data through an online service for storing and reviewing student behaviors during an exam. Moreover, OPP is also able to include authentification of the examinee’s identity to verify that this is the actual person taking the examination.
Online cheating detection has relatively fewer solutions, our solution will be more faster and accurate with a friendly user interface for the examinee .
</p>
    {/* <p className="card-text">
    Some have changed it to an assignment form where students can just copy and paste from the internet, while some have just canceled them outright. 
</p> */}
   
  </div>
</div>
                  </Col>

                   


                    
                  
                </Row>

               
            </Container>
        </div>
    );
}
export default Aboutus;