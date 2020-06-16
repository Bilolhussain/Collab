import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Container, Row, Col } from 'reactstrap';
// import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Navbar from "../layout/Navbar";
// import { notify } from 'react-notify-toast'
// import { API_URL } from './../../config'
import { Button } from '@material-ui/core';
import './register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      fileimg: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    // if (this.props.auth.isAuthenticated && this.props.auth.FirstLogin) {
    //   this.props.history.push("/assessment");
    // }else if(this.props.auth.isAuthenticated && !this.props.auth.FirstLogin){
    //   this.props.history.push("/dashboard");
    // }
      if(this.props.auth.isAuthenticated){
        this.props.history.push("/dashboard");
      }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  fileSelectedHandler = event => {
    this.setState({fileimg: event.target.files[0]
    })
  }

  onSubmit = e => {
    e.preventDefault();

    const newUser = new FormData();
    newUser.append('firstName', this.state.firstName);
    newUser.append('lastName', this.state.lastName);
    newUser.append('email', this.state.email);
    newUser.append('password', this.state.password);
    newUser.append('password2', this.state.password2);
    newUser.append('uploadimg', this.state.fileimg);

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

    // const newUser = {
    //   firstName: this.state.firstName,
    //   lastName: this.state.lastName,
    //   email: this.state.email,
    //   password: this.state.password,
    //   password2: this.state.password2,
    //   fileimg: this.state.fileimg
      // dob: this.state.dob,
      // gender: this.state.gender,
      // ethgroup: this.state.ethgroup,
      // prelanguage: this.state.prelanguage,
      // condition: this.state.condition
    // };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />
        <Container>
          <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
                <form enctype ="multipart/form-data" method="POST" action="/register" noValidate onSubmit={this.onSubmit}  >
                        <h4 style={{ fontFamily: "Montserrat", "font-size": "40px", "margin-top": "50px"}}>
                          <b>Welcome to Healthynox</b>
                        </h4>
                        <p style={{ fontFamily: "Montserrat", "color":"grey", "font-size": "17px", "margin-top":"15px"}}>
                          Start your mental health journey and register here.
                        </p>
                        <input
                          onChange={this.onChange}
                          name = 'email'
                          // ref={input => this.email = input}
                          value={this.state.email}
                          error={errors.email} 
                          id="email"
                          placeholder="Email (Provided by your workplace)"
                          style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                          type="email"
                          className={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                          })}
                          
                        />
                         <span className="red-text">
                          {errors.email}
                          {errors.emailnotfound}
                        </span> 
                
                  <p style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "margin-top": "25px"}}>Please choose a password (6 or more characters)</p> 
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    placeholder="Password"
                    style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })} 
                  />
                  <span className="red-text">{errors.password}</span>
                
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    placeholder="Confirm Password"
                    style={{ fontFamily: "Montserrat", "margin-top": "5px", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })} />
                  <span className="red-text">{errors.password2}</span>
               
                    <p style={{ fontFamily: "Montserrat","margin-left": "25%" , "margin-top": "5px","color": "grey", "font-size": "17px"}}>Who are you?</p>
                    <input
                      onChange={this.onChange}
                      value={this.state.firstName}
                      error={errors.firstName}
                      id="firstName"
                      placeholder="First Name"
                      style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                      type="text"
                      className={classnames("", {
                        invalid: errors.firstName
                      })}  />
                    <span className="red-text">{errors.firstName}</span>
                
                    <input
                      onChange={this.onChange}
                      value={this.state.lastName}
                      error={errors.lastName}
                      id="lastName"
                      placeholder="Last Name"
                      style={{ fontFamily: "Montserrat", "margin-top": "10px", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                      type="text"
                      className={classnames("", {
                        invalid: errors.lastName
                      })} />
                    <span className="red-text">{errors.lastName}</span>
                
                    <div>
                      <Button style={{"border-radius":"30px", "margin-top": "10px", "display": "inline-block", "border":"solid"}}>
                        <input type="file" id="fileimg" class="hidden" name="uploadimg" onChange={this.fileSelectedHandler} defaultValue={this.state.file}
                      style={{"background-color": "blue", "border-style": "solid",  "display": "none", "padding": "6px 12px"}} />
                      <label for="fileimg" style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "16px"}} >Upload Picture</label>
                      </Button>
                    </div>
                    
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
                            Register
                      </Button>
                    </div>

                      

                  {/* <button
                    style={{
                      width: "150px",
                      borderRadius: "40px",
                      letterSpacing: "1px",
                      marginTop: "1rem",
                      fontFamily: "Montserrat", "color": "white", "font-size": "17px"
                    }}
                    type="submit" 
              
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Register
                  </button> */}
              </form>
            </Col>
          </Row>
        </Container>

            
      </div>        

    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
