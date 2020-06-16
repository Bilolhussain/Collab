import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { logoutUser } from "../../actions/authActions";
import { createAssessment } from "../../actions/authActions";
import './Assessment.css';
import UserNavbar from "../dashboard/UserNavbar.js";
import {Row, Col, Container} from 'reactstrap';


class Assessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      uAge:  '',
      uGender: '',
      uCountry: '',
      id: this.props.auth.user.id

      // uMotivation: '',
      // uOrientation: '',
      // uRelationShip: '',
      // uReligious: '',
      // uSpiritual: '',
      // uHistory: '',
      // tGender: '',
      // uPersonalRating: '',
      // uFeeling: '',
      // uBothered: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange = e => {
  
    this.setState({ [e.target.id]: e.target.value }); 
  }
   
  handleSubmit = event => {
    event.preventDefault()
    // const newAssessment = new FormData();
    // newAssessment.append('uAge', this.state.uAge);
    // newAssessment.append('uGender', this.state.uGender);
    // newAssessment.append('uCountry', this.state.uCountry);
    // newAssessment.append('id', this.state.id);
    const  newAssessment = {
      uAge: this.state.uAge,
      id: this.state.id,
      uCountry: this.state.uCountry,
      uGender: this.state.uGender
    };

    this.props.createAssessment(newAssessment, this.props.history)
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.firstLogin) {
      this.props.history.push("/dashboard");
    }
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

/*
* the functions for our button
*/
previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn btn-secondary" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}
  
  render() {    
  //  const { user } = this.props.auth;

    return (
      <React.Fragment>
        <UserNavbar/>
        <Container>
        <Row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <h4 style={{"marginTop": "80px"}}>
              <b style={{fontSize: "30px", fontFamily: "Montserrat"}}>Welcome to Healthynox!</b>
              </h4>
              <p className="flow-text grey-text text-darken-1" style={{fontFamily: "Montserrat"}}> 
                  Who are you?{" "}
              </p>
              
          
      <form onSubmit={this.handleSubmit}>
      {/* 
        render the form steps and pass required props in
      */}
        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          uAge={this.state.uAge}
        />
        <Step2 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          uGender={this.state.uGender}
        />
        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          uCountry={this.state.uCountry}
        // />
        // <Step4 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step5 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step6 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step7 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step8
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step9 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step10 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step11 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step12 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step13
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step14
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step15 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step16 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step17 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step18
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step19 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step20 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step21
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step22
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step23 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step24 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step25 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step26 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step27 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step28 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step29 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step30 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step31 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step32
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        // />
        // <Step33 
        //   currentStep={this.state.currentStep} 
        //   handleChange={this.handleChange}
        //   password={this.state.counter}
        />
        {this.previousButton()}
        {this.nextButton()}

      </form>
      </Col>
        </Row>
        </Container>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <Container>
      <Row>
        <Col sm="12" md={{ size: 6, offset: 0 }}>

          <div className="form-group">
          <label htmlFor="uAge">Enter your age</label>
          <input
            className="form-control"
            id="uAge"
            name="uAge"
            type="text"
            placeholder="Enter Age"
            value={props.uAge}
            onChange={props.handleChange}
            style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px", "marginLeft": "-10px"}}
            />
        </div>
        {/* <br/> */}
        {/* <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            className="form-control"
            id="email"
            name="email"
            type="text"
            placeholder="Enter email"
            value={props.email}
            onChange={props.handleChange}
            style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px", "marginLeft": "-10px"}}
            />
        </div> */}
        </Col>
      </Row>
      
     </Container>
    

  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="uGender">Your Gender</label>
      <input
        className="form-control"
        id="uGender"
        name="uGender"
        type="text"
        placeholder="Enter uGender"
        value={props.uGender}
        onChange={props.handleChange}
        />
    </div>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return(
    <React.Fragment>
    <div className="form-group">
      <label htmlFor="uCountry">Your country</label>
      <input
        className="form-control"
        id="uCountry"
        name="uCountry"
        type="uCountry"
        placeholder="Enter Your Country"
        value={props.uCountry}
        onChange={props.handleChange}
        />      
    </div>
    <button type="submit" className="btn btn-success btn-block">Submit</button>
    </React.Fragment>
  );
}
 
Assessment.propTypes = {
  createAssessment: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  createAssessment: state.createAssessment
});

export default connect(
  mapStateToProps,
  { createAssessment }
)(withRouter(Assessment));
                