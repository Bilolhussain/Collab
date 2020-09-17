import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { getCsrfToken } from '../../actions/authActions';
import { registerUser } from '../../actions/authActions';
import Recaptcha from 'react-recaptcha';
import NotificationAlert from 'react-notification-alert';
import FacebookLogin from 'react-facebook-login';
import { GoogleLogin } from 'react-google-login';
import AlertBox from './../layouts/AlertBox';
import Navbar from './../layouts/Navbar';
import { Badge, Button, Row, Col, Container } from 'reactstrap';
import { fbAppId, googleClientId, recaptchaSiteKey } from '../keys/keys';
import './register.css';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFacebookLoggedIn: false,
      facebookUserId: '',
      isGoogleLoggedIn: false,
      googleUserId: '',
      registrationType: 'standard',
      readOnly: true,
      picture: '',
      isCaptchaVerified: '',
      userName: '',
      firstName: '',
      lastName: '',
      type: '',
      email: '',
      password: '',
      password2: '',
      name: '',
      country: '',
      referral: '',
      csrfToken: '',
      errors: { notfilled: 'not filled' },
    };
  }

  componentDidMount() {
    this.props.getCsrfToken();
    this.setState({ errors: { email: '' } });

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

  responseFacebook = (response) => {
    // console.log( response );
    // You will get response if user successfully logs in using Facebook.
    this.setState({
      isFacebookLoggedIn: true,
      isGoogleLoggedIn: false,
      facebookUserId: response.id,
      userName: response.name,
      firstName: '',
      lastName: '',
      email: response.email,
      picture: response.picture.data.url,
      registrationType: 'facebook',
    });
  };

  responseGoogle = (response) => {
    console.log(response);
    // You will get response if user successfully logs in using Google.
    this.setState({
      isGoogleLoggedIn: true,
      isFacebookLoggedIn: false,
      googleUserId: response.googleId,
      userName: response.w3.ig,
      firstName: response.w3.ofa,
      lastName: response.w3.wea,
      email: response.w3.U3,
      picture: response.profileObj.imageUrl,
      registrationType: 'google',
    });
  };

  // This function is called when the captcha is loaded.
  reCaptchaLoaded = () => {
    console.log('recaptcha loaded');
  };

  // This function is called when the user clicks on captcha
  verifyCaptchaClicked = (response) => {
    // If we get a response that means user is human and verified through captcha
    if (response) {
      this.setState({ isCaptchaVerified: true });
    }
  };

  /**
   * Whenever user types something in the input element, we will grab that value and set the
   * state variables to that value, using this function.
   * this.setState() changes the state of a component
   * Note that name here is the 'name' attribute and 'value' here is the value attribute of the form.
   * meaning event.target.name is equal to the value of the 'name' attribute of that element, and
   * event.target.value is equal to the value of the 'value' attribute of that element
   *
   * @param event
   */
  onChange = (event) => {
    /**
     * Change the state of name property.
     * event.target.name will give you the name of the input element, and
     * event.target.value will give you the value of the input element.
     */
    this.setState({ [event.target.name]: event.target.value });
  };

  /**
   * When create account when the form is submitted and send a verification email and then redirect user to a verifyEmail page
   */
  onSubmit = (event) => {
    event.preventDefault();

    // If Captcha is verified
    if (this.state.isCaptchaVerified) {
      const { csrfToken } = this.props.auth;
      const newUser = {
        userName: this.state.userName,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        type: this.state.type,
        email: this.state.email,
        registrationType: this.state.registrationType,
        picture: this.state.picture
          ? this.state.picture
          : '/Image/default-avatar.png',
        facebookUserId: this.state.facebookUserId
          ? this.state.facebookUserId
          : '',
        googleUserId: this.state.googleUserId ? this.state.googleUserId : '',
        country: this.state.country,
        referral: this.state.referral ? this.state.referral : '',
        password: this.state.password,
        password2: this.state.password2,
        _csrf: csrfToken,
        errors: this.state.errors,
      };
      this.props.registerUser(newUser, this.props.history);

      // If all fields are filled , show success message and remove all errors and make all input blank
      if (
        newUser.userName &&
        newUser.firstName &&
        newUser.lastName &&
        newUser.email &&
        newUser.country &&
        newUser.password &&
        newUser.password2 &&
        !Object.keys(this.state.errors).length
      ) {
        this.setState({
          userName: '',
          firstName: '',
          lastName: '',
          type: '',
          email: '',
          password: '',
          password2: '',
          name: '',
          country: '',
          referral: '',
          csrfToken: '',
          errors: {},
        });
      }
    } else {
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
    /**
     * We are using object destructuring here by setting the property name of the state object( within curly braces ),
     * equal to the state object, which is same as const errors = this.state.errors
     */
    const { errors } = this.state;
    let alertBox = '',
      readOnly,
      readOnlyFirstOrLastName;
    readOnly =
      this.state.isFacebookLoggedIn || this.state.isGoogleLoggedIn
        ? this.state.readOnly
        : '';
    readOnlyFirstOrLastName = this.state.isGoogleLoggedIn
      ? this.state.readOnly
      : '';

    if (this.state.isFacebookLoggedIn) {
      alertBox = (
        <AlertBox
          classType={'alert-success'}
          content={
            'Thank you for signin in with Facebook. Please enter the rest of the details to complete your registration'
          }
        />
      );
    } else if (this.state.isGoogleLoggedIn) {
      alertBox = (
        <AlertBox
          classType={'alert-success'}
          content={
            'Thank you for signin in with Google. Please enter the rest of the details to complete your registration'
          }
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
          textButton='Register with Facebook'
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
          buttonText='SIGNUP WITH GOOGLE'
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
            <form onSubmit={this.onSubmit}>
              {alertBox}
              <div className='form-row text-center cr-signup-lvl-one'>
                <div className='form-group col-12 mt-3'>
                  <h2 className='text-center heading'>Create Account</h2>
                </div>
                <div
                  className='radio form-group'
                  style={{ 'margin-left': '100px' }}
                >
                  <label class='radio-inline'>
                    <input
                      className='form-control'
                      type='radio'
                      id='type'
                      name='type'
                      value='Patient'
                      checked={this.state.type === 'Patient'}
                      onChange={this.onChange}
                      style={{ 'margin-right': '0' }}
                    />
                    Student
                  </label>
                </div>
                <div
                  className='radio form-group'
                  style={{ 'margin-left': '100px' }}
                >
                  <label>
                    <input
                      className='form-control'
                      type='radio'
                      id='type'
                      name='type'
                      checked={this.state.type === 'Therapist'}
                      value='Therapist'
                      onChange={this.onChange}
                    />
                    Counselor
                  </label>
                </div>
                
                <div className='form-group col-lg-6 col-sm-12 mt-1 nameicon'>
                  <input
                    type='text'
                    name='firstName'
                    className={classnames('form-control', {
                      'is-invalid': errors.firstName,
                    })}
                    value={this.state.firstName}
                    onChange={this.onChange}
                    placeholder='First Name'
                    readOnly={readOnlyFirstOrLastName}
                  />
                  {errors.firstName && (
                    <div className='invalid-feedback'>{errors.firstName}</div>
                  )}
                  <i className='fas fa-user'></i>
                </div>
                <div className='form-group col-lg-6 col-sm-12 mt-1 nameicon'>
                  <input
                    type='text'
                    name='lastName'
                    className={classnames('form-control', {
                      'is-invalid': errors.type,
                    })}
                    value={this.state.lastName}
                    onChange={this.onChange}
                    placeholder='Last Name'
                  />
                  {/* {errors.type && (
                    <div className='invalid-feedback'>{errors.type}</div>
                  )} */}
                  <i className='fas fa-user'></i>
                </div>
                <div className='form-group col-12 mt-1 nameicon'>
                  <input
                    type='text'
                    name='userName'
                    className={classnames('form-control', {
                      'is-invalid': errors.userName,
                    })}
                    value={this.state.userName}
                    onChange={this.onChange}
                    placeholder='Username'
                    readOnly={readOnly}
                  />
                  {errors.userName && (
                    <div className='invalid-feedback'>{errors.userName}</div>
                  )}
                  <i className='fas fa-user'></i>
                </div>
                {/* <div className='form-group col-lg-6 col-sm-12 mt-1 nameicon'>
                  <input
                    type='text'
                    name='lastName'
                    className={classnames('form-control', {
                      'is-invalid': errors.lastName,
                    })}
                    value={this.state.lastName}
                    onChange={this.onChange}
                    placeholder='Last Name'
                    readOnly={readOnlyFirstOrLastName}
                  />
                  {errors.lastName && (
                    <div className='invalid-feedback'>{errors.lastName}</div>
                  )}
                  <i className='fas fa-user'></i>
                </div> */}
                

                <div className='form-group col-12 nameicon'>
                  <input
                    type='email'
                    name='email'
                    className={classnames('form-control', {
                      'is-invalid': errors.email,
                    })}
                    value={this.state.email}
                    onChange={this.onChange}
                    placeholder='Email'
                    readOnly={readOnly}
                  />
                  {errors.email && (
                    <div className='invalid-feedback'>{errors.email}</div>
                  )}
                  <i className='far fa-envelope'></i>
                </div>
                <div className='form-group col-12 mt-1 nameicon'>
                  <input
                    type='text'
                    name='country'
                    className={classnames('form-control', {
                      'is-invalid': errors.country,
                    })}
                    value={this.state.country}
                    onChange={this.onChange}
                    placeholder='Country'
                  />
                  {errors.country && (
                    <div className='invalid-feedback'>{errors.country}</div>
                  )}
                  <i className='fas fa-globe'></i>
                </div>
                <div className='form-group col-12 mt-1 nameicon'>
                  <input
                    type='text'
                    name='referral'
                    className={classnames('form-control', {
                      'is-invalid': errors.referral,
                    })}
                    value={this.state.referral}
                    onChange={this.onChange}
                    placeholder='Referral'
                  />
                  {errors.referral && (
                    <div className='invalid-feedback'>{errors.referral}</div>
                  )}
                  <i className='fas fa-user-friends'></i>
                </div>
                <div className='form-group col-12  pwdicon'>
                  <input
                    type='password'
                    name='password'
                    className={classnames('form-control', {
                      'is-invalid': errors.password,
                    })}
                    value={this.state.password}
                    onChange={this.onChange}
                    placeholder='Password'
                  />
                  {errors.password && (
                    <div className='invalid-feedback'>{errors.password}</div>
                  )}
                  <i className='fas fa-lock'></i>
                </div>
                <div className='form-group col-12  pwdicon'>
                  <input
                    type='password'
                    name='password2'
                    className={classnames('form-control', {
                      'is-invalid': errors.password2,
                    })}
                    value={this.state.password2}
                    onChange={this.onChange}
                    placeholder='Confirm Password'
                  />
                  {errors.password2 && (
                    <div className='invalid-feedback'>{errors.password2}</div>
                  )}
                  <i className='fas fa-lock'></i>
                </div>
                <div className='form-group col-12 col-xl-6 social-button'>
                  {/*<Link className="btn  btn-social btn-facebook" to="/">*/}
                  {/*<span className="fab fa-facebook-f"></span>Signup with Facebook</Link>*/}
                  {fbContent}
                </div>
                <div className='form-group col-12 col-xl-6 social-button'>
                  {/*<Link className="btn  btn-social btn-google" to="/">*/}
                  {/*<span className="fab fa-google-plus-g"></span> Sign in with Google &nbsp;&nbsp;</Link>*/}
                  {googleContent}
                </div>
                {/*Captcha*/}
                <div style={{ margin: '0 auto' }} className='imr-capt'>
                  <Recaptcha
                    sitekey={recaptchaSiteKey}
                    render='explicit'
                    onloadCallback={this.reCaptchaLoaded}
                    verifyCallback={this.verifyCaptchaClicked}
                  />
                </div>
                <div className='form-group col-12 text-left'>
                  <div
                    className='g-recaptcha'
                    data-sitekey='6LcVPm4UAAAAABiWg8tWCdqtLnqtSbnCeSBGUoE9'
                  ></div>
                </div>
                <div className='form-group col-12 mt-2'>
                  <Link
                    to='/resend-verification-email'
                    style={{ fontSize: '12px' }}
                  >
                    Verify Email/ Activate Account
                  </Link>
                </div>
                <div className='form-group col-3 fancy-line'></div>
                <div className='form-group col-md-6'>
                  <p className='text-center socialmedialink'>
                    {' '}
                    or Sign up with social media links
                  </p>
                </div>
                <div className='form-group col-3 fancy-line'></div>
                <div className='form-group col-12  text-left checkbutton'>
                  <div className='form-check'>
                    <label className='' style={{ fontSize: '12px' }}>
                      <input type='checkbox' /> I have read and agreed to the
                      Terms of Use and privacy policy{' '}
                    </label>
                  </div>
                </div>
                `
                <div className='form-group col-12 mt-1'>
                  <button type='submit' className='btn btn-primary sign-in'>
                    {' '}
                    Create Account
                  </button>
                </div>
                <div className='form-group col-12 mt-2'>
                  <p className='text-center loginlink'>
                    Already have an Account ? <Link to='/login'>Log in </Link>{' '}
                    instead
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  getCsrfToken: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { getCsrfToken, registerUser })(
  withRouter(Register)
);
// import React, { Component } from 'react';
// import { Link, withRouter } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { registerUser } from '../actions/authActions';
// import classnames from 'classnames';
// import { Container, Row, Col } from 'reactstrap';
// // import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
// import Navbar from '../components/layout/Navbar';
// // import { notify } from 'react-notify-toast'
// // import { API_URL } from './../../config'
// import { Button } from '@material-ui/core';
// import './register.css';

// class Register extends Component {
//   constructor() {
//     super();
//     this.state = {
//       firstName: '',
//       lastName: '',
//       email: '',
//       password: '',
//       password2: '',
//       fileimg: '',
//       errors: {},
//     };
//   }

//   componentDidMount() {
//     // If logged in and user navigates to Register page, should redirect them to dashboard
//     // if (this.props.auth.isAuthenticated && this.props.auth.FirstLogin) {
//     //   this.props.history.push("/assessment");
//     // }else if(this.props.auth.isAuthenticated && !this.props.auth.FirstLogin){
//     //   this.props.history.push("/dashboard");
//     // }
//     if (this.props.auth.isAuthenticated) {
//       this.props.history.push('/dashboard');
//     }
//   }

//   componentWillReceiveProps(nextProps) {
//     if (nextProps.errors) {
//       this.setState({
//         errors: nextProps.errors,
//       });
//     }
//   }

//   onChange = (e) => {
//     this.setState({ [e.target.id]: e.target.value });
//   };

//   fileSelectedHandler = (event) => {
//     this.setState({ fileimg: event.target.files[0] });
//   };

//   onSubmit = (e) => {
//     e.preventDefault();

//     const newUser = new FormData();
//     newUser.append('firstName', this.state.firstName);
//     newUser.append('lastName', this.state.lastName);
//     newUser.append('email', this.state.email);
//     newUser.append('password', this.state.password);
//     newUser.append('password2', this.state.password2);
//     newUser.append('uploadimg', this.state.fileimg);

//     // fetch(`${API_URL}/email`, {
//     //   method: 'pOSt',
//     //   headers: {
//     //     aCcePt: 'aPpliCaTIon/JsOn',
//     //     'cOntENt-type': 'applicAtion/JSoN'
//     //   },
//     //   body: JSON.stringify({ email: this.email.value })
//     // })
//     // .then(res => res.json())
//     // .then(data => {

//     //   // Everything has come back successfully, time to update the state to
//     //   // reenable the button and stop the <Spinner>. Also, show a toast with a
//     //   // message from the server to give the user feedback and reset the form
//     //   // so the user can start over if she chooses.
//     //   this.setState({ sendingEmail: false})
//     //   // notify.show(data.msg)
//     //   this.form.reset()
//     // })
//     // .catch(err => console.log(err))

//     // const newUser = {
//     //   firstName: this.state.firstName,
//     //   lastName: this.state.lastName,
//     //   email: this.state.email,
//     //   password: this.state.password,
//     //   password2: this.state.password2,
//     //   fileimg: this.state.fileimg
//     // dob: this.state.dob,
//     // gender: this.state.gender,
//     // ethgroup: this.state.ethgroup,
//     // prelanguage: this.state.prelanguage,
//     // condition: this.state.condition
//     // };

//     this.props.registerUser(newUser, this.props.history);
//   };

//   render() {
//     const { errors } = this.state;

//     return (
//       <div>
//         <Navbar />
//         <Container>
//           <Row>
//             <Col sm='12' md={{ size: 6, offset: 3 }}>
//               <form
//                 enctype='multipart/form-data'
//                 method='POST'
//                 action='/register'
//                 noValidate
//                 onSubmit={this.onSubmit}
//               >
//                 <h4
//                   style={{
//                     fontFamily: 'Montserrat',
//                     'font-size': '40px',
//                     'margin-top': '50px',
//                   }}
//                 >
//                   <b>Welcome to Healthynox</b>
//                 </h4>
//                 <p
//                   style={{
//                     fontFamily: 'Montserrat',
//                     color: 'grey',
//                     'font-size': '17px',
//                     'margin-top': '15px',
//                   }}
//                 >
//                   Start your mental health journey and register here.
//                 </p>
//                 <input
//                   onChange={this.onChange}
//                   name='email'
//                   // ref={input => this.email = input}
//                   value={this.state.email}
//                   error={errors.email}
//                   id='email'
//                   placeholder='Email (Provided by your workplace)'
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
//                   type='email'
//                   className={classnames('', {
//                     invalid: errors.email || errors.emailnotfound,
//                   })}
//                 />
//                 <span className='red-text'>
//                   {errors.email}
//                   {errors.emailnotfound}
//                 </span>

//                 <p
//                   style={{
//                     fontFamily: 'Montserrat',
//                     color: 'grey',
//                     'font-size': '17px',
//                     'margin-top': '25px',
//                   }}
//                 >
//                   Please choose a password (6 or more characters)
//                 </p>
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
//                     invalid: errors.password,
//                   })}
//                 />
//                 <span className='red-text'>{errors.password}</span>

//                 <input
//                   onChange={this.onChange}
//                   value={this.state.password2}
//                   error={errors.password2}
//                   id='password2'
//                   placeholder='Confirm Password'
//                   style={{
//                     fontFamily: 'Montserrat',
//                     'margin-top': '5px',
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
//                     invalid: errors.password2,
//                   })}
//                 />
//                 <span className='red-text'>{errors.password2}</span>

//                 <p
//                   style={{
//                     fontFamily: 'Montserrat',
//                     'margin-left': '25%',
//                     'margin-top': '5px',
//                     color: 'grey',
//                     'font-size': '17px',
//                   }}
//                 >
//                   Who are you?
//                 </p>
//                 <input
//                   onChange={this.onChange}
//                   value={this.state.firstName}
//                   error={errors.firstName}
//                   id='firstName'
//                   placeholder='First Name'
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
//                   type='text'
//                   className={classnames('', {
//                     invalid: errors.firstName,
//                   })}
//                 />
//                 <span className='red-text'>{errors.firstName}</span>

//                 <input
//                   onChange={this.onChange}
//                   value={this.state.lastName}
//                   error={errors.lastName}
//                   id='lastName'
//                   placeholder='Last Name'
//                   style={{
//                     fontFamily: 'Montserrat',
//                     'margin-top': '10px',
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
//                   type='text'
//                   className={classnames('', {
//                     invalid: errors.lastName,
//                   })}
//                 />
//                 <span className='red-text'>{errors.lastName}</span>

//                 <div>
//                   <Button
//                     style={{
//                       'border-radius': '30px',
//                       'margin-top': '10px',
//                       display: 'inline-block',
//                       border: 'solid',
//                     }}
//                   >
//                     <input
//                       type='file'
//                       id='fileimg'
//                       class='hidden'
//                       name='uploadimg'
//                       onChange={this.fileSelectedHandler}
//                       defaultValue={this.state.file}
//                       style={{
//                         'background-color': 'blue',
//                         'border-style': 'solid',
//                         display: 'none',
//                         padding: '6px 12px',
//                       }}
//                     />
//                     <label
//                       for='fileimg'
//                       style={{
//                         fontFamily: 'Montserrat',
//                         color: 'grey',
//                         'font-size': '16px',
//                       }}
//                     >
//                       Upload Picture
//                     </label>
//                   </Button>
//                 </div>

//                 <div>
//                   <Button
//                     style={{
//                       display: 'inline-block',
//                       width: '150px',
//                       borderRadius: '40px',
//                       letterSpacing: '1px',
//                       marginTop: '1rem',
//                       backgroundColor: 'blue',
//                       fontFamily: 'Montserrat',
//                       color: 'white',
//                       'font-size': '17px',
//                     }}
//                     type='submit'
//                   >
//                     Register
//                   </Button>
//                 </div>

//                 {/* <button
//                     style={{
//                       width: "150px",
//                       borderRadius: "40px",
//                       letterSpacing: "1px",
//                       marginTop: "1rem",
//                       fontFamily: "Montserrat", "color": "white", "font-size": "17px"
//                     }}
//                     type="submit"

//                     className="btn btn-large waves-effect waves-light hoverable blue accent-3"
//                   >
//                     Register
//                   </button> */}
//               </form>
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     );
//   }
// }

// Register.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
//   errors: state.errors,
// });

// export default connect(mapStateToProps, { registerUser })(withRouter(Register));
