import React from "react";
import SimpleBar from "simplebar-react";
import "../../css/main.css";
import "../../css/userdetails.css";
import Book from "./Book";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import "simplebar/dist/simplebar.min.css";
import BookFilter from "./BookFilter";
class BookList extends React.Component {
  state = {
    books: [],
    showDetails: false
  };

  componentDidMount() {
    this.getBooks();
  }

  userDetails = () => {
    return (
      <div className="user-details-outer-container">
        <button
          onClick={() => {
            this.setState({ showDetails: false });
          }}
        >
          Dismiss
        </button>
      </div>
    );
  };

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
    if (this.state.showDetails === true) {
      return (
        <React.Fragment>
          <this.userDetails />
          <BookFilter
            getBooksWithFilters={this.getBooksWithFilters}
            onClear={this.getBooks}
          />
          <div className="books-outer-container">
            <div className="books-container">{books.map(this.renderBook)}</div>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <BookFilter
            getBooksWithFilters={this.getBooksWithFilters}
            onClear={this.getBooks}
          />
          <div className="books-outer-container">
            <div className="books-container">{books.map(this.renderBook)}</div>
          </div>
        </React.Fragment>
      );
    }
  }

  handleClick = e => {
    this.setState({ showDetails: true });
  };

  renderBook = ({ semester, subject, title, book_id }) => {
    return (
      <ScrollAnimation key={book_id} animateIn="bounceIn">
        <Book
          title={title}
          book_id={book_id}
          semester={semester}
          subject={subject}
          type="borrow"
          onButtonClick={e => {
            this.handleClick(e);
          }}
        />
      </ScrollAnimation>
    );
  };
}

export default BookList;
