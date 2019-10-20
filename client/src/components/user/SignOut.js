import React from "react";
import { connect } from "react-redux";
import { signOut } from "../../actions";
import history from "../history";

class SignOut extends React.Component {
  render() {
    return <div>Signing out..</div>;
  }

  componentDidMount() {
    this.props.signOut();
    history.push("/");
  }
}

const mapStateToProps = state => {
  return { isSignedIn: state.auth.isSignedIn };
};

export default connect(
  mapStateToProps,
  { signOut }
)(SignOut);
