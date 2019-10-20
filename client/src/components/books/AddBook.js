import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import "../../css/main.css";
import "../../css/navbar.css";
import "../../css/addbook.css";

class AddBook extends React.Component {
  renderError({ error, touched }) {
    if (touched && error) {
      return (
        <div className="ui error message">
          <div className="header">{error}</div>
        </div>
      );
    }
  }

  renderInput = ({ input, label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <input {...input} />
        {this.renderError(meta)}
      </div>
    );
  };

  insertBook = ({ id, author }) => {
    fetch(`http://localhost:4000/books/add?id=${id}&author=${author}`)
      .then(response => response.json())
      .then(res => {
        if (res.affectedRows === 1) {
          alert("Book added");
        } else if (res.code === "ER_DUP_ENTRY") {
          alert(`A book already exists with an id ${id}`);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  onSubmit = formValues => {
    if (!this.props.isSignedIn) {
      alert("You must log in to submit a book");
    } else {
      console.log("user id : " + this.props.userId);
      this.insertBook(formValues);
    }
  };

  render() {
    return (
      <div className="ui container form-container">
        <form
          className="ui form error"
          onSubmit={this.props.handleSubmit(this.onSubmit)}
        >
          <Field name="id" component={this.renderInput} label="Enter Id" />
          <Field
            name="author"
            component={this.renderInput}
            label="Enter Author"
          />
          <button className="ui button primary">Submit</button>
        </form>
      </div>
    );
  }
}

const validate = ({ id, author }) => {
  const errors = {};
  if (!id) {
    errors.id = "You must enter an id";
  }
  if (!author) {
    errors.author = "You must enter an author";
  }

  return errors;
};

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

AddBook = connect(
  mapStateToProps,
  null
)(AddBook);

export default reduxForm({
  form: "streamCreate",
  validate
})(AddBook);
