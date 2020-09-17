import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import AlertBox from './../layouts/AlertBox';
import { getCsrfToken } from '../../actions/authActions';
import { loginUser } from '../../actions/authActions';
import { loginWithFacebook } from '../../actions/authActions';
import { loginWithGoogle } from '../../actions/authActions';
import queryString from 'qs';
import classnames from 'classnames';
import Navbar from './../layouts/Navbar';
import Recaptcha from 'react-recaptcha';
import NotificationAlert from 'react-notification-alert';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import { fbAppId, googleClientId, recaptchaSiteKey } from '../keys/keys';
import './login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFacebookLoggedIn: false,
      facebookUserId: '',
      isGoogleLoggedIn: false,
      googleUserId: '',
      readOnly: true,
      picture: '',
      isCaptchaVerified: '',
      emailVerified: false,
      userNameOrEmail: '',
      password: '',
      _csrf: '',
      errors: {},
    };
  }

  componentDidMount() {
    this.props.getCsrfToken();

    const queryStringValues = queryString.parse(
      this.props.location.search.slice(1)
    );
    if (queryStringValues.email_verified) {
      this.setState({ emailVerified: true });
    }

    // If the user is logged in redirect him to the dashboard
    if (this.props.auth.isAuthenticated) {
      // redirect the user to the dashboard
      this.props.history.push('/dashboard');
    }
  }

  /**
   * This will run when this Register component receives props/
   * We will set the state to errors property in this.state() define above in constructor() to nextProps.errors, which will contain
   * the errors received from redux state.
   * @param nextProps
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  // When facebook button is clicked.
  componentClicked = () => {
    console.log('facebook login btn clicked');
  };

  /**
   * LOGIN VIA FACEBOOK
   * Once you get the response call the function to login the user.
   */
  responseFacebook = (response) => {
    // Check if the user has verified the Recaptcha
    if (this.state.isCaptchaVerified) {
      const { csrfToken } = this.props.auth;

      // You will get response if user successfully logs in using Facebook.
      this.setState({
        isFacebookLoggedIn: true,
        isGoogleLoggedIn: false,
        facebookUserId: response.id,
        userNameOrEmail: response.email,
        picture: response.picture.data.url,
      });
      const userData = {
        email: this.state.userNameOrEmail,
        facebookUserId: this.state.facebookUserId,
        _csrf: csrfToken,
        errors: this.state.errors,
      };

      this.props.loginWithFacebook(userData, this.props.history);
    } else {
      // Throw alert that captcha not verified.
      let options = {
        place: 'tr',
        message: 'Please verify Captcha first',
        type: 'danger',
        icon: 'now-ui-icons ui-1_bell-53',
        autoDismiss: '2',
        closeButton: true,
      };
      this.refs.notificationAlert.notificationAlert(options);
    }
  };

  /**
   * LOGIN VIA GOOGLE
   * Once you get the response call the function to login the user.
   */
  responseGoogle = (response) => {
    if (this.state.isCaptchaVerified) {
      const { csrfToken } = this.props.auth;

      // You will get response if user successfully logs in using Facebook.
      this.setState({
        isGoogleLoggedIn: true,
        isFacebookLoggedIn: false,
        googleUserId: response.googleId,
        userNameOrEmail: response.w3.U3,
        picture: response.profileObj.imageUrl,
      });
      const userData = {
        email: this.state.userNameOrEmail,
        googleUserId: this.state.googleUserId,
        _csrf: csrfToken,
        errors: this.state.errors,
      };

      this.props.loginWithGoogle(userData, this.props.history);
    } else {
      // Throw alert that captcha not verified.
      let options = {
        place: 'tr',
        message: 'Please verify Captcha first',
        type: 'danger',
        icon: 'now-ui-icons ui-1_bell-53',
        autoDismiss: '2',
        closeButton: true,
      };
      this.refs.notificationAlert.notificationAlert(options);
    }
  };

  // This function is called when the captcha is loaded.
  reCaptchaLoaded = () => {
    // console.log( 'recaptcha loaded' );
  };

  // This function is called when the user clicks on captcha
  verifyCaptchaClicked = (response) => {
    // If we get a response that means user is human and verified through captcha
    if (response) {
      this.setState({ isCaptchaVerified: true });
    }
  };

  onChange = (event) => {
    /**
     * Change the state of name property.
     * event.target.name will give you the name of the input element, and
     * event.target.value will give you the value of the input element.
     */
    this.setState({ [event.target.name]: event.target.value });
  };

  onSubmit = (event) => {
    const { csrfToken } = this.props.auth;
    console.log('came');
    event.preventDefault();

    // Check if the user has verified the Recaptcha
    if (this.state.isCaptchaVerified) {
      const userData = {
        userNameOrEmail: this.state.userNameOrEmail,
        loginPassword: this.state.password,
        _csrf: csrfToken,
        errors: this.state.errors,
      };

      this.props.loginUser(userData, this.props.history);
    } else {
      // Throw alert that captcha not verified.
      let options = {
        place: 'tr',
        message: 'Please verify Captcha first',
        type: 'danger',
        icon: 'now-ui-icons ui-1_bell-53',
        autoDismiss: '2',
        closeButton: true,
      };
      this.refs.notificationAlert.notificationAlert(options);
    }
  };

  render() {
    const { emailVerified, errors } = this.state;

    let alertBox = '',
      readOnly;
    readOnly =
      this.state.isFacebookLoggedIn || this.state.isGoogleLoggedIn
        ? this.state.readOnly
        : '';

    if (this.state.errors.userNameOrEmail) {
      alertBox = (
        <AlertBox
          content={this.state.errors.userNameOrEmail}
          classType={'alert-danger'}
        />
      );
    } else if (this.state.isFacebookLoggedIn) {
      alertBox = (
        <AlertBox
          content={'Thank you for sign in in with Facebook.'}
          classType={'alert-success'}
        />
      );
    } else if (this.state.isGoogleLoggedIn) {
      alertBox = (
        <AlertBox
          content={'Thank you for sign in in with Google.'}
          classType={'alert-success'}
        />
      );
    }

    // FOR FACEBOOK
    let fbContent;
    // If the user is logged via facebook show his picture in place of button else show facebook login button.
    if (this.state.isFacebookLoggedIn) {
      fbContent = (
        <div>
          <img src={this.state.picture} alt={this.state.userName} />
          <h6>Welcome {this.state.userName}</h6>
        </div>
      );
    } else {
      fbContent = (
        <FacebookLogin
          appId={fbAppId}
          autoLoad={false}
          fields='name,email,picture'
          size='small'
          textButton='Login with Facebook'
          onClick={this.componentClicked}
          callback={this.responseFacebook}
        />
      );
    }

    // FOR GOOGLE
    let googleContent;
    // If the user is logged via facebook show his picture in place of button else show facebook login button.
    if (this.state.isGoogleLoggedIn) {
      googleContent = (
        <div>
          <img src={this.state.picture} alt={this.state.userName} />
          <h6>Welcome {this.state.userName}</h6>
        </div>
      );
    } else {
      googleContent = (
        <GoogleLogin
          clientId={googleClientId}
          buttonText='LOGIN WITH GOOGLE'
          style={{
            fontSize: '14px',
            padding: '12px 24px 12px 24px',
            background: 'rgb(209, 72, 54)',
            color: '#fff',
            cursor: 'pointer',
          }}
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
        />
      );
    }

    return (
      <div className='container'>
        <NotificationAlert ref='notificationAlert' />
        <Navbar />
        <div className='row d-flex justify-content-center align-items-center'>
          <div className='col-8 col-md-7 col-lg-5 mt-5'>
            {emailVerified && (
              <AlertBox
                content={
                  'Thank you for verifying your email. You can login now.'
                }
                classType={'alert-success'}
              />
            )}
            {alertBox}
            <form onSubmit={this.onSubmit}>
              <div className='form-row text-center'>
                <div className='form-group col-12 mt-3 mb-4 mt-5'>
                  {/*<img className="img-responsive logo-image" src="/image/logo.png" alt="Logo"/>*/}
                  <h2>Login</h2>
                </div>

                <div className='form-group col-12 name_icon'>
                  <input
                    type='text'
                    name='userNameOrEmail'
                    className={classnames('form-control', {
                      'is-invalid': errors.userNameOrEmail,
                    })}
                    value={this.state.userNameOrEmail}
                    onChange={this.onChange}
                    placeholder='Username or Email'
                    readOnly={readOnly}
                  />
                  {errors.userNameOrEmail && (
                    <div className='invalid-feedback'>
                      {errors.userNameOrEmail}
                    </div>
                  )}
                  <i className='fas fa-user'></i>
                </div>
                <div className='form-group col-12 mt-1 pwd_icon'>
                  <input
                    type='password'
                    name='password'
                    className={classnames('form-control', {
                      'is-invalid': errors.loginPassword,
                    })}
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder='Password'
                  />
                  {errors.loginPassword && (
                    <div className='invalid-feedback'>
                      {errors.loginPassword}
                    </div>
                  )}
                  <i className='fas fa-lock'></i>
                </div>
                {/*Captcha*/}
                <div style={{ margin: '0 auto' }}>
                  <Recaptcha
                    sitekey={recaptchaSiteKey}
                    render='explicit'
                    onloadCallback={this.reCaptchaLoaded}
                    verifyCallback={this.verifyCaptchaClicked}
                  />
                </div>
                {/*<div className="form-group col-12 col-lg-4 pr-2 text-left">*/}
                {/*<div className="form-check">*/}
                {/*<label className="label2">Remember me<input type="checkbox" checked="checked"/><span className="check-mark"></span> </label>*/}
                {/*</div>*/}
                {/*</div>*/}
                <div className='form-group col-12 col-lg-8 mt-1 text-left'>
                  <div
                    className='g-recaptcha recaptcha'
                    data-sitekey='6LcVPm4UAAAAABiWg8tWCdqtLnqtSbnCeSBGUoE9'
                  ></div>
                </div>
                <div className='form-group col-12'>
                  <button type='submit' className='btn btn-primary log-in'>
                    {' '}
                    Log In
                  </button>
                </div>
                <div className='form-group col-6 link'>
                  <Link to='/register' style={{ fontFamily: 'Montserrat' }}>
                    Register now
                  </Link>
                </div>
                <div className='form-group col-6 link'>
                  <Link to='/forgot-password'>Forgot Password?</Link>
                </div>
                <div className='form-group col-12 mt-2'>
                  <Link
                    to='/resend-verification-email'
                    style={{ fontSize: '12px' }}
                  >
                    Verify Email/ Activate Account
                  </Link>
                </div>
                <div className='form-group col-12 mt-2'>
                  <p className='text-center social-link'>
                    {' '}
                    or Login with social media links
                  </p>
                </div>
                <div className='form-group col-12 col-xl-6 socialbutton'>
                  {/*<Link className="btn  btn-social btn-facebook" to="/">*/}
                  {/*<span className="fab fa-facebook-f"></span> Login with Facebook</Link>*/}
                  {fbContent}
                </div>
                <div className='form-group col-12 col-xl-6  socialbutton'>
                  {/*<Link className="btn  btn-social btn-google" to="/">*/}
                  {/*<span className="fab fa-google-plus-g"></span> Login with Google &nbsp;&nbsp; </Link>*/}
                  {googleContent}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  getCsrfToken: PropTypes.func.isRequired,
  loginUser: PropTypes.func.isRequired,
  loginWithFacebook: PropTypes.func.isRequired,
  loginWithGoogle: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  getCsrfToken,
  loginUser,
  loginWithFacebook,
  loginWithGoogle,
})(withRouter(Login));

