import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../actions";
import { connect } from "react-redux";
import logo from "../images/l5.png";
import "../css/navbar.css";

// const Header = () => {
//   return (
//     <div className="ui secondary pointing menu">
//       <Link to="/" className="item">
//         Streamy
//       </Link>
//       <div className="right menu">
//         <Link to="/" className="item">
//           All Streams
//         </Link>
//         <GoogleAuth />
//       </div>
//     </div>
//   );
// };

class Header extends React.Component {
  renderLendingBorrowing = () => {
    if (this.props.isSignedIn === true) {
      return [
        <li key="borrow">
          <Link to="/books" className="a">
            Borrow
          </Link>
        </li>,
        <li key="Lend">
          <Link to="/books/add" className="a">
            Lend
          </Link>
        </li>
      ];
    }
  };

  showRegister = () => {
    console.log("showrgister called");
  };

  componentDidMount() {
    if (!this.props.isSignedIn) {
      document.getElementById("my-profile").style.display = "none";
    }
  }

  componentDidUpdate() {
    if (this.props.isSignedIn === false) {
      document.getElementById("my-profile").style.display = "none";
    }
    if (this.props.isSignedIn) {
      document.getElementById("my-profile").style.display = "block";
    }
  }

  loginItems = () => {
    const isSignedIn = this.props.isSignedIn;
    if (!isSignedIn) {
      console.log("NOPE");
      return (
        <React.Fragment>
          <li>
            <Link to="/signup" className="a">
              SignUp
            </Link>
          </li>
          <li>
            <Link to="/login" className="a">
              LogIn
            </Link>
          </li>
        </React.Fragment>
      );
    } else {
      console.log("YEP");

      return (
        <li>
          <Link to="/signout" className="a">
            SignOut
          </Link>
        </li>
      );
    }
  };

  render() {
    console.log(this.props.isSignedIn);
    return (
      <section className="navigation">
        <div className="nav-container">
          <div className="brand">
            <img src={logo} alt="bla" />
          </div>
          <nav>
            <div className="nav-mobile">
              <a id="nav-toggle" href="#!">
                <span></span>
              </a>
            </div>
            <ul className="nav-list">
              <li>
                <Link to="/" className="a">
                  Home
                </Link>
              </li>
              {this.renderLendingBorrowing()}
              {/* <li>
                <GoogleAuth />
              </li> */}
              <li id="my-profile">
                <a className="a" href="#123">
                  My Profile
                </a>
                <ul className="nav-dropdown">
                  <li>
                    <Link to="/myprofile/lendings" className="a">
                      Lendings
                    </Link>
                  </li>
                  <li>
                    <Link to="/myprofile/details" className="a">
                      Details
                    </Link>
                  </li>
                </ul>
              </li>
              {this.loginItems()}
            </ul>
          </nav>
        </div>
      </section>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signOut }
)(Header);
