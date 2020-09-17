import React, { Component } from 'react';
import { Link } from 'react-router-dom';
// import Login from '../auth/Login';
import Navbar from './layouts/Navbar';
import { Row, Col, Container, Jumbotron, Button } from 'reactstrap';
import './Home.css';
import image_4 from './image_4.png';

class Landing extends Component {
  render() {
    return (
      <div id='body'>
        <Navbar />
        <Container>
          {/* <Jumbotron> */}
          <Row>
            <div
              style={{ margin: '0 auto', height: '75vh' }}
              className='container valign-wrapper'
            >
              <div className='row'>
                <div className='col s6 left-align'>
                  <h4>
                    <span
                      style={{ fontFamily: 'Montserrat', 'font-size': '40px' }}
                    >
                      <b>
                        An admission counselling platform created for students
                      </b>{' '}
                    </span>
                  </h4>
                  <p
                    className='flow-text black-text text-darken-1'
                    style={{ fontFamily: 'Montserrat', 'font-size': '22px' }}
                  >
                    Collab is a space for students applying to universities to
                    get guidance and support from selected college students
                  </p>
                  <br />
                </div>
              </div>
              <img src={image_4} alt="Logo" />
            </div>
            {/* </Jumbotron> */}
          </Row>
        </Container>
      </div>
    );
  }
}

export default Landing;
