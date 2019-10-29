import React from "react";
import { connect } from "react-redux";
import Book from "../books/Book";
import { updateFooter } from "../../actions";
import "../../css/main.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";

import "simplebar/dist/simplebar.min.css";
class MyLendings extends React.Component {
  state = {
    books: [],
    loading: false
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks = () => {
    fetch(`http://192.168.43.195:4000/booksilent?user_id=${this.props.userId}`)
      .then(response => response.json())
      .then(res => {
        console.log(res);
        this.setState({ books: res });
        // setTimeout(() => {
        //   this.setState({ loading: false });
        // }, 1500);
      })
      .catch(err => {
        console.log(err);
      });
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
    } else if (this.state.books.length === 0) {
      return (
        <div className="msg-container">
          <ScrollAnimation animateIn="bounceInRight">
            <div className="msg">
              All your books have been borrowed!!! Or you have not lended any. I
              don't know.
            </div>
          </ScrollAnimation>
        </div>
      );
    } else {
      const { books } = this.state;
      return (
        <div className="books-outer-container">
          <div className="books-container">{books.map(this.renderBook)}</div>
        </div>
      );
    }
  }

  buttonClickHandler = e => {
    console.log(e.target.value);
    const book_id = e.target.value;
    this.setState({ loading: true });
    fetch(`http://192.168.43.195:4000/history?book_id=${book_id}`)
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.props.updateFooter();
        setTimeout(() => {
          this.setState({ loading: false });
        }, 1500);
        this.getBooks();
      })
      .catch(err => console.error(err));
  };

  renderBook = ({ semester, book_id, title, subject }) => {
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
          book_id={book_id}
          semester={semester}
          subject={subject}
          type="lended"
          onButtonClick={e => {
            this.buttonClickHandler(e);
          }}
        />
      </ScrollAnimation>
    );
  };
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(
  mapStateToProps,
  { updateFooter }
)(MyLendings);
