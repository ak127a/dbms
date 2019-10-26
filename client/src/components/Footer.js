import React from "react";
import { connect } from "react-redux";
import "../css/footer.css";

class Footer extends React.Component {
  state = {
    noOfLends: 0,
    noOfBorrows: 0
  };

  componentDidMount() {
    console.log("FROM MOUNT " + this.props.noOfRerenders);

    fetch("http://localhost:4000/stats")
      .then(res => res.json())
      .then(res => {
        this.setState({
          noOfLends: res[0].no_of_lends,
          noOfBorrows: res[0].no_of_borrows
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentWillReceiveProps() {
    console.log("FROM WILL RECIEVE PROPS " + this.props.noOfRerenders);
    fetch("http://localhost:4000/stats")
      .then(res => res.json())
      .then(res => {
        this.setState({
          noOfLends: res[0].no_of_lends,
          noOfBorrows: res[0].no_of_borrows
        });
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    return (
      <div className="footer-container">
        <div>Lends : {this.state.noOfLends}</div>
        <div style={{ marginLeft: "15px" }}>
          Borrows : {this.state.noOfBorrows}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { noOfRerenders: state.stats.noOfRerenders };
};

export default connect(
  mapStateToProps,
  null
)(Footer);
