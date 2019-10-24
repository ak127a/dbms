import React from "react";
import SimpleBar from "simplebar-react";
import "../../css/main.css";
import Book from "./Book";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import "simplebar/dist/simplebar.min.css";
import BookFilter from "./BookFilter";
class BookList extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooksWithFilters = whereClause => {
    fetch(`http://localhost:4000/books?whereClause=${whereClause}`)
      .then(response => response.json())
      .then(res => {
        this.setState({ books: res });
      })
      .catch(err => {
        console.log(err);
      });
  };

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
    console.log(this.state.books);
    return (
      <React.Fragment>
        {/* <SimpleBar style={{ height: "90vh" }}> */}
        <BookFilter
          getBooksWithFilters={this.getBooksWithFilters}
          onClear={this.getBooks}
        />
        <div className="books-outer-container">
          <div className="books-container">{books.map(this.renderBook)}</div>
        </div>
        {/* </SimpleBar> */}
      </React.Fragment>
    );
  }

  renderBook = ({ semester, subject, title, book_id }) => {
    // return (
    //   <div key={book_id}>
    //     <h1>{book_id}</h1>
    //     <h2>{author}</h2>
    //   </div>
    // );

    return (
      <ScrollAnimation key={book_id} animateIn="bounceIn">
        <Book
          title={title}
          semester={semester}
          subject={subject}
          type="borrow"
        />
      </ScrollAnimation>
    );
  };
}

export default BookList;
