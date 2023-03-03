import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './design.css';
import Navbar from './Navbar'
import Footer from './Footer'
import {
    Container,
    Row,
    Col,
   
  } from "react-bootstrap";
export default function ContactUs(){
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_tc9rk54', 'template_p3pyvzx', form.current, 'dZkteMEVYBr0omWeH')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });

      alert("Message Send")
  };

  return (
    <>
    <Row>
     <Navbar/>
     
    <div className="d-flex align-items-center justify-content-center" style={{paddingTop:'100px',paddingBottom:'50px'}}>
    


    <form ref={form} onSubmit={sendEmail}>
    <img style={{width:'140px', height:'140px', marginLeft:'100px'}} src="/assets/images/aboutus.png"/>
    <br />
      <label>Name</label>
      <br/>
      <input style={{width:'320px'}} type="text" name="user_name" />
      <br/>
      <label >Email</label>
      <br/>
      <input   style={{width:'320px'}} type="email" name="user_email" />
      <br/>
      <label>Message</label>
      <br/>
      <textarea rows="4" cols="40" name="message" />
      <br/>
      <button style={{backgroundColor:"#042c60" , color:'white'}} type="submit" value="Send">Send</button>
      
    </form>

       
        </div>
        
        <section>
            <Footer/>
        </section>
       
        </Row>
        </>
   
  );
};