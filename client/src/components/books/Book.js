import React from "react";
import bookImg from "../../images/book.jpg";
import "../../css/book.css";
import "../../css/main.css";
import "animate.css/animate.min.css";
class Book extends React.Component {
  animateButton = e => {
    console.log(e.target);
    e.target.className = "borrow animated infinite pulse";
  };

  removeAnimation = e => {
    e.target.className = "borrow";
  };

  capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  render() {
    return (
      <div className="book">
        <img src={bookImg} alt="bla" />
        <h1>{this.props.title}</h1>
        <h2>Semester : {this.props.semester}</h2>
        <h2>{this.props.subject}</h2>
        <div className="buttons container">
          <button
            onMouseEnter={this.animateButton}
            onMouseLeave={this.removeAnimation}
            className={this.props.type}
            value={this.props.book_id}
            onClick={this.props.onButtonClick}
          >
            {this.capitalizeFirstLetter(this.props.type)}
          </button>
        </div>
      </div>
    );
  }
}

export default Book;
