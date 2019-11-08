import React from "react";
import { connect } from "react-redux";
import "../../css/profileCard.css";

class ProfileDeatils extends React.Component {
  state = {
    details: {}
  };

  fetchDetails = () => {
    var userId = this.props.userId;
    console.log("from ftc dtls" + userId);

    fetch(`http://192.168.43.195:4000/user?usn=${userId}`)
      .then(response => response.json())
      .then(res => {
        let userDetails = res[0];
        this.setState({
          details: {
            name: userDetails.name,
            college: userDetails.college,
            no_of_lends: userDetails.no_of_lends
          }
        });
      })
      // .then(async bookId => {
      //   let alerted = false;
      //   await Promise.all(
      //     authorsArray.map(author => {
      //       return fetch(
      //         `http://192.168.43.195:4000/authors?book_id=${bookId}&author=${author}`
      //       )
      //         .then(res => res.json())
      //         .then(res => {
      //           console.log(res);
      //           if (!alerted) {
      //             setTimeout(() => {
      //               alert("Book successfully added!");
      //             }, 2010);
      //           }
      //           alerted = true;
      //           setTimeout(() => {
      //             this.setState({ loading: false });
      //           }, 2000);
      //         })
      //         .catch(err => console.error(err));
      //     })
      //   );
      // })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.fetchDetails();
  }

  render() {
    return (
      <div className="profile-card-container">
        <div className="profile-card">
          <i
            style={{ width: "100%", marginTop: "50px", fontSize: "9em" }}
            class="fa fa-5x fa-user-circle"
            aria-hidden="true"
          ></i>
          <h1>{this.state.details.name}</h1>
          <hr className="line" />
          <div className="college-name-container">
            <h3>Studying At :</h3>
            <div className="college-name">{this.state.details.college}</div>
          </div>
          <div className="stats-container">
            <div className="stats-lend">
              <h3>Number of Books lent :</h3>
              <div className="stats-number">
                {this.state.details.no_of_lends}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn, userId: state.auth.userId };
};

export default connect(
  mapStateToProps,
  null
)(ProfileDeatils);
