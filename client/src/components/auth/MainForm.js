// MainForm.jsx
import React, { Component } from 'react';
import UserDetails from './UserDetails';
import PersonalDetails from './PersonalDetails';
import Confirmation from './Confirmation';
import Success from './Success';
import { registerUser } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class MainForm extends Component {
    state = {
        step: 1,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        age: '',
        city: '',
        country: ''
    }

    nextStep = () => {
        const { step } = this.state
        this.setState({
            step : step + 1
        })
    }

    prevStep = () => {
        const { step } = this.state
        this.setState({
            step : step - 1
        })
    }

    handleChange = input => event => {
        this.setState({ [input] : event.target.value })
    }

    // onSubmit = e => {
    // e.preventDefault();
    // // const {values: { firstName, lastName, email, password, password2, age, city, country }} = this.props;

    // const newUser = {
    //   firstname: this.props.firstName,
    //   email: this.props.email,
    //   password: this.props.password,
    //   password2: this.props.password2,
    //   age: this.props.age,
    //   city: this.props.city,
    //   country: this.props.country
    //   // dob: this.state.dob,
    //   // gender: this.state.gender,
    //   // ethgroup: this.state.ethgroup,
    //   // prelanguage: this.state.prelanguage,
    //   // condition: this.state.condition
    // };

    // this.props.registerUser(newUser, this.props.history);
  };

  // componentDidMount() {
  //   // If logged in and user navigates to Register page, should redirect them to dashboard
  //   if (this.props.auth.isAuthenticated) {
  //     this.props.history.push("/dashboard");
  //   }
  // }

  //   componentWillReceiveProps(nextProps) {
  //       if (nextProps.errors) {
  //       this.setState({
  //           errors: nextProps.errors
  //       });
  //       }
  //   }

    render(){
        const {step} = this.state;
        const { firstName, lastName, email, password, password2, age, city, country } = this.state;
        const values = { firstName, lastName, email, password, password2, age, city, country };
        switch(step) {
        case 1:
            return <UserDetails
                    nextStep={this.nextStep}
                    handleChange = {this.handleChange}
                    onSubmit={this.onSubmit}
                    values={values}
                    />
        case 2:
            return <PersonalDetails
                    nextStep={this.nextStep}
                    prevStep={this.prevStep}
                    handleChange = {this.handleChange}
                    values={values}
                    />
        case 3:
            return <Confirmation
                    // nextStep={this.onSubmit}
                    prevStep={this.prevStep}
                    onSubmit={this.onSubmit}
                    values={values}
                    />
    }
  }


// Mainform.propTypes = {
//   registerUser: PropTypes.func.isRequired,
//   auth: PropTypes.object.isRequired,
//   errors: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//   auth: state.auth,
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
//   { registerUser }
// )(withRouter(Mainform));
export default MainForm;