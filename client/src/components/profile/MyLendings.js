import React from "react";
import { connect } from "react-redux";
import SimpleBar from "simplebar-react";
import bookImg from "../../images/book.jpg";
import "../../css/main.css";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import "simplebar/dist/simplebar.min.css";
class MyLendings extends React.Component {
  state = {
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    fetch(`http://localhost:4000/booksilent?user_id=${this.props.userId}`)
      .then(response => response.json())
      .then(res => {
        console.log(res);

        this.setState({ books: res });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { books } = this.state;
    return (
      <div className="books-outer-container">
        <div className="books-container">{books.map(this.renderBook)}</div>
      </div>
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
      <ScrollAnimation key={book_id} animateIn="bounceIn">
        <div className="book">
          <img src={bookImg} alt="bla" />
          <h1>{book_id}</h1>
          <h2>{author}</h2>
        </div>
      </ScrollAnimation>
    );
  };
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(
  mapStateToProps,
  null
)(MyLendings);
