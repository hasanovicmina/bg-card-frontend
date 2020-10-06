import React, { Component } from "react";
import Jumbotron from "./jumbotron";
import Columns from "./common/columns";
import { toast } from "react-toastify";

class Home extends Component {
  state = {};

  componentDidUpdate() {
    if (sessionStorage.getItem("memberLogInMessage")) {
      toast.success("Member successfully logged in.");
      sessionStorage.removeItem("memberLogInMessage");
    }
    if (sessionStorage.getItem("partnerLogInMessage")) {
      toast.success("Partner successfully logged in.");
      sessionStorage.removeItem("partnerLogInMessage");
    }
    if (sessionStorage.getItem("logoutMessage")) {
      toast.success("You successfully logged out.");
      sessionStorage.removeItem("logoutMessage");
    }
  }
  render() {
    return (
      <div className="min-vh-100">
        <Jumbotron />
        <Columns />
      </div>
    );
  }
}

export default Home;
