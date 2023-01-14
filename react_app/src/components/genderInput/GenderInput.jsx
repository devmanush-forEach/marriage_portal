import React from "react";
import "./GenderInput.css";

const GenderInput = ({ onchange }) => {
  return (
    <>
      <div className="gender_input_box">
        <span className="gender_label">Gender</span>
        <div className="gender_box">
          <input
            type="radio"
            name="gender"
            value="male"
            onChange={onchange}
            id="male"
            required
          />
          <label htmlFor="male">Male</label>
        </div>
        <div className="gender_box">
          <input
            type="radio"
            name="gender"
            value="female"
            id="female"
            onChange={onchange}
            required
          />
          <label htmlFor="female">Female</label>
        </div>
      </div>
    </>
  );
};

export default GenderInput;
