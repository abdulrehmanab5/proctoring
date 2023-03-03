
import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";


function Aboutus() {
    return (
        <div>
           
            <div style={{textAlign:'center', width:'60%', padding:'70px 0',margin:'auto', color:'black'}}>
            <h1 className="text-center">{("OUR SERVICE")}</h1>
            <p  className="text-center" style={{fontWeight: "bold"}} >
            Our website allows an invigilator to create a session in which he/she will conduct the meeting regarding the exam. After that it’s up to invigilator if he/she wants to examine or not. Student will join the meeting and will give his/her exam and our website will be monitoring him/her all the time and if he/she will do anything suspicious he/she will be warned our exam will be cancelled.
                        </p>
            </div>
            
            <Container>
                <Row className="d-flex justify-content-center">
                    <Col lg={4}>
                    <div className="card border-dark mb-3">
  <img src="/assets/images/facedetect.png" className="card-img-top" alt='....' style={{height:'270px'}} />
  <div className="card-body">
    <h5 className="card-title">Face Detection</h5>
    <p className="card-text">
  The user will be sitting in front of the camera and the application will detect the face of the user, if there are more than one faces or if no faces are detected the system will generate the alarm or if there is no face detection happened for a long/specific period the user will be removed from the meeting.
</p>
    
    {/* <a href={{}} rel="noreferrer" target="_blank" className="btn btn-sm btn-secondary">Read more</a> */}
  </div>
</div>
                    </Col>
                    <Col lg={4}>
                    <div className="card border-dark mb-3">
  <img src="/assets/images/eye.png" className="card-img-top" alt='....' style={{height:'270px'}} />
  <div className="card-body">
    <h5 className="card-title">Gaze Detection</h5>
    <p className="card-text">
  The user will be sitting in front of the camera and the application will be monitoring the gazes of the user. Is the application detects unusual gazing behavior of the user/student it will generate the alarm that will be alert the evaluator/teacher/examiner that is monitoring the meeting.

</p>
    
    {/* <a href={{}} rel="noreferrer" target="_blank" className="btn btn-sm btn-secondary">Read more</a> */}
  </div>
</div>
                    </Col>
                    <Col lg={4}>
                    <div className="card border-dark mb-3">
  <img src="/assets/images/bell.png" className="card-img-top" alt='....' style={{height:'270px'}} />
  <div className="card-body">
    <h5 className="card-title">Alarm Generation</h5>
    <p className="card-text">
the generation of alarm that alerts the examiner that is examining the user in the meeting. If the system detects any violation of the policies, or rules of the meeting it will trigger the alarm and it may remove the user from the meeting.
Alarm will notify the instructor and show student cheating to instructor

</p>
    
    {/* <a href={{}} rel="noreferrer" target="_blank" className="btn btn-sm btn-secondary">Read more</a> */}
  </div>
</div>
                    </Col>
                    <Col lg={4}>
                    <div className="card border-dark mb-3">
  <img src="/assets/images/objmove.png" className="card-img-top" alt='....'  style={{height:'270px'}} />
  <div className="card-body">
    <h5 className="card-title">Movements Detection</h5>
    <p className="card-text">
  wide-angle camera image as input and computes the difference between consecutive images within a local field. The motion segmenter then uses a region-growing technique to identify contiguous blocks of motion within the difference image

</p>
    
    {/* <a href={{}} rel="noreferrer" target="_blank" className="btn btn-sm btn-secondary">Read more</a> */}
  </div>
</div>
                    </Col>
                    <Col lg={4}>
                    <div className="card border-dark mb-3">
  <img src="/assets/images/object.png" className="card-img-top" alt='....' style={{height:'270px'}} />
  <div className="card-body">
    <h5 className="card-title">Objects Detection</h5>
    <p className="card-text">
   the user/student is using any device such as mobile phone etc. it will detect the object and generate the alarm to alert the evaluator/examiner that is monitoring the students. This feature will ensure that the user/student is not using any cheating device.

</p>
    
    {/* <a href={{}} rel="noreferrer" target="_blank" className="btn btn-sm btn-secondary">Read more</a> */}
  </div>
</div>
                    </Col>
                    <Col lg={4}>
                    <div className="card border-dark mb-3">
  <img src="/assets/images/abnormal.png" className="card-img-top" alt='....'  style={{height:'270px'}}/>
  <div className="card-body">
    <h5 className="card-title">Unusual Behaviour Detection</h5>
    <p className="card-text"> the OpenPose pose estimation algorithm extracts the 2D skeleton coordinates of the human body, and then the depth information of joint points will obtained using a monocular camera-based depth estimation method. the instructor notify by his account

</p>
    
    {/* <a href={{}} rel="noreferrer" target="_blank" className="btn btn-sm btn-secondary">Read more</a> */}
  </div>
</div>
                    </Col>
                  
                </Row>

               
            </Container>
        </div>
    );
}
export default Aboutus;