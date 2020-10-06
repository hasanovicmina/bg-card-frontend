import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { saveMember } from "../../services/memberService";
import auth from "../../services/authService";
class RegisterForm extends Form {
  state = {
    data: {
      accountNum: "",
      accessCardID: "",
      firstName: "",
      lastName: "",
      email: "",
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
    firstName: Joi.string().min(2).max(50).required().label("First name"),
    lastName: Joi.string().min(2).max(100).required().label("Last name"),
    email: Joi.string().email().required().label("Email"),
  };
  doSubmit = async () => {
    try {
      const response = await saveMember(this.state.data);
      auth.loginWithJWT(response.headers["x-auth-token"]);
      console.log(response);
      window.location = "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.accessCardID = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div className="container">
        <h1 className="my-4">Member Registration</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accessCardID", "Access Card ID")}
          {this.renderInput("accountNum", "Account Number")}
          {this.renderInput("firstName", "First name")}
          {this.renderInput("lastName", "Last name")}
          {this.renderInput("email", "Email")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
