// Confirmation.jsx
import React, { Component } from 'react';
import { Button, List } from 'semantic-ui-react';
import { registerUser } from "../../actions/authActions";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";



class Confirmation extends Component{
    // saveAndContinue = (e) => {
    //     e.preventDefault();
    //     this.props.nextStep();
    // }
    

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
        }
    }

    

    render(){
        // const {values: { firstName, lastName, email, password, password2, age, city, country }} = this.props;

        return(
            <div>
                <h1 className="ui centered">Confirm your Details</h1>



                <Button onClick={this.back}>Back</Button>
                <Button onClick={this.onSubmit}>Confirm</Button>


                {/* <p>Click Confirm if the following details have been correctly entered</p>
                <List>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>First Name: {firstName}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='users' />
                        <List.Content>Last Name: {lastName}</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='mail' />
                        <List.Content>
                            <a href='mailto:jack@semantic-ui.com'>{email}</a>
                        </List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='calendar' />
                        <List.Content>{age} Years</List.Content>
                    </List.Item>
                    <List.Item>
                        <List.Icon name='marker' />
                        <List.Content>{city}, {country}</List.Content>
                    </List.Item>
                </List> */}

                {/* <Button onClick={this.back}>Back</Button>*/}
                {/* <Button onClick={this.onSubmit}>Confirm</Button>  */}
            </div>
        )
    }
}

Confirmation.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Confirmation));

// export default Confirmation;
