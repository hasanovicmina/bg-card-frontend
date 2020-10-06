import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Home from "./components/home";
import NotFound from "./components/notFound";
import MemberRegisterForm from "./components/members/registerForm";
import MemberLoginForm from "./components/members/loginForm";
import PartnerRegisterForm from "./components/partners/registerForm";
import PartnerLoginForm from "./components/partners/loginForm";
import MembersDashboard from "./components/members/dashboard";
import PartnersDashboard from "./components/partners/dashboard";
import Logout from "./components/logout";
import auth from "./services/authService";
// import logo from "./logo.svg";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

class App extends Component {
  state = {
    currentUser: {},
  };
  componentDidMount() {
    const currentUser = auth.getCurrentUser();
    if (currentUser) {
      currentUser.userType = currentUser.partnerID ? "partner" : "member";
    }

    this.setState({ currentUser });
  }
  render() {
    const { currentUser } = this.state;
    return (
      <div>
        <ToastContainer />
        <NavBar user={currentUser} />

        <main>
          <Switch>
            <Route path="/members/register" component={MemberRegisterForm} />
            <Route path="/members/login" component={MemberLoginForm} />
            <Route
              path="/members"
              render={() => {
                if (!currentUser || currentUser.userType === "partner")
                  return <Redirect to="/" />;
                return <MembersDashboard />;
              }}
            />
            <Route path="/partners/register" component={PartnerRegisterForm} />
            <Route path="/partners/login" component={PartnerLoginForm} />
            <Route
              path="/partners"
              render={() => {
                if (!currentUser || currentUser.userType === "member")
                  return <Redirect to="/" />;
                return <PartnersDashboard />;
              }}
            />
            <Route path="/logout" component={Logout} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" exact component={Home} />
            <Redirect to="/not-found" />
            {/* <Route path="/member" component={} />
            <Route path="/partner"/> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