// import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { loginUser } from '../../actions/authActions';
// import classnames from 'classnames';
// import Navbar from '../layouts/Navbar';
// import { Container, Row, Col } from 'reactstrap';
// import { Button } from '@material-ui/core';
// import './login.css';

// class Login extends Component {
//   constructor() {
//     super();
//     this.state = {
//       email: '',
//       password: '',
//       // firstlogin: true
//       errors: {},
//     };
//   }

//   componentDidMount() {
//     // If logged in and user navigates to Login page, should redirect them to dashboard
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push('/dashboard');
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.auth.isAuthenticated) {
//       this.props.history.push('/dashboard');
//     }

//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors,
//       });
//     }
//   }
//   onChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();

//     const userData = {
//       email: this.state.email,
//       password: this.state.password,
//     };

//     this.props.loginUser(userData);
//   };

//   render() {
//     const { errors } = this.state;

//     return (
//       <div>
//         <Navbar />

//         <Container>
//           <Row>
//             <Col sm='12' md={{ size: 6, offset: 3 }}>
//               <h4
//                 style={{
//                   fontFamily: 'Montserrat',
//                   'font-size': '40px',
//                   'margin-top': '50px',
//                 }}
//               >
//                 <b>Welcome to Healthynox</b>
//               </h4>
//               <p
//                 style={{
//                   fontFamily: 'Montserrat',
//                   color: 'grey',
//                   'font-size': '17px',
//                   'margin-top': '15px',
//                 }}
//               >
//                 Start your mental health journey and register here.
//               </p>
//               <form noValidate onSubmit={this.onSubmit}>
//                 {/* <Row>
//                 <Col sm="12" md={{ size: 6, offset: 3 }}> */}
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.email}
//                   error={errors.email}
//                   placeholder='Email'
//                   // defaultValue= {tahis.state.email}
//                   style={{
//                     fontFamily: 'Montserrat',
//                     color: 'grey',
//                     'font-size': '17px',
//                     'background-color': 'white',
//                     'border-radius': '25px',
//                     width: '400px',
//                     border: '2rm',
//                     'border-style': 'solid',
//                     'border-color': 'black',
//                     display: 'inline-block',
//                     padding: '6px 12px',
//                   }}
//                   id='email'
//                   type='email'
//                   className={classnames('', {
//                     invalid: errors.email || errors.emailnotfound,
//                   })}
//                 />
//                 {/* <label htmlFor="email" style={{ fontFamily: "Monserrat Bold"}}>Email</label> */}
//                 <span className='red-text'>
//                   {errors.email}
//                   {errors.emailnotfound}
//                 </span>
//                 {/* </div> */}
//                 {/* </Col>
//               </Row>

