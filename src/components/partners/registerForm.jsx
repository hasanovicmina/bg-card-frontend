import React from "react";
import Form from "../common/form";
import Joi from "joi-browser";
import { savePartner } from "../../services/partnerService";
import auth from "../../services/authService";

class RegisterForm extends Form {
  state = {
    data: {
      partnerID: "",
      accessCardID: "",
      name: "",
      // phoneNum: ""
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
    name: Joi.string().min(2).max(100).required().label("Company Name"),
  };
  doSubmit = async () => {
    try {
      const response = await savePartner(this.state.data);

      auth.loginWithJWT(response.headers["x-auth-token"]);
      console.log(response);
      window.location = "/";
    } catch (error) {
      console.log("CAO");
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
        <h1 className="my-4">Partner Registration</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("accessCardID", "Access Card ID")}
          {this.renderInput("partnerID", "Partner ID")}
          {this.renderInput("name", "Company Name")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
