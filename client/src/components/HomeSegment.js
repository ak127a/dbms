import React from "react";
import "../css/main.css";
import { Animated } from "react-animated-css";

const HomeSegment = () => {
  return (
    <Animated animationIn="zoomIn">
      <div className="home-card-container">
        <div className="home-card">
          <img src="./images/home-img.jpg" alt="home-img"></img>
          <p>We make book exchange easy.</p>
        </div>
      </div>
    </Animated>
  );
};

export default HomeSegment;
