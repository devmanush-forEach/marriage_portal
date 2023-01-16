import React from "react";
import "./GenderInput.css";

const GenderInput = ({ onchange, defaultVal, disabled }) => {
  return (
    <>
      <div className="gender_select_box">
        <select
          style={{ cursor: disabled && "not-allowed" }}
          name="gender"
          id="gender"
          onChange={onchange}
          className="gender_select"
          value={defaultVal}
          required
          disabled={disabled}
        >
          <option value="" selected disabled>
            Select Your Gender
          </option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label className="gender_select_label" htmlFor="gender">
          Premium Frequency
        </label>
      </div>
    </>
  );
};

export default GenderInput;
