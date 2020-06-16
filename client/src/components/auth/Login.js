import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Navbar from "../layout/Navbar";
import { Container, Row, Col } from 'reactstrap';
import { Button } from '@material-ui/core';
import './login.css';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      // firstlogin: true
      errors: {}
    };
    // onChange = bind.this.onChange()
    // this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
    // if (this.props.auth.isAuthenticated && this.props.auth.FirstLogin) {
    //   this.props.history.push("/assessment");
    // }else if(this.props.auth.isAuthenticated && !this.props.auth.FirstLogin){
    //   this.props.history.push("/dashboard");
    // }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    
    this.setState({ [e.target.id]: e.target.value });
    // this.setState({value: e.target.value});
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div>
        <Navbar />

        <Container>
            <Row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <h4 style={{ fontFamily: "Montserrat", "font-size": "40px", "margin-top": "50px"}}>
                <b>Welcome to Healthynox</b>
              </h4>
               <p style={{ fontFamily: "Montserrat", "color":"grey", "font-size": "17px", "margin-top":"15px"}}>
                          Start your mental health journey and register here.
                        </p>
              <form noValidate onSubmit={this.onSubmit}>
              {/* <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}> */}
                  <input
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    placeholder="Email"
                    // defaultValue= {tahis.state.email}
                    style={{ fontFamily: "Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                    id="email"
                    type="email"
                    className={classnames("", {
                      invalid: errors.email || errors.emailnotfound
                    })} 
                  />
                  {/* <label htmlFor="email" style={{ fontFamily: "Monserrat Bold"}}>Email</label> */}
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                  {/* </div> */}
                {/* </Col>
              </Row>
              
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}> */}
                      <input
                        onChange={this.onChange}
                        value={this.state.password}
                        error={errors.password}
                        id="password"
                        placeholder="Password"
                        style={{ fontFamily:"Montserrat", "color": "grey", "font-size": "17px", "background-color": "white", "border-radius": "25px", "width": "400px","border": "2rm",
                     "border-style": "solid", "border-color": "black", "display": "inline-block", "padding": "6px 12px"}}
                        type="password"
                        className={classnames("", {
                          invalid: errors.password || errors.passwordincorrect
                        })}
                      />
                      {/* <label htmlFor="password" style={{ fontFamily: "Monserrat Bold"}}>Password</label> */}
                      <span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                      </span>
                {/* </Col>
              </Row> */}
             
              {/* <div className="col s12" style={{ paddingLeft: "11.250px" }}> */}
                <button
                  style={{
                    width: "150px",
                    borderRadius: "40px",
                    letterSpacing: "1.5px",
                    marginLeft: "1px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign in
                </button>
                <br/>
                <br/>
                <Link to="/" style={{ fontFamily: "Montserrat"}}>
                  Forgot password?
                </Link>
                <p className="grey-text text-darken-1" style={{ fontFamily: "Montserrat"}}>
                New to Healthynox? <Link to="/register" style={{ fontFamily: "Montserrat"}}>Register now</Link>
                </p>
              {/* </div> */}
            </form>
            </Col>
          </Row>
        </Container>
          
              

      
          </div>
      
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
