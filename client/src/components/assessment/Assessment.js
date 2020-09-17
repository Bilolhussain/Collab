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


class Assessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      // uAge: '',
      uGender: '',
      uCountry: '',
      // uMotivation: '',
      // uOrientation: '',
      // uRelationship: '',
      // uReligious: '',
      // uSpiritual: '',
      // uHistory: '',
      // tGender: '',
      // uPersonalRating: '',
      // uFeeling: '',
      // uBothered: '',
      email: this.props.auth.user.email,
    };
    // this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    const { csrfToken } = this.props.auth;
    e.preventDefault();
    console.log('Submit Function Works');
    const newAssessment = {
      uCountry: this.state.uCountry,
      email: this.state.email,
      _csrf: csrfToken,
      // uPersonalRating: this.state.uPersonalRating,
      uGender: this.state.uGender,
    };

    this.props.createAssessment(newAssessment, this.props.history);
    this.props.history.push('/discover');
  };

  // componentDidMount() {
  //   this.props.getCsrfToken();
  //   // If logged in and user navigates to page, should redirect them to dashboard
  //   if (this.props.auth.firstLogin) {
  //     this.props.history.push('/dashboard');
  //   }
  // }

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
    if (currentStep < 2) {
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
    // const { uGender, uRelationship, uPersonalRating } = this.state;
    // const values = { uGender, uRelationship, uPersonalRating };
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
              uCountry={this.state.uCountry}
              onSubmit={this.onSubmit}
            />
            {/* <Step3
              currentStep={this.state.currentStep}
              handleChange={this.handleChange}
              uPersonalRating={this.state.uPersonalRating}
              onSubmit={this.onSubmit}
            /> */}
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
          Do you have a preference for the gender of your counselor?
        </h3>
        <Container>
          <Row>
            <div className='radio form-group' style={{ 'margin-left': '0px' }}>
              <label class='radio-inline'>
                <input
                  className='form-control'
                  type='radio'
                  id='uGender'
                  name='uGender'
                  value='Male'
                  checked={props.uGender === 'Male'}
                  onChange={props.handleChange}
                  style={{ 'margin-right': '0' }}
                />
                Male
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
                  id='uGender'
                  name='uGender'
                  checked={props.uGender === 'Female'}
                  value='Female'
                  onChange={props.handleChange}
                />
                Female
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
                  id='uGender'
                  name='uGender'
                  value='Other'
                  checked={props.uGender === 'Other'}
                  onChange={props.handleChange}
                />
                No Preference
              </label>
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
        <form>
        <h3 style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
          Which country are you applying to for higher education? 
        </h3>
        <Container>
          <Row>
            <div className='radio form-group' style={{ 'margin-left': '0px' }}>
              <label class='radio-inline'>
                <input
                  className='form-control'
                  type='radio'
                  id='uCountry'
                  name='uCountry'
                  value='USA'
                  checked={props.uCountry === 'USA'}
                  onChange={props.handleChange}
                  style={{ 'margin-right': '0' }}
                />
                USA
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
                  id='uCountry'
                  name='uCountry'
                  checked={props.uCountry === 'Canada'}
                  value='Canada'
                  onChange={props.handleChange}
                />
                Canada
              </label>
            </div>

            {/* <div
              className='radio form-group'
              style={{ 'margin-left': '100px' }}
            >
              <label>
                <input
                  className='form-control'
                  type='radio'
                  id='uCountry'
                  name='uCountry'
                  value='UK'
                  checked={props.uCountry === 'UK'}
                  onChange={props.handleChange}
                />
                UK
              </label>
            </div> */}
          </Row>
        </Container>
        <div>
            <Button type='button' onClick={props.onSubmit}>
              Submit
            </Button>
          </div>
        </form>
       </Jumbotron>
    </React.Fragment>
  );
}

// function Step3(props) {
//   if (props.currentStep !== 3) {
//     return null;
//   }
//   return (
//     <React.Fragment>
//       <Jumbotron>
//         <form onSubmit={props.onSubmit}>
//           <h3 style={{ fontSize: '20px', fontFamily: 'Montserrat' }}>
//             On a Scale of 1-5, how well do you feel?
//           </h3>
//           <Container>
//             <Row>
//               <div
//                 className='radio form-group'
//                 style={{ 'margin-left': '0px' }}
//               >
//                 <label>
//                   <input
//                     className='form-control'
//                     type='radio'
//                     id='uPersonalRating'
//                     name='uPersonalRating'
//                     value='1'
//                     checked={props.uPersonalRating === '1'}
//                     onChange={props.handleChange}
//                     style={{ 'margin-right': '0' }}
//                   />
//                   1
//                 </label>
//               </div>
//               <div
//                 className='radio form-group'
//                 style={{ 'margin-left': '100px' }}
//               >
//                 <label>
//                   <input
//                     className='form-control'
//                     type='radio'
//                     id='uPersonalRating'
//                     name='uPersonalRating'
//                     checked={props.uPersonalRating === '2'}
//                     value='2'
//                     onChange={props.handleChange}
//                   />
//                   2
//                 </label>
//               </div>

//               <div
//                 className='radio form-group'
//                 style={{ 'margin-left': '100px' }}
//               >
//                 <label>
//                   <input
//                     className='form-control'
//                     type='radio'
//                     id='uPersonalRating'
//                     name='uPersonalRating'
//                     checked={props.uPersonalRating === '3'}
//                     value='3'
//                     onChange={props.handleChange}
//                   />
//                   3
//                 </label>
//               </div>
//               <div
//                 className='radio form-group'
//                 style={{ 'margin-left': '100px' }}
//               >
//                 <label>
//                   <input
//                     className='form-control'
//                     type='radio'
//                     id='uPersonalRating'
//                     name='uPersonalRating'
//                     checked={props.uPersonalRating === '4'}
//                     value='4'
//                     onChange={props.handleChange}
//                   />
//                   4
//                 </label>
//               </div>
//               <div
//                 className='radio form-group'
//                 style={{ 'margin-left': '100px' }}
//               >
//                 <label>
//                   <input
//                     className='form-control'
//                     type='radio'
//                     id='uPersonalRating'
//                     name='uPersonalRating'
//                     checked={props.uPersonalRating === '5'}
//                     value='5'
//                     onChange={props.handleChange}
//                   />
//                   5
//                 </label>
//               </div>
//             </Row>
//           </Container>
//           <div>
//             <Button type='button' onClick={props.onSubmit}>
//               Submit
//             </Button>
//           </div>
//         </form>
//       </Jumbotron>
//     </React.Fragment>
//   );
// }

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
