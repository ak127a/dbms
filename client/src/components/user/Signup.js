import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import "../../css/signup.css";
import crypto from "crypto";
import { Animated } from "react-animated-css";

class Signup extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta, type }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input type={type} {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  renderSemesterSelection = ({ label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select id="sem">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
        </select>
        {this.renderError(meta)}
      </div>
    );
  };

  renderCollegeSelection = ({ label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select id="college">
          <option value="PES">PES</option>
          <option value="BMSCE">BMSCE</option>
        </select>
        {this.renderError(meta)}
      </div>
    );
  };

  singupUser = ({ name, password, usn, semester, college }) => {
    const enkey = crypto.createCipher("aes-128-cbc", "secret");
    var enpw = enkey.update(password, "utf8", "hex");
    enpw += enkey.final("hex");
    fetch(
      `http://192.168.43.195:4000/signup?usn=${usn}&name=${name}&password=${enpw}&semester=${semester}&college=${college}`
    )
      .then(res => res.json())
      .then(res => {
        console.log(res);
        if (res.affectedRows === 1) {
          alert("User successfully added");
        } else if (res.code === "ER_DUP_ENTRY") {
          alert("User with that usn already exists");
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSubmit = formValues => {
    var sem = document.getElementById("sem");
    var college = document.getElementById("college");
    formValues.semester = sem.options[sem.selectedIndex].value;
    formValues.college = college.options[college.selectedIndex].value;
    console.log(formValues);
    this.singupUser(formValues);
  };

  render() {
    return (
      <React.Fragment>
        <Animated animationIn="bounceInLeft">
          <div className="signup-heading">SIGNUP</div>
        </Animated>
        <Animated animationIn="fadeInRight">
          <div className="ui container form-container">
            <form
              className="signup ui form error"
              onSubmit={this.props.handleSubmit(this.onSubmit)}
            >
              <Field
                name="usn"
                component={this.renderInput}
                label="Enter USN"
              />
              <Field
                name="name"
                component={this.renderInput}
                label="Enter Name"
              />
              <Field
                name="password"
                component={this.renderInput}
                label="Enter Password"
                type="password"
              />
              <Field
                name="confirmpassword"
                component={this.renderInput}
                label="Enter Confirm Password"
                type="password"
              />
              <Field
                name="semester"
                component={this.renderSemesterSelection}
                label="Select Semester"
              />
              <Field
                name="college"
                component={this.renderCollegeSelection}
                label="Select College"
              />
              <button className="ui button primary">Signup</button>
            </form>
          </div>
        </Animated>
      </React.Fragment>
    );
  }
}

const validate = ({ name, password, confirmpassword, usn }) => {
  const errors = {};
  if (!name) {
    errors.name = "You must enter a name";
  }
  if (!password) {
    errors.password = "You must enter a password";
  }
  if (!confirmpassword) {
    errors.confirmpassword = "You must enter a confirm password";
  }
  if (confirmpassword !== password) {
    errors.confirmpassword = "Passwords do not match";
  }
  if (isNaN(usn)) {
    errors.usn = "USN must be a number";
  }
  if (!usn) {
    errors.usn = "You must enter an USN";
  }
  return errors;
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

Signup = connect(
  mapStateToProps,
  null
)(Signup);

export default reduxForm({
  form: "userSignup",
  validate
})(Signup);
