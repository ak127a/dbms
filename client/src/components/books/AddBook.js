import React from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import "../../css/main.css";
import "../../css/navbar.css";
import "../../css/addbook.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class AddBook extends React.Component {
  state = {
    loading: false
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

  insertBook = ({
    authors,
    college,
    date,
    semester,
    title,
    subject,
    condition,
    userId
  }) => {
    var book_id = 0;
    var authorsArray = authors.split(",").map(function(item) {
      return item.trim();
    });
    fetch(
      `http://localhost:4000/books/add?userid=${userId}&condition=${condition}&semester=${semester}&subject=${subject}&title=${title}&date=${date}&college=${college}&authors=${authors}`
    )
      .then(response => response.json())
      .then(res => {
        book_id = res.insertId;
        console.log("From .then -->" + book_id);
        return book_id;
      })
      .then(async bookId => {
        let alerted = false;
        await Promise.all(
          authorsArray.map(author => {
            return fetch(
              `http://localhost:4000/authors?book_id=${bookId}&author=${author}`
            )
              .then(res => res.json())
              .then(res => {
                console.log(res);
                if (!alerted) {
                  setTimeout(() => {
                    alert("Book successfully added!");
                  }, 2010);
                }
                alerted = true;
                setTimeout(() => {
                  this.setState({ loading: false });
                }, 2000);
              })
              .catch(err => console.error(err));
          })
        );
      })
      .catch(err => {
        console.log(err);
      });

    console.log(book_id);

    // authorsArray.forEach(author => {
    //   fetch(`http://localhost:4000/author?book_id=${}`)
    // });
  };

  onSubmit = formValues => {
    this.setState({ loading: true });
    if (!this.props.isSignedIn) {
      alert("You must log in to submit a book");
    } else {
      console.log("user id : " + this.props.userId);
      var d = new Date().toISOString().slice(0, 10);
      console.log(d);
      formValues.date = d;
      // var authorsArray = formValues.authors.split(",").map(item => item.trim());
      // formValues.authors = authorsArray;
      formValues.userId = this.props.userId;
      var sem = document.getElementById("sem");
      var subject = document.getElementById("subject");
      var college = document.getElementById("college");
      var condition = document.getElementById("condition");
      formValues.condition = condition.options[condition.selectedIndex].value;
      formValues.subject = subject.options[subject.selectedIndex].value;
      formValues.semester = sem.options[sem.selectedIndex].value;
      formValues.college = college.options[college.selectedIndex].value;
      console.log(formValues);
      this.insertBook(formValues);
    }
  };

  renderSubjectSelection = ({ label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select id="subject">
          <option value="Maths">Maths</option>
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="OOMD">OOMD</option>
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

  renderConditionSelection = ({ label, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label>{label}</label>
        <select id="condition">
          <option value="good">good</option>
          <option value="bad">bad</option>
        </select>
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

  render() {
    if (this.state.loading === true) {
      console.log("rendering the loader");

      return (
        <div className="loader-container">
          <Loader
            type="CradleLoader"
            color="linear-gradient(to right, #9c4543 0%, #bb4034 100%)"
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      );
    } else {
      return (
        <div className="ui container form-container">
          <form
            className="ui form error"
            onSubmit={this.props.handleSubmit(this.onSubmit)}
          >
            <Field
              name="authors"
              component={this.renderInput}
              label="Enter Authors(Separated by  , )"
            />
            <Field
              name="title"
              component={this.renderInput}
              label="Enter Title"
            />
            <Field
              name="subject"
              component={this.renderSubjectSelection}
              label="Select Subject"
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
            <Field
              name="condition"
              component={this.renderConditionSelection}
              label="Select Condition"
            />
            <button className="ui button primary">Submit</button>
          </form>
        </div>
      );
    }
  }
}

const validate = ({ authors, title }) => {
  const errors = {};
  if (!title) {
    errors.title = "You must enter an title";
  }
  if (!authors) {
    errors.authors = "You must enter an author";
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
