import React from "react";
import { Link } from "react-router-dom";

const Columns = () => {
  // const numOfColumns = numOfColumns;
  // const colArr = [];
  // colArr.length = numOfColumns;

  return (
    <div className="container my-5">
      <div className="row" style={{ marginBottom: "5rem" }}>
        <div className="col-md-4 custom-box">
          <h1>Members</h1>
          <p>Register and start you journey</p>
          <Link to="/members/login" className="btn btn-primary">
            Login
          </Link>
          <Link to="/members/register" className="btn btn-primary">
            Register
          </Link>
        </div>
        <div className="col-md-6 text-right">
          <h1>Start your journey now!</h1>

          <p>
            Become a member and explore Belgrade card benefits. Register or
            Login to safely earn and redeem points.
          </p>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <h1>Choose Belgrade card loyalty to improve your bussiness!</h1>
          <p>
            Become a partner for better customer insight, safe transactions and
            many more.
          </p>
        </div>
        <div className="col-md-4 custom-box text-right d-flex flex-column align-items-end">
          <h1>Partners</h1>
          <p>Register and start your journey.</p>
          <div>
            <Link to="/partners/login" className="btn btn-primary">
              Login
            </Link>
            <Link to="/partners/register" className="btn btn-primary mr-0">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Columns;