//               <Row>
//                 <Col sm="12" md={{ size: 6, offset: 3 }}> */}
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.password}
//                   error={errors.password}
//                   id='password'
//                   placeholder='Password'
//                   style={{
//                     fontFamily: 'Montserrat',
//                     color: 'grey',
//                     'font-size': '17px',
//                     'background-color': 'white',
//                     'border-radius': '25px',
//                     width: '400px',
//                     border: '2rm',
//                     'border-style': 'solid',
//                     'border-color': 'black',
//                     display: 'inline-block',
//                     padding: '6px 12px',
//                   }}
//                   type='password'
//                   className={classnames('', {
//                     invalid: errors.password || errors.passwordincorrect,
//                   })}
//                 />
//                 {/* <label htmlFor="password" style={{ fontFamily: "Monserrat Bold"}}>Password</label> */}
//                 <span className='red-text'>
//                   {errors.password}
//                   {errors.passwordincorrect}
//                 </span>
//                 {/* </Col>
//               </Row> */}

//                 {/* <div className="col s12" style={{ paddingLeft: "11.250px" }}> */}
//                 <button
//                   style={{
//                     width: '150px',
//                     borderRadius: '40px',
//                     letterSpacing: '1.5px',
//                     marginLeft: '1px',
//                     marginTop: '1rem',
//                   }}
//                   type='submit'
//                   className='btn btn-large waves-effect waves-light hoverable blue accent-3'
//                 >
//                   Sign in
//                 </button>
//                 <br />
//                 <br />
//                 <Link to='/' style={{ fontFamily: 'Montserrat' }}>
//                   Forgot password?
//                 </Link>
//                 <p
//                   className='grey-text text-darken-1'
//                   style={{ fontFamily: 'Montserrat' }}
//                 >
//                   New to Healthynox?{' '}
//                   <Link to='/register' style={{ fontFamily: 'Montserrat' }}>
//                     Register now
//                   </Link>
//                 </p>
//                 {/* </div> */}
//               </form>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// Login.propTypes = {
//   loginUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

// export default connect(mapStateToProps, { loginUser })(Login);
