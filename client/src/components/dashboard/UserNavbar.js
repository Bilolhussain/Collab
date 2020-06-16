
import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import logo from './logo.png';
import Home from './Home.png';
import { Badge, Button, Row, Col, Container } from 'reactstrap';
import { AiFillMessage } from "react-icons/ai";
import { AiFillCalendar } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import {AiFillBell} from "react-icons/ai";
import './UserNavbar.css';


import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText
} from 'reactstrap';

class UserNavbar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: false,
      setIsOpen: false,
    };
    this.toggle = this.toggle.bind(this);
    this.onLogoutClick= this.onLogoutClick.bind(this)
  }

  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  toggle() {
    this.setState({
      isOpen: !this.state.setIsOpen
    });
  }

render(){
 const { user } = this.props.auth;
  return (
    <div>
      <Container>
          <Navbar color="light" expand="md">
                <NavbarBrand style={{"margin-left":"20px"}} ><img src={logo} style={{"margin-top":"20px","margin-left":"10px","display": "inline-block"}}></img></NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.isOpen} navbar>
                <Nav style={{"border-bottom": "0"}} className="container-fluid">
                    
                    {/* <Col xs="6"> */}
                        <NavItem className="ml-auto" style ={{"display": "inline-block","margin-right": "10px"}}>
                            <Button style ={{backgroundColor: "#0276FD", borderRadius: "100px", marginTop: "20px", display:"inline-block"}}>
                                <div style = {{color: 'white'}}>
                                    <AiFillHome size={26}  />
                                </div>
                            </Button>
                        </NavItem>
                        <NavItem style ={{"display": "inline-block","margin-right": "10px"}}>
                            <Button style ={{backgroundColor: "#0276FD", borderRadius: "100px", marginTop: "20px", display:"inline-block"}}>
                                <div style = {{color: 'white'}}>
                                    <AiFillCalendar size={26}  />
                                </div>
                            </Button>
                        </NavItem>
                        <NavItem style ={{"display": "inline-block","margin-right": "10px"}}>
                        <Button style ={{backgroundColor: "#0276FD", borderRadius: "100px", marginTop: "20px", display:"inline-block"}}>
                                <div style = {{color: 'white' }} >
                                    <AiFillMessage size={28}  />
                                </div>
                        </Button>
                        </NavItem>
                        <NavItem style ={{"display": "inline-block","margin-right": "10px"}}>
                            <Button style ={{backgroundColor: "#0276FD", borderRadius: "100px", marginTop: "20px", display:"inline-block"}}>
                            <div style = {{color: 'white'}}>
                                <AiFillBell size={28}  />
                            </div>
                        </Button>
                        </NavItem >
                        <NavItem style ={{"display": "inline-block","margin-right": "20px", "margin-left": "-10px"}}>
                            <UncontrolledDropdown nav inNavbar >
                                <DropdownToggle nav caret >
                                    <Button color="primary" style = {{marginRight: "20px", backgroundColor: "0276FD", width: "100px", borderRadius: "20px", marginTop: "20px", display:"inline-block"}}>
                                        <img src={user.fileimg}>
                                        </img>
                                        {user.name}
                                    </Button>
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem>
                                    Resources
                                    </DropdownItem>
                                    <DropdownItem>
                                    FAQ
                                    </DropdownItem>
                                    <DropdownItem>
                                    Settings
                                    </DropdownItem>
                                    <DropdownItem>
                                            <button
                                                style={{
                                                    width: "100px",
                                                    borderRadius: "3px",
                                                    letterSpacing: "1.5px",
                                                    // marginTop: "1rem",
                                                    fontFamily: "Montserrat"
                                                }}
                                                onClick={this.onLogoutClick}
                                                className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                                                >
                                                Logout
                                                </button>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </NavItem>
                    {/* </Col> */}
                        
                        
                </Nav>
                </Collapse>
            </Navbar>
      </Container>
                
    </div>
  );
  }}


UserNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(UserNavbar);


  
