import React, { Component } from "react";
import { Link } from "react-router-dom";
import './navbar.css';

class Navbar extends Component {
  render() {
    return (
      <div className="navbar-fixed">
        <nav className="z-depth-0">
          <div className="nav-wrapper " style = {{"background-color": "#DCEDFF"}}> 
            <Link
              to="/"
              style={{
                fontFamily: "Montserrat Bold",
                "font-size": "20px",
                "font-weight": "bold",
                "position": "fixed",
                "left": "100px",
              }}
              className="col s5 brand-logo black-text" 
            >
              HEALTHYNOX
            </Link>
            <div>
              <button 
              style={{
                   "background-color": "#125FFF",
                    margin: "auto",
                    width: "110px",
                    borderRadius: "10px",
                    letterSpacing: "0.5px",
                    marginTop: "1rem",
                    "position": "fixed",
                    "right":"450px"
              }}
                classname ="btn btn-large hoverable blue accent-3"
              >
                <Link to ="/" style= {{fontFamily: "Montserrat",
                    "font-size": "20px"
                    // "font-weight": "bold"
                  }}>
                  Home
                </Link>
            
              </button>
            </div>

            {/* Add Sign in Button*/}
            <div>
              <button 
              style={{
                   "background-color": "#125FFF",
                    margin: "auto",
                    width: "110px",
                    borderRadius: "10px",
                    letterSpacing: "0.5px",
                    marginTop: "1rem",
                    "position": "fixed",
                    "right":"10px"
              }}
                classname ="btn btn-large hoverable blue accent-3"
              >
                <Link to ="/login" style= {{fontFamily: "Montserrat",
                    "font-size": "20px",
                    // "font-weight": "bold"
                  }}>
                  Sign in
                </Link>
            
              </button>
            </div>

            <div>
              <button 
              style={{
                   "background-color": "#125FFF",
                    margin: "auto",
                    width: "110px",
                    borderRadius: "10px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    "position": "fixed",
                    "right":"300px"
              }}
                classname ="btn btn-large hoverable blue accent-3"
              >
                <Link to ="/" style= {{fontFamily: "Montserrat",
                    "font-size": "20px",
                    // "font-weight": "bold"
                  }}>
                  Science
                </Link>
            
              </button>
            </div>
            

            <div>
              <button 
              style={{
                   "background-color": "#125FFF",
                    margin: "auto",
                    width: "110px",
                    borderRadius: "10px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem",
                    "position": "fixed",
                    "right":"150px"
              }}
                classname ="btn btn-large hoverable blue accent-3"
              >
                <Link to ="/" style= {{fontFamily: "Montserrat",
                    "font-size": "20px",
                    // "font-weight": "bold"
                  }}>
                  About Us
                </Link>
            
              </button>
            </div>


          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
