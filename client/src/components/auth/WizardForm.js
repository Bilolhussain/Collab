
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { registerUser } from "../../actions/authActions";
// import UserEmail from './UserEmail';
// import RaisedButton from 'material-ui/RaisedButton';
// import UserPassword from './UserPassword';
// import Confirm from './Confirm';

import React, { Component, PropTypes } from 'react'
import WizardFormFirstPage from './WizardFormFirstPage'
import WizardFormSecondPage from './WizardFormSecondPage'
import WizardFormThirdPage from './WizardFormThirdPage'

class WizardForm extends Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
    this.previousPage = this.previousPage.bind(this)
    this.state = {
      page: 1
    }
  }
  nextPage() {
    this.setState({ page: this.state.page + 1 })
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 })
  }

  render() {
    const { onSubmit } = this.props
    const { page } = this.state
    return (<div>
        {page === 1 && <WizardFormFirstPage onSubmit={this.nextPage}/>}
        {page === 2 && <WizardFormSecondPage previousPage={this.previousPage} onSubmit={this.nextPage}/>}
        {page === 3 && <WizardFormThirdPage previousPage={this.previousPage} onSubmit={onSubmit}/>}
      </div>
    )
  }
}

WizardForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default WizardForm



















// import UserInfo from './UserInfo';
// import UserInfo3 from './UserInfo3';
// import UserInfo4 from './UserInfo4';
// import UserInfo5 from './UserInfo5';
// import UserInfo6 from './UserInfo6';

// import { Link, withRouter } from "react-router-dom";
// import PropTypes from "prop-types";
// import { connect } from "react-redux";
// import { registerUser } from "../../actions/authActions";
// import classnames from "classnames";
// import { Container, Row, Col } from 'reactstrap';
// import Navbar from "../layout/Navbar";
// import './register.css';
// import Register from "./Register";

// export class UserForm extends Component {
//     constructor() {
//         super();
//         this.state = {
//             step: 1,
//             email: "",
//             // firstName: "",
//             // lastName: "",
//             password: "",
//             password2: "",
//             // dob: "",
//             // gender: "",
//             // ethgroup: "",
//             // prelanguage: "",
//             // condition: "",
//             // errors: {}
//         };
//     }

//     componentDidMount() {
//     // If logged in and user navigates to Register page, should redirect them to dashboard
//         if (this.props.auth.isAuthenticated) {
//             this.props.history.push("/dashboard");
//         }
//     }

    

//     //Proceed to next step
//     nextStep = () => {
//         const { step }= this.state;
//         this.setState({
//             step: step + 1
//         });
//     }

//     prevStep = () => {
//         const { step }= this.state;
//         this.setState({
//             step: step - 1
//         });
//     }

//     //Handle field change
//     handleChange = input => e => {
//         this.setState({[input]: e.target.value})
//     }

//     render(){
//         // const { errors } = this.state;
//         const { step, email ,
//             // firstName,
//             // lastName,
//             password,
//             password2,
//             // dob,
//             // gender,
//             // ethgroup,
//             // prelanguage,
//             // condition,
//             //errors
//              } = this.state;

//         const values = { email,
//             // firstName,
//             // lastName,
//             password,
//             password2,
//             // dob,
//             // gender,
//             // ethgroup,
//             // prelanguage,
//             // condition,
//             // errors 
//         }
        
//     switch(step){
//         case 1:
//             return (
//                 <UserEmail 
//                     nextStep = {this.nextStep}
//                     handleChange={this.handleChange}
//                     values= {values}
//                 />
//             );
//         case 2:
//             return(
//                 <UserPassword 
//                     nextStep = {this.nextStep}
//                     prevStep = {this.prev}
//                     handleChange={this.handleChange}
//                     values= {values}
//                 />
//             );
//         case 3:
//             return(
//                 <Confirm
//                     prevStep = {this.prev}
//                     // handleChange={this.handleChange}
//                     // handle
//                     values= {values}
//                 />
//             );
//         // case 4:
//         //     Redirect("/dashboard")
//         // case 5:
//         //     return<h1>UnserInfo5</h1>
//         // case 6:
//         //     return<h1>UnserInfo6</h1>
//     }
//   }
// }


// export default UserForm