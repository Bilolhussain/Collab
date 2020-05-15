import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import Navbar from "../layout/Navbar";
import { Container, Row, Col } from 'reactstrap';


class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
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
        
        <div className="container" style={{"margin": "auto", postion: "center"}}>
        <div style={{ marginTop: "4rem" }} className="row">
          <div className="col s8 offset-s2">
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4 style={{ fontFamily: "Monserrat Bold", "font-size": "40px"}}>
                <b>Welcome to Healthynox</b>
              </h4>
              <p style={{ fontFamily: "Monserrat Bold"}}>
                Continue your mental health journey and sign in.
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
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
                          invalid: errors.password || errors.passwordincorrect
                        })}
                      />
                      <label htmlFor="password" style={{ fontFamily: "Monserrat Bold"}}>Password</label>
                      <span className="red-text">
                        {errors.password}
                        {errors.passwordincorrect}
                      </span>
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
                  Sign in
                </button>
                <br/>
                <br/>
                <Link to="/" style={{ fontFamily: "Monserrat Bold"}}>
                  Forgot password?
                </Link>
                <p className="grey-text text-darken-1" style={{ fontFamily: "Monserrat Bold"}}>
                New to Healthynox? <Link to="/register">Register now</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
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
