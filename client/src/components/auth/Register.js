import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";
import { Container, Row, Col } from 'reactstrap';
import Navbar from "../layout/Navbar";
import './register.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      currentStep: 1,
      name: "",
      email: "",
      password: "",
      password2: "",
      // dob: "",
      // gender: "",
      // ethgroup: "",
      // prelanguage: "",
      // condition: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
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

  onSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      // dob: this.state.dob,
      // gender: this.state.gender,
      // ethgroup: this.state.ethgroup,
      // prelanguage: this.state.prelanguage,
      // condition: this.state.condition
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;


    return (
      <div>
        <Navbar />
        <div className="container" style={{"margin": "150px auto", postion: "center"}}>
          <Container>
            <Row>
              <Col sm="12" md={{ size: 6}}>
                <h4 style = {{fontFamily: "Monserrat Bold", "font-size": "40px", "left": "0px" }}>
                    <b style = {{"left": "100px"}}>Welcome to Healthynox</b> 
                </h4>
                <p>
                  Start your mental health journey with healthynox and register
                </p>

              </Col>
            </Row>

            <form noValidate onSubmit={this.onSubmit}>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }} >
                  <div className="input-field col s6" style={{"background-color": "white","border-radius": "25px", "border": "2rm", "border-style": "solid", "border-color": "black"}}>
                    <input
                      onChange={this.onChange}
                      value={this.state.name}
                      error={errors.name}
                      id="name"
                      type="text"
                      className={classnames("", {
                        invalid: errors.name
                      })}
                    />
                    <label htmlFor="name">Name</label>
                    <span className="red-text">{errors.name}</span>
                  </div>
                </Col >
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <div className="input-field col s6" style={{"background-color": "white","border-radius": "25px", "border": "2rm", "border-style": "solid", "border-color": "black"}}>
                        <input
                          onChange={this.onChange}
                          value={this.state.email}
                          error={errors.email} 
                          id="email"
                          type="email"
                          className={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                          })}
                        />
                        <label htmlFor="email" style={{ fontFamily: "Monserrat Bold"}}>Email</label>
                         <span className="red-text">
                          {errors.email}
                          {errors.emailnotfound}
                        </span> 
                        </div>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <div className="input-field col s6" style={{"background-color": "white","border-radius": "25px", "border": "2rm", "border-style": "solid", "border-color": "black"}}>
                  <input
                    onChange={this.onChange}
                    value={this.state.password}
                    error={errors.password}
                    id="password"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password
                    })}
                  />
                  <label htmlFor="password">Password</label>
                  <span className="red-text">{errors.password}</span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <div className="input-field col s6" style={{"background-color": "white","border-radius": "25px", "border": "2rm", "border-style": "solid", "border-color": "black"}}>
                  <input
                    onChange={this.onChange}
                    value={this.state.password2}
                    error={errors.password2}
                    id="password2"
                    type="password"
                    className={classnames("", {
                      invalid: errors.password2
                    })}
                  />
                  <label htmlFor="password2">Confirm Password</label>
                  <span className="red-text">{errors.password2}</span>
                </div>
                </Col>
              </Row>
                <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                  <button
                    style={{
                      width: "150px",
                      borderRadius: "3px",
                      letterSpacing: "1.5px",
                      marginTop: "1rem"
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                  >
                    Sign up
                  </button>
                </div>
              </form>
          </Container>
        </div>
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
