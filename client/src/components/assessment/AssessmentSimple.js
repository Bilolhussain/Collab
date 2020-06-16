import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createAssessment } from "../../actions/authActions";
import classnames from "classnames";
import { Container, Row, Col } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import UserNavbar from "../dashboard/UserNavbar.js";
// import { notify } from 'react-notify-toast'
// import { API_URL } from './../../config'
import { Button } from '@material-ui/core';
// import './register.css';

class AssessmentSimple extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      uAge:  "",
      // email: "email",
      uCountry: "",
      id: this.props.auth.user.id
    };
  }

    componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    // const userId = this.props.auth.user.id;
    // console.log(userId);
    if (this.props.auth.firstLogin) {
      this.props.history.push("/dashboard");
    }
  }

  // componentWillUpdate(){
  //   this.setState({id: this.props.auth.user.id});
  // }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };


  onSubmit = e => {
     e.preventDefault();

    // const { user } = this.props.auth;
    // const userId = user.id; 

    const  newAssessment = {
      uAge: this.state.uAge,
      id: this.state.id,
      uCountry: this.state.uCountry
    };

    // axios({
    //   url: '/api/users/dashboard',
    //   method: 'POST',
    //   data: user.email
    //   }).then(this.props.history.push("/dashboard")).catch(err => 
    //     console.log(err))
    
    //  axios.post("/api/users/assessment", newAssessment)
    // .then(this.props.history.push("/dashboard")).catch(err => 
    //  console.log(err))
    
    this.props.createAssessment(newAssessment, this.props.history)
  }
    // fetch(`${API_URL}/email`, {
    //   method: 'pOSt',
    //   headers: {
    //     aCcePt: 'aPpliCaTIon/JsOn', 
    //     'cOntENt-type': 'applicAtion/JSoN'
    //   },
    //   body: JSON.stringify({ email: this.email.value })
    // })
    // .then(res => res.json())  
    // .then(data => {
      
    //   // Everything has come back successfully, time to update the state to 
    //   // reenable the button and stop the <Spinner>. Also, show a toast with a 
    //   // message from the server to give the user feedback and reset the form 
    //   // so the user can start over if she chooses.
    //   this.setState({ sendingEmail: false})
    //   // notify.show(data.msg)
    //   this.form.reset()
    // })
    // .catch(err => console.log(err))


  render() {
    // const { errors } = this.state;
    

    return (
      <div>
        <UserNavbar />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <form onSubmit={this.onSubmit}>
                        <h4 style={{ fontFamily: "Montserrat", "font-size": "40px", "margin-top": "50px"}}>
                          <b>Welcome to Healthynox</b>
                        </h4>
                        <p style={{ fontFamily: "Montserrat", "color":"grey", "font-size": "17px", "margin-top":"15px"}}>
                          Start your mental health journey and register here.
                        </p>
                        <input
                          onChange={this.onChange}
                          // name = 'uAge'
                          // ref={input => this.uAge = input}
                          value={this.state.uAge}
                        //   error={errors.uAge} 
                          id="uAge"
                          placeholder="uAge (Provided by your workplace)"
                          style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                          type="text"
                        //   className={classnames("", {
                        //     invalid: errors.email || errors.emailnotfound
                        //   })}
                          
                        />
                         {/* <span className="red-text">
                          {errors.uAge}
                          {errors.uAgenotfound}
                        </span>  */}
                
                  <p style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "margin-top": "25px"}}>Please choose a password (6 or more characters)</p> 
                  <input
                    onChange={this.onChange}
                    value={this.state.uCountry}
                    // error={errors.password}
                    id="uCountry"
                    placeholder="uCountry"
                    style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                    type="text"
                    // className={classnames("", {
                    //   invalid: errors.password
                    // })} 
                  />

                  <input
                          onChange={this.onChange}
                          // name = 'uAge'
                          // ref={input => this.uAge = input}
                          value={this.state.email}
                        //   error={errors.uAge} 
                          id="email"
                          placeholder="email (Provided by your workplace)"
                          style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                          type="text"
                        //   className={classnames("", {
                        //     invalid: errors.email || errors.emailnotfound
                        //   })}
                          
                        />

                  {/* <span className="red-text">{errors.password}</span> */}
                
                    
                    <div>
                      <Button style={{
                            "display": "inline-block",
                            "width": "150px",
                            "borderRadius": "40px",
                            "letterSpacing": "1px",
                            "marginTop": "1rem",
                            "backgroundColor": "blue",
                            "fontFamily": "Montserrat", "color": "white", "font-size": "17px"
                          }} type="submit">
                            Submit
                      </Button>
                    </div>

                    
              </form>
            </Col>
          </Row>
        </Container>

            
      </div>        

    );
  }
}

AssessmentSimple.propTypes = {
  createAssessment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  // fetchFirstLogin: PropTypes.object.isRequired
//   errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  createAssessment: state.createAssessment,
  auth: state.auth
  // userId: state.auth.user
//   errors: state.errors
});

export default connect(
  mapStateToProps,
  { createAssessment }
)(withRouter(AssessmentSimple));