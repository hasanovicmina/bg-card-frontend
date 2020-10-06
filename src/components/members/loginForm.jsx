import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
// import Dashboard from "./dashboard";
import auth from "../../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: {
      accountNum: "",
      accessCardID: "",
      // phoneNum: ""
    },
    errors: {},
  };

  schema = {
    //patter(new RegExp('^/d{6}$'))
    accountNum: Joi.string().min(5).max(255).required().label("Account Number"),
    //like a password for now
    accessCardID: Joi.string()
      .min(5)
      .max(255)
      .required()
      .label("Access Card ID"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.memberLogin(data.accountNum, data.accessCardID);
      // await auth.memberLoginBlock(data.accountNum, data.accessCardID);
      sessionStorage.setItem(
        "memberLogInMessage",
        "Member successfully logged in."
      );
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.accountNum = error.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="my-4">Member Login </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accessCardID", "Access Card ID")}
          {this.renderInput("accountNum", "Account Number")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
