import React from "react";
import SimpleBar from "simplebar-react";
import "../../css/main.css";
import Book from "./Book";
import "../../css/bookfilter.css";

import "simplebar/dist/simplebar.min.css";
import BookFilter from "./BookFilter";
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
      <React.Fragment>
        <BookFilter />
        <SimpleBar style={{ height: "90vh" }}>
          <div className="books-container">{books.map(this.renderBook)}</div>
        </SimpleBar>
      </React.Fragment>
    );
  }

  renderBook = ({ book_id, author }) => {
    // return (
    //   <div key={book_id}>
    //     <h1>{book_id}</h1>
    //     <h2>{author}</h2>
    //   </div>
    // );

    return <Book book_id={book_id} author={author} />;
  };
}

export default BookList;
