import React from "react";

const Input = ({ name, label, error, ...rest }) => {
  return (
    //{...rest} respresents all other props, they have the same name so we can write it like this
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input {...rest} id={name} name={name} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
