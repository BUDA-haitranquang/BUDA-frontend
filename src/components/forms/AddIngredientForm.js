import React from "react";
import { Field, reduxForm } from "redux-form";
import TextField from "@mui/material/TextField";
import { Button } from "@mui/material";

const validate = values => {
  const errors = {};
  const requiredFields = [
    "name",
    "price"
  ];
  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = "Required";
    }
  });
  return errors;
};

const renderTextField = ({
                           label,
                           input,
                           meta: { touched, invalid, error },
                           ...custom
                         }) => (
  <TextField
    label={label}
    placeholder={label}
    error={touched && invalid}
    helperText={touched && error}
    {...input}
    {...custom}
  />
);

const AddIngredientForm = props => {
  const { handleSubmit, pristine, reset, submitting, classes } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Field
          name="name"
          component={renderTextField}
          label="Name"
        />
      </div>
      <div>
        <Field name="price" component={renderTextField} label="Price" />
      </div>
      <div>
        <Field name="category" component={renderTextField} label="Category" />
      </div>
      <div>
        <Field name="amount" component={renderTextField} label="Amount" />
      </div>
      <div />
      <div>
        <Field
          name="description"
          component={renderTextField}
          label="Description"
          multiline
          rowsMax="4"
          margin="normal"
        />
      </div>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="contained" color="error" disabled={pristine || submitting} onClick={reset}>
            Clear Values
          </Button>
          <Button variant="contained" type="submit" disabled={pristine || submitting}>
            Submit
          </Button>
        </div>

      </div>
    </form>
  );
};

export default reduxForm({
  form: "AddIngredientForm", // a unique identifier for this form
  validate
})(AddIngredientForm);