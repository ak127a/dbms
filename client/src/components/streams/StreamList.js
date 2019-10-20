import React from "react";
import SimpleBar from "simplebar-react";
import { bookImg } from "../../images/book.jpg";

import "simplebar/dist/simplebar.min.css";
class BookList extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    fetch("http://localhost:4000/books")
      .then(response => response.json())
      .then(res => {
        this.setState({ books: res });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { books } = this.state;
    return (
      <SimpleBar style={{ height: "90vh" }}>
        <div className="books-container">{books.map(this.renderBook)}</div>
      </SimpleBar>
    );
  }

  renderBook = ({ book_id, author }) => {
    // return (
    //   <div key={book_id}>
    //     <h1>{book_id}</h1>
    //     <h2>{author}</h2>
    //   </div>
    // );

    return (
      <div className="book" key={book_id}>
        <img src={bookImg} alt="bla" />
        <h1>{book_id}</h1>
        <h2>{author}</h2>
      </div>
    );
  };
}

export default BookList;
