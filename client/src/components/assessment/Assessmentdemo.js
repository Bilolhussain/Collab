import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { logoutUser } from '../../actions/authActions';
import { createAssessment } from '../../actions/authActions';
import { getCsrfToken } from '../../actions/authActions';
import './Assessment.css';
import UserNavbar from '../dashboard/UserNavbar.js';
import {
  Row,
  Col,
  Container,
  Jumbotron,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
} from 'reactstrap';

var fieldValues = {
  uGender: null,
  uRelationship: null,
  uPersonalRating: null,
};

class Assessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      uAge: '',
      uGender: '',
      uCountry: '',
      uMotivation: '',
      uOrientation: '',
      uRelationship: '',
      uReligious: '',
      uSpiritual: '',
      uHistory: '',
      tGender: '',
      uPersonalRating: '',
      uFeeling: '',
      uBothered: '',
      email: this.props.auth.user.email,
    };
    // this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    const { csrfToken } = this.props.auth;
    // const { id } = this.props.auth.user;
    e.preventDefault();
    console.log('Submit Function Works');
    const newAssessment = {
      uRelationship: this.state.uRelationship,
      email: this.state.email,
      _csrf: csrfToken,
      uPersonalRating: this.state.uPersonalRating,
      uGender: this.state.uGender,
    };

    this.props.createAssessment(newAssessment, this.props.history);
  };

  componentDidMount() {
    this.props.getCsrfToken();
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.firstLogin) {
      this.props.history.push('/dashboard');
    }
  }

  _next = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 2 ? 3 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  _prev = () => {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  };

  /*
   * the functions for our button
   */
  previousButton() {
    let currentStep = this.state.currentStep;
    if (currentStep !== 1) {
      return (
        <button
          className='btn btn-secondary'
          type='button'
          onClick={this._prev}
        >
          Previous
        </button>
      );
    }
    return null;
  }

  nextButton() {
    let currentStep = this.state.currentStep;
    if (currentStep < 3) {
      return (
        <button
          className='btn btn-primary float-right'
          type='button'
          onClick={this._next}
        >
          Next
        </button>
      );
    }
    return null;
  }

  render() {
    const { uGender, uRelationship, uPersonalRating } = this.state;
    const values = { uGender, uRelationship, uPersonalRating };
    return (
      <React.Fragment>
        <UserNavbar />
        <Container>
          {/* <Row>
            <Col> */}
          <h4 style={{ marginTop: '80px' }}>
            <b style={{ fontSize: '30px', fontFamily: 'Montserrat' }}>
              Questionnaire!
            </b>
          </h4>
          <form onSubmit={this.state.onSubmit}>
            <Step1
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              uGender={this.state.uGender}
            />
            <Step2
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              uRelationship={this.state.uRelationship}
            />
            <Step3
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              uPersonalRating={this.state.uPersonalRating}
              onSubmit={this.onSubmit}
            />
            {this.previousButton()}
            {this.nextButton()}
          </form>
        </Container>
      </React.Fragment>
    );
  }
}

function Step1(props) {
  if (props.currentStep !== 1) {
    return null;
  }
  return (
    <React.Fragment>
      <Jumbotron>
        {/* <form> */}
        <h3 style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
          What is your sexual orientation?
        </h3>
        <Container>
          <Row>
            <div className='form-group' style={{ 'margin-left': '0px' }}>
              <input
                onChange={props.handleChange}
                value={props.uGender}
                // error={errors.password}
                id='uGender'
                placeholder='uGender'
                style={{
                  fontFamily: 'Montserrat',
                  color: 'grey',
                  'font-size': '17px',
                  'background-color': 'white',
                  'border-radius': '25px',
                  width: '400px',
                  border: '2rm',
                  'border-style': 'solid',
                  'border-color': 'black',
                  display: 'inline-block',
                  padding: '6px 12px',
                }}
                type='text'
                // className={classnames("", {
                //   invalid: errors.password
                // })}
              />
            </div>
          </Row>
        </Container>
        {/* </form> */}
      </Jumbotron>
    </React.Fragment>
  );
}

function Step2(props) {
  if (props.currentStep !== 2) {
    return null;
  }
  return (
    <React.Fragment>
      <Jumbotron>
        {/* <form> */}
        <h3 style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
          What is your relationship status?
        </h3>
        <Container>
          <Row>
            <div className='radio form-group' style={{ 'margin-left': '0px' }}>
              <div className='form-group' style={{ 'margin-left': '0px' }}>
                <input
                  onChange={props.handleChange}
                  value={props.uRelationship}
                  // error={errors.password}
                  id='uRelationship'
                  placeholder='uRelationship'
                  style={{
                    fontFamily: 'Montserrat',
                    color: 'grey',
                    'font-size': '17px',
                    'background-color': 'white',
                    'border-radius': '25px',
                    width: '400px',
                    border: '2rm',
                    'border-style': 'solid',
                    'border-color': 'black',
                    display: 'inline-block',
                    padding: '6px 12px',
                  }}
                  type='text'
                  // className={classnames("", {
                  //   invalid: errors.password
                  // })}
                />
              </div>
            </div>
          </Row>
        </Container>
        {/* </form> */}
      </Jumbotron>
    </React.Fragment>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null;
  }
  return (
    <React.Fragment>
      <Jumbotron>
        {/* <form> */}
        <h3 style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
          On a Scale of 1-5, how well do you feel?
        </h3>
        <Container>
          <Row>
            <div className='radio form-group' style={{ 'margin-left': '0px' }}>
              <div className='form-group' style={{ 'margin-left': '0px' }}>
                <input
                  onChange={props.handleChange}
                  value={props.uPersonalRating}
                  // error={errors.password}
                  id='uPersonalRating'
                  placeholder='uPersonalRating'
                  style={{
                    fontFamily: 'Montserrat',
                    color: 'grey',
                    'font-size': '17px',
                    'background-color': 'white',
                    'border-radius': '25px',
                    width: '400px',
                    border: '2rm',
                    'border-style': 'solid',
                    'border-color': 'black',
                    display: 'inline-block',
                    padding: '6px 12px',
                  }}
                  type='text'
                  // className={classnames("", {
                  //   invalid: errors.password
                  // })}
                />
              </div>
            </div>
          </Row>
        </Container>
        <div>
          <Button type='button' onClick={props.onSubmit}>
            Submit
          </Button>
        </div>
        {/* </form> */}
      </Jumbotron>
    </React.Fragment>
  );
}

Assessment.propTypes = {
  getCsrfToken: PropTypes.func.isRequired,
  createAssessment: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  createAssessment: state.createAssessment,
});

export default connect(mapStateToProps, {
  createAssessment,
  getCsrfToken,
  logoutUser,
})(withRouter(Assessment));
