import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import "../../css/login.css";
import history from "../history";
import crypto from "crypto";
import { signIn } from "../../actions";

class Login extends React.Component {
  state = {
    user: null
  };

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

  handleUserLogin = user => {
    if (user) {
      this.setState({ user });
      console.log(this.state.user);
      this.props.signIn(this.state.user.usn);
      console.log(this.props.userId);
      history.push("/");
    } else {
      window.alert("WRONG CREDENTIALS");
    }
  };

  loginUser = ({ usn, password }) => {
    console.log(usn, password);
    const enkey = crypto.createCipher("aes-128-cbc", "secret");
    const dckey = crypto.createDecipher("aes-128-cbc", "secret");
    var enpw = enkey.update(password, "utf8", "hex");
    enpw += enkey.final("hex");
    console.log(enpw);
    var dcpw = dckey.update(enpw, "hex", "utf-8");
    dcpw += dckey.final("utf-8");
    console.log(dcpw);
    let user = {};
    fetch(`http://localhost:4000/login?usn=${usn}&password=${enpw}`)
      .then(res => {
        return res.json();
      })
      .then(res => {
        user = res[0];
        this.handleUserLogin(user);
      })
      .catch(err => console.log(err));
  };

  onSubmit = formValues => {
    this.loginUser(formValues);
  };

  render() {
    return (
      <div className="ui container form-container">
        <form
          className="login ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field name="usn" component={this.renderInput} label="Enter USN" />
          <Field
            name="password"
            component={this.renderInput}
            label="Enter Password"
            type="password"
          />
          <button className="ui button primary">Login</button>
        </form>
      </div>
    );
  }
}

const validate = ({ usn, password }) => {
  const errors = {};
  if (isNaN(usn)) {
    errors.usn = "USN must be a number";
  }
  if (!usn) {
    errors.usn = "You must enter an USN";
  }
  if (!password) {
    errors.password = "You must enter a password";
  }

  return errors;
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

Login = connect(
  mapStateToProps,
  { signIn }
)(Login);

export default reduxForm({
  form: "userLogin",
  validate
})(Login);
