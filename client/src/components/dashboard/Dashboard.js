import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from 'axios';
import { logoutUser } from "../../actions/authActions";

import './Dashboard.css';
import './UserNavbar.js'
import UserNavbar from "./UserNavbar.js";
import { Container, Row, Button, Col } from 'reactstrap';
import {
  Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle
} from 'reactstrap';
import "bootstrap/dist/css/bootstrap.min.css";
import Advance from './Advance.png';
import Assessments from './Assessments.png';
import Mood from './Mood.png';
import Sessions from './Sessions.png'
import Measure from './Measure.png'
import { Redirect } from "react-router-dom";
import Axios from "axios";


class Dashboard extends Component {
  // constructor(props) {
  //   super(props);
  //   // this.state = {
  //   //  firstLogin: ""
  //   // };
  // }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };


  componentDidMount() {
   
    if (this.props.auth.firstLogin) {
      this.props.history.push("/dashboard");
    }else{
      this.props.history.push("/assessment");
    }
  }

  render() {
    const { user } = this.props.auth;
    console.log(user);

    return (
    <div>
      <UserNavbar/>
      <Container>
        <Row>
          <Col xs="6" sm="4">
            <h4 style={{"marginTop": "80px"}}>
              <b style={{fontSize: "30px", fontFamily: "Montserrat"}}>Hey {user.name}!</b>
              </h4>
              <p className="flow-text grey-text text-darken-1" style={{fontFamily: "Montserrat"}}> 
                  Weclome to Healthynox{" "}
              </p>
              <Button
              style={{
                width: "300px",
                borderRadius: "3px",
                letterSpacing: "1.5px",
                marginTop: "1rem",
                fontFamily: "Montserrat"
              }}
              onClick={this.onSubmitAssessment}
              className="btn btn-large waves-effect waves-light hoverable blue accent-3"
            >
              Launch Short Self-Assessment
           
           </Button>
          </Col>
        </Row>
        <Row>
          <Col xs="6" sm="4">
              <Card>
              <CardBody>
                <CardTitle>Identify</CardTitle>
                <CardText>Complete assessments regularly to learn more about your state and personality.</CardText>
                <Button color= "primary">Take Assessment</Button>
              </CardBody>
              <CardImg top height= "100px"top width="100%" src={Assessments} alt="Card image cap" />
              </Card>
          </Col>
          <Col xs="6" sm="4">
              <Card>
              <CardBody>
                <CardTitle>Measure</CardTitle>
                <CardText>Monitor and reﬂect on progress against agreed milestones.</CardText>
                <Button color="primary">View Progress</Button>
              </CardBody>
              <CardImg top height= "100px" top width="100%" src={Measure} alt="Card image cap" />
              </Card>
          </Col>
          <Col xs="6" sm="4">
              <Card>
              <CardBody>
                <CardTitle>Advance</CardTitle>
                <CardText>Work towards your goals by completing tasks set by your personal therapist.</CardText>
                <Button color="primary">Complete Exercise</Button>
              </CardBody>
              <CardImg top height= "100px" top width="100%" src={Advance} alt="Card image cap" />
              </Card>
          </Col>
        </Row>
        <Row>
            <Col xs="6">
             <Card>
              <CardBody>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardSubtitle>Introductory Session (50 Minutes) on the 30th of April 2020 at 1:00 PM with Sven and Barbara. 
Join Session</CardSubtitle>
                <CardImg top height="100px" top width="100%" src={Sessions} alt="Card image cap" />
                <Button color="primary">Schedule Session</Button>
              </CardBody>
              </Card>
           </Col>
            <Col xs="6">
             <Card>
              <CardBody>
                <CardTitle>Mood Barometer</CardTitle>
                <CardSubtitle>Today I Feel</CardSubtitle>
                <CardImg top height = "100px" top width="20px" src={Mood} alt="Card image cap" />
                <Button color="primary">Send</Button>
              </CardBody>
              </Card>
           </Col>
        </Row>
      </Container>
        
            
     </div>
    );
  }
}


Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
  // fetchFirstLogin: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
