import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.css';
import { Button } from '@material-ui/core';
import logo from './logo.png';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed" style={{backgroundColor: "white"}}>
        <nav className="z-depth-0">
          <div className="nav-wrapper " style={{backgroundColor: "white"}} >
              <img src={logo} style={{"margin-top":"20px","margin-left":"10px","display": "inline-block"}}></img>
              <Button color="primary"
              style={{
                   "background-color": "#125FFF",
                    margin: "auto",
                    height: "40px",
                    width: "115px",
                    borderRadius: "40px",
                    letterSpacing: "0.5px",
                    marginTop: "1rem",
                    "position": "fixed",
                    "right":"450px"
              }}
                classname ="btn btn-large hoverable blue accent-3"
              >
                <Link to ="/" style= {{fontFamily: "Montserrat",
                    "font-size": "16px",
                    "font-weight": "bold"
                  }}>
                  Home
                </Link>
              </Button>
              
            {/* </div> */}

            {/* Add Sign in Button*/}
            {/* <div> */}
              <Button
              style={{
                   "background-color": "#125FFF",
                    margin: "auto",
                    width: "115px",
                    height: "40px",
                    borderRadius: "40px",
                    letterSpacing: "0.5px",
                    marginTop: "1rem",
                    "position": "fixed",
                    "right":"10px"
              }}
                classname ="btn btn-large hoverable blue accent-3"
              >
                <Link to ="/login" style= {{fontFamily: "Montserrat",
                    "font-size": "16px",
                    "font-weight": "bold"
                  }}>
                  Sign in
                </Link>
            
              </Button>
            {/* </div> */}

            {/* <div> */}
              <Button 
              style={{
                   "background-color": "#125FFF",
                    margin: "auto",
                    width: "115px",
                    height: "40px",
                    borderRadius: "40px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    "position": "fixed",
                    "right":"300px"
              }}
                classname ="btn btn-large hoverable blue accent-3"
              >
                <Link to ="/" style= {{fontFamily: "Montserrat",
                    "font-size": "16px",
                    "font-weight": "bold"
                  }}>
                  Science
                </Link>
            
              </Button>
            {/* </div> */}
            

            {/* <div> */}
              <Button
              style={{
                   "background-color": "#125FFF",
                    margin: "auto",
                    height: "40px",
                    width: "115px",
                    borderRadius: "40px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    "position": "fixed",
                    "right":"150px"
              }}
                classname ="btn btn-large hoverable blue accent-3"
              >
                <Link to ="/" style= {{fontFamily: "Montserrat",
                    "font-size": "16px",
                    "font-weight": "bold"
                  }}>
                  About Us
                </Link>
            
              </Button>
            </div>

        </nav>
      </div>
    );
  }
}

export default Navbar;
