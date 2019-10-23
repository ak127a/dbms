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

  render() {
    return (
      <div className="book" key={this.props.book_id}>
        <img src={bookImg} alt="bla" />
        <h1>{this.props.title}</h1>
        <h1>{this.props.subject}</h1>
        <div className="buttons container">
          <button
            onMouseEnter={this.animateButton}
            onMouseLeave={this.removeAnimation}
            className="borrow"
          >
            Borrow
          </button>
        </div>
      </div>
    );
  }
}

export default Book;
