import React, { Component } from "react";
import { Link } from "react-router-dom";
import Login from "../auth/Login";
import Navbar from "../layout/Navbar";
import './Landing.css';

class Landing extends Component {
  render() {
    return (
      <div id= "body">
        <Navbar />
      <div style={{ height: "75vh" }} className="container valign-wrapper">
        <div className="row">
          <div className="col s6 left-align">
            <h4>
              <span style={{ fontFamily: "Montserrat", "font-size": "40px" }}><b>A mental health platform created for workplaces that want to see their people thrive.</b>{" "}</span>  
            </h4>
            <p className="flow-text black-text text-darken-1" style={{ fontFamily: "Montserrat", "font-size": "22px"}}>
              Healthynox is a mental health platform that provides full-spectrum mental health services by combining online therapy sessions with digital programs and resources powered by AI. 
            </p>
            <br />


            <div className="col s6">
              <Link
                to="/"
                style={{
                  width: "180px",
                  borderRadius: "3px",
                  letterSpacing: "1.5px",
                  fontFamily: "Montserrat",
                  // "font-size": "20px",
                  "font-weight": "bold"
                  }}
              
                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
              >
                Request
              </Link>
            </div>
            
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Landing;
