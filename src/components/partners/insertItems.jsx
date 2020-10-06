import React from "react";
import Joi from "joi-browser";
import Form from "../common/form";
import { saveItem } from "../../services/partnerService";
import { toast } from "react-toastify";
class InsertItems extends Form {
  state = {
    data: {
      name: "",
      description: "",
      pointsToEarn: 0,
      pointsToRedeem: 0,
      category: "",
    },
    categories: [],
    errors: {},
  };

  schema = {
    name: Joi.string().min(2).max(100).required().label("Name"),
    description: Joi.string().min(5).max(500).required().label("Description"),
    pointsToEarn: Joi.number().required().label("Points to earn"),
    pointsToRedeem: Joi.number().required().label("Points to redeem"),
    category: Joi.string().required().label("Category"),
  };
  //categories can only be bronze, silver and gold

  doSubmit = async () => {
    try {
      const { data } = await saveItem(this.props.data._id, this.state.data);
      console.log(data);
      window.scrollTo(0, 0);
      toast.success("New item has been added successfully!");
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
      <div>
        <h1 className="my-4">Insert new item</h1>
        <form onSubmit={this.handleSubmit}>
          {/* fill info for partner */}
          {this.renderInput("name", "Name")}
          {this.renderInput("description", "Description")}
          {this.renderInput("pointsToEarn", "Points to earn", "number")}
          {this.renderInput("pointsToRedeem", "Points to redeem", "number")}
          {this.renderInput("category", "Category")}
          {this.renderButton("Save item")}
        </form>
      </div>
    );
  }
}

export default InsertItems;
