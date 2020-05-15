// PersonalDetails.jsx
import React, { Component } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { throws } from 'assert';

class PersonalDetails extends Component{
    saveAndContinue = (e) => {
        e.preventDefault();
        this.props.nextStep();
    }

    back  = (e) => {
        e.preventDefault();
        this.props.prevStep();
    }

    render(){
        const { values } = this.props
        return(
        <Form color='blue' onSubmit={this.onSubmit} >
            <h1 className="ui centered">Enter Personal Details</h1>
            <Form.Field>
                <label>Password</label>
                <input placeholder='Password'
                onChange={this.props.handleChange('password')}
                defaultValue={values.password}
                />
            </Form.Field>
            <Form.Field>
                <label>Confirm Password</label>
                <input placeholder='Confirm password'
                onChange={this.props.handleChange('password2')}
                defaultValue={values.password2}
                />
            </Form.Field>
            <Form.Field>
                <label>Age</label>
                <input placeholder='Age'
                onChange={this.props.handleChange('age')}
                defaultValue={values.age}
                />
            </Form.Field>
            <Form.Field>
                <label>City</label>
                <input placeholder='City'
                onChange={this.props.handleChange('city')}
                defaultValue={values.city}
                />
            </Form.Field>
            <Form.Field>
                <label>Country</label>
                <input placeholder='Country'
                onChange={this.props.handleChange('country')}
                defaultValue={values.country}
                />
            </Form.Field>
            <Button onClick={this.back}>Back</Button>
            <Button onClick={this.saveAndContinue}>Save And Continue </Button>
        </Form>
        )
    }
}

export default PersonalDetails;
