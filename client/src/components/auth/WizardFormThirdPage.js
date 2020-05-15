// class Step3 extends React.Component {
//     render() {
//       if (this.props.currentStep !== 1) { // Prop: The current step
//         return null
//       }
//       // The markup for the Step 1 UI
//       return(
//         <div className="form-group">
//           <label htmlFor="firstName">First Name</label>
//           <input
//             className="form-control"
//             id="firstName"
//             name="firstName"
//             type="text"
//             placeholder="Enter First Name"
//             value={this.props.firstName} // Prop: The email input data
//             onChange={this.props.handleChange} // Prop: Puts data into state
//           />
//         </div>
//       )
//     }
import React from 'react'
import { Field, reduxForm } from 'redux-form'
import validate from './validate'
const { DOM: { input, select, textarea } } = React
const colors = [ 'Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet' ]

const WizardFormThirdPage = (props) => {
  const { handleSubmit, pristine, previousPage, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Favorite Color</label>
        <Field name="favoriteColor" component={favoriteColor =>
          <div>
              <select {...favoriteColor}>
                <option value="">Select a color...</option>
                {colors.map(colorOption =>
                  <option value={colorOption} key={colorOption}>{colorOption}</option>)
                }
              </select>
                {favoriteColor.touched && favoriteColor.error && <span>{favoriteColor.error}</span>}
          </div>
        }/>
      </div>
      <div>
        <label htmlFor="employed">Employed</label>
        <div>
          <Field name="employed" id="employed" component={input} type="checkbox"/>
        </div>
      </div>
      <div>
        <label>Notes</label>
        <div>
          <Field name="notes" component={textarea}/>
        </div>
      </div>
      <div>
        <button type="button" className="previous" onClick={previousPage}>Previous</button>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
      </div>
    </form>
  )
}
export default reduxForm({
  form: 'wizard', //Form name is same
  destroyOnUnmount: false,
  validate
})(WizardFormThirdPage)