import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import UserNavbar from '../dashboard/UserNavbar';
import { Container, Row, Button, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import Michael from './chad2.jpg'
import Rachel from './rachel3.jpg'
import Chad from './chad3.jpg'

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';
import Axios from 'axios';

const employees = [
  { _id: 1, name: 'Michael Sanchez', picture: Michael, contact: 'michaelsoz@gmail.com', college: "Harvard" },
  { _id: 2, name: 'Rachel Osborn', picture: Rachel, contact: 'rahceob@gmail.com', college: "Harvard"},
//   { _id: 3, name: 'Chad Baldwick', picture: Chad, contact: 'chadbadwick@college.princeton.edu', college: "Princeton"},
];

const fakeRequest = () =>
  new Promise((resolve) => setTimeout(() => resolve(employees), 1000));

class Discover extends Component {
  state = {
    employees: [],
  };
  componentDidMount() {
    fakeRequest().then((employees) => this.setState({ employees }));
  }
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };
  render() {
    const employees = this.state.employees.map((employee) => (
            <Card>
                <CardBody>
                  <CardTitle>{employee.name}</CardTitle>
                  <CardText>
                    Graduated from {employee.college}                  
                   </CardText>
                </CardBody>
                <CardImg
                  
                  src={employee.picture}
                  alt='Card image cap'
                />
                <Link to='calendar'>
                    <Button color='primary'>Set Appointment</Button>
                 </Link>
             </Card>
             
    //   <div style={{ border: '2px solid black', margin: '0 auto'}} key={employee._id}>
          
    //     <h3>{employee.name}</h3>
    //     <p>{employee.contact}</p>
    //     <p>{employee.college}</p>
    //     <button
    //       className='btn btn-primary float-left'
    //       type='button'
    //       onClick={this._next}
    //     >
    //       Set Up Appointment
    //     </button>
    //     {/* <button>Set Up Appointment</button> */}
    //   </div>
    ));
    const { user } = this.props.auth;
    return (
      <div>
        <UserNavbar user={user} />
        <Container>
          <Row>
            <Col xs='6' sm='4'>
              <h4 style={{ marginTop: '80px' }}>
                <b style={{ fontSize: '30px', fontFamily: 'Montserrat' }}>
                  Hey, {user.firstName}!
                </b>
              </h4>
              <p
                className='flow-text grey-text text-darken-1'
                style={{ fontFamily: 'Montserrat' }}
              >
                Have a look at the list of counselors available!{' '}
              </p>
            </Col>
          </Row>
          <Row>
            {employees}
          </Row>
        </Container>
      </div>
    );
  }
}

Discover.propTypes = {
  auth: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Discover);
