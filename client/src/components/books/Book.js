import React from "react";
import bookImg from "../../images/book.jpg";
import "../../css/book.css";

class Book extends React.Component {
  render() {
    return (
      <div className="book" key={this.props.book_id}>
        <img src={bookImg} alt="bla" />
        <h1>{this.props.book_id}</h1>
        <h2>{this.props.author}</h2>
        <div className="buttons container">
          <button className="borrow">Borrow</button>
        </div>
      </div>
    );
  }
}

export default Book;
