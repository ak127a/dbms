import React from "react";
import { Route, Router } from "react-router-dom";
import BookList from "./books/BookList";
import Header from "./Header";
import HomeSegment from "./HomeSegment";
import AddBook from "./books/AddBook";
import EditBook from "./books/EditBook";
import ProfileDetails from "./profile/ProfileDetails";
import MyLendings from "./profile/MyLendings";
import Logout from "./profile/Logout";
import Login from "./user/Login";
import SignOut from "./user/SignOut";
import Footer from "./Footer";
import Signup from "./user/Signup";
import history from "./history";

const App = () => {
  return (
    <Router history={history}>
      <Header />
      <Footer />
      <Route path="/" exact component={HomeSegment} />
      <Route path="/myprofile/details" exact component={ProfileDetails} />
      <Route path="/myprofile/lendings" exact component={MyLendings} />
      <Route path="/myprofile/logout" exact component={Logout} />
      <Route path="/books" exact component={BookList} />
      <Route path="/books/add" exact component={AddBook} />
      <Route path="/books/edit" exact component={EditBook} />
      <Route path="/login" exact component={Login} />
      <Route path="/signout" exact component={SignOut} />
      <Route path="/signup" exact component={Signup} />
    </Router>
  );
};

export default App;
