import React, { useState, useEffect } from 'react'
import Webcam from 'react-webcam';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { useSelector, useDispatch } from 'react-redux'
import { getPapers } from '../../redux/action/studentAction'
import HomeHelper from '../../Components/HomeHelper'
import { useHistory } from 'react-router-dom'


import {
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Box,
  Button,
} from "@material-ui/core";


import { makeStyles } from "@material-ui/core/styles";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";


const StudentPapers = () => {
    const useStyles = makeStyles((theme) => ({
        root: {
          flexGrow: 1,
        },
        menuButton: {
          marginRight: theme.spacing(2),
        },
        title: {
          flexGrow: 1,
        },
      }));

      const classes = useStyles();

  
      const webcamRef = React.useRef(null);
    
      const [model, setModel] = useState();
    
      
      const loadModel =  async () => {
        try {
          const model = await cocoSsd.load();
          setModel(model);
        } catch (err) {
          console.log(err);
        }
      }
    
      
      useEffect(() => {
        tf.ready().then(() => {
          loadModel();
        });
      }, []);
    
    
      const predictObject = async () => {
        const predictions = await model.detect(document.getElementById("img"));
        let cnvs = document.getElementById("myCanvas");
        cnvs.width =  webcamRef.current.video.videoWidth;
        cnvs.height = webcamRef.current.video.videoHeight;
    
        let ctx = cnvs.getContext("2d");
        ctx.clearRect(
          0,
          0,
          webcamRef.current.video.videoWidth,
          webcamRef.current.video.videoHeight
        );
    
        if (predictions.length > 0) {
          for (let n = 0; n < predictions.length; n++) {
            if (predictions[n].score > 0.8) {
              let bboxLeft = predictions[n].bbox[0];
              let bboxTop = predictions[n].bbox[1];
              let bboxWidth = predictions[n].bbox[2];
              let bboxHeight = predictions[n].bbox[3]; // - bboxTop;
    
              ctx.beginPath();
              ctx.font = "28px Arial";
              ctx.fillStyle = "red";
    
              ctx.fillText(
                predictions[n].class +
                  ": " +
                  Math.round(parseFloat(predictions[n].score) * 100) +
                  "%",
                bboxLeft,
                bboxTop
              );
    
              ctx.rect(bboxLeft, bboxTop, bboxWidth, bboxHeight);
              ctx.strokeStyle = "#FF0000";
    
              ctx.lineWidth = 3;
              ctx.stroke();
    
              console.log("detected");
            }
          }
        }
    
        setTimeout(() => predictObject(), 500);
      }
    
     
      const videoConstraints = {
        height: 1080,
        width: 1920,
        maxWidth: "100vw",
        facingMode: "environment",
      };

      //above code of Object detection in real time

    const {
        
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
      } = useSpeechRecognition();
    
    //   if (!browserSupportsSpeechRecognition) {
    //     return <span>Browser doesn't support speech recognition.</span>;
    //   }


    const store = useSelector(store => store)
    const history = useHistory()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getPapers())
    }, [])



    return (

        <>
            {store.student.isAuthenticated ? <>
                <HomeHelper />


                <div
      style={{
        width: "100%",
        height: "100%",
        
       
      }}
    >
      <AppBar position="static">
       
      </AppBar>

    
      <Grid
        container
        style={{
          height: "100vh",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          padding: 10,
        }}
      >
        <Grid
          item
          xs={12}
          md={12}
          style={{
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <>
            <Box mt={1} />
            {
              <Button
                variant={"contained"}
                style={{
                  
                  color: "white",
                  backgroundColor:"#003b67",
                  width: "100%",
                  maxWidth: "250px",
                 
                }}
                onClick={() => {
                  predictObject()
                }}
              >
                Start Detect
              </Button>
            }
            <Box mt={2} />{" "}
          </>
          <div style={{ position: "absolute", top: "200px", zIndex: "9999" }}>
            <canvas
              id="myCanvas"
              width={640}
              height={480}
              style={{ backgroundColor: "transparent" }}
            />
          </div>
          <div style={{ position: "absolute", top: "400px" }}>
            <Webcam
              audio={false}
              id="img"
              ref={webcamRef}
              screenshotQuality={1}
              screenshotFormat="image/jpeg"
              videoConstraints={videoConstraints}
            />
          </div>
        </Grid>
        <Grid item xs={12} md={12}></Grid>
      </Grid>
    </div>







               
                <div className="container" style={{marginTop:"500px", marginLeft:"15px"}}>
           
                    {store.student.allMarks.CycleTest1 && 
                        <div className="row mt-3">
                    
                         
    <br/>
   


                            <div className="col-md-8 m-auto">
                            <div style={{widht:"20px", height:"40ox"}}>
      <p>Microphone: {listening ? 'on' : 'off'}</p>
      <button onClick={SpeechRecognition.startListening}>Start</button>
      <button onClick={SpeechRecognition.stopListening}>Stop</button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
    </div>
                                {store.student.allMarks.CycleTest1.length !== 0 ? <>
                                    <h4>Exam</h4>
                                    <table className="table border">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No</th>
                                                <th scope="col">Subject Code</th>
                                                <th scope="col">Subject Name</th>
                                                <th scope="col">Total Marks</th>
                                                <th scope="col">Exam</th>
                                               
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                store.student.allMarks.CycleTest1.map((res, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{res.subject.subjectCode}</td>
                                                        <td>{res.subject.subjectName}</td>
                                                        <td>{res.totalMarks}</td>
                                                        <td><a target="_blank" href={res.exam} >{res.exam}</a></td>
                                                       
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table></> : null}
                            </div>
                        </div>


                    }

                    {store.student.allMarks.CycleTest2 &&
                        <div className="row mt-3">
                            <div className="col-md-8 m-auto">
                                {store.student.allMarks.CycleTest2.length !== 0 ? <>
                                    <h4>Cycle Test 2</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No</th>
                                                <th scope="col">Subject Code</th>
                                                <th scope="col">Subject Name</th>
                                                <th scope="col">Obtained Marks</th>
                                                <th scope="col">Total Marks</th>
                                                <th scope="col">Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                store.student.allMarks.CycleTest2.map((res, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{res.subject.subjectCode}</td>
                                                        <td>{res.subject.subjectName}</td>
                                                        <td>{res.marks}</td>
                                                        <td>{res.totalMarks}</td>
                                                        <td>{(res.marks / res.totalMarks) * 100}%</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table></> : null}
                            </div>
                        </div>
                    }

                    {store.student.allMarks.Semester &&
                        <div className="row mt-3">
                            <div className="col-md-8 m-auto">
                                {store.student.allMarks.Semester.length !== 0 ? <>
                                    <h4>Semester</h4>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th scope="col">S.No</th>
                                                <th scope="col">Subject Code</th>
                                                <th scope="col">Subject Name</th>
                                                <th scope="col">Obtained Marks</th>
                                                <th scope="col">Total Marks</th>
                                                <th scope="col">Percentage</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                store.student.allMarks.Semester.map((res, index) =>
                                                    <tr key={index}>
                                                        <th scope="row">{index + 1}</th>
                                                        <td>{res.subject.subjectCode}</td>
                                                        <td>{res.subject.subjectName}</td>
                                                        <td>{res.marks}</td>
                                                        <td>{res.totalMarks}</td>
                                                        <td>{((res.marks / res.totalMarks) * 100).toFixed(2)}%</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </table></> : null}
                            </div>
                        </div>

                    }
                </div></> : (history.push('/'))}

        </>

    )
}

export default StudentPapers
