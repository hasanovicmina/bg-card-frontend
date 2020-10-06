import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import auth from "../../services/authService";
import { toast } from "react-toastify";

class LoginForm extends Form {
  state = {
    data: {
      partnerID: "",
      accessCardID: "",
    },
    errors: {},
  };

  schema = {
    //patter(new RegExp('^/d{6}$'))
    partnerID: Joi.string().required().min(5).max(50).label("Partner ID"),
    //like a password for now
    accessCardID: Joi.string()
      .min(5)
      .max(50)
      .required()
      .label("Access Card ID"),
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      await auth.partnerLogin(data.partnerID, data.accessCardID);
      sessionStorage.setItem(
        "partnerLogInMessage",
        "Partner successfully logged in."
      );
      window.location = "/";
      console.log("Partner Logged in ");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.partnerID = error.response.data;
        this.setState({ errors });
      }
    }
  };
  render() {
    return (
      <div className="container">
        <h1 className="my-4">Partner Login </h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accessCardID", "Access Card ID")}
          {this.renderInput("partnerID", "Partner ID")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default LoginForm;
