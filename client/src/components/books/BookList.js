import React from "react";
import "../../css/main.css";
import "../../css/userdetails.css";
import Book from "./Book";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import "simplebar/dist/simplebar.min.css";
import BookFilter from "./BookFilter";
import { setTimeout } from "timers";
class BookList extends React.Component {
  state = {
    books: [],
    showDetails: false
  };

  userDetailsObject = {
    name: "Bla",
    semester: 1,
    college: "PES"
  };

  componentDidMount() {
    this.getBooks();
  }

  fetchUserDetails = e => {
    var bookId = e.target.value;
    // fetch(`http://localhost:4000/bookuserdetails?book_id=${bookId}`)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.userDetailsObject.name = res[0].name;
    //     this.userDetailsObject.semester = res[0].semester;
    //     this.userDetailsObject.college = res[0].college;
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    fetch(`http://localhost:4000/userdetailsbook?book_id=${bookId}`)
      .then(response => response.json())
      .then(res => {
        console.log(res[0].userid);

        return res[0].userid;
      })
      .then(async userId => {
        await Promise.all(
          fetch(`http://localhost:4000/user?usn=${userId}`)
            .then(res => res.json())
            .then(res => {
              console.log(res);
              this.userDetailsObject.name = res[0].name;
              this.userDetailsObject.semester = res[0].semester;
              this.userDetailsObject.college = res[0].college;
            })
            .catch(err => console.error(err))
        );
      })
      .catch(err => {
        console.log(err);
      });
  };

  userDetails = () => {
    console.log(this.userDetailsObject);

    return (
      <div className="user-details-outer-container">
        <div className="user-details-card">
          <div>Name: {this.userDetailsObject.name}</div>
          <div>Semester: {this.userDetailsObject.semester}</div>
          <div>College: {this.userDetailsObject.college}</div>
          <button
            onClick={() => {
              this.setState({ showDetails: false });
            }}
          >
            Dismiss
          </button>
        </div>
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
    this.fetchUserDetails(e);
    setTimeout(() => {
      this.setState({ showDetails: true });
    }, 200);
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
