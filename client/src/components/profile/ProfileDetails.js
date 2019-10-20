import React from "react";
import "../../css/profileCard.css";

class ProfileDeatils extends React.Component {
  render() {
    return (
      <div className="profile-card-container">
        <div className="profile-card">
          <i class="fa fa-5x fa-user-circle" aria-hidden="true"></i>
          <h1>My Name here</h1>
          <hr className="line" />
          <div className="college-name-container">
            <h3>Studying At :</h3>
            <div className="college-name">PES Electronic City Campus</div>
          </div>
          <div className="stats-container">
            <div className="stats-lend">
              <h3>Number of Books lent :</h3>
              <div className="stats-number">50</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileDeatils;
