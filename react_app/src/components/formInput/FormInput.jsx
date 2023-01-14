import React, { useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const {
    name,
    label,
    onchange,
    inputValue,
    type,
    errorMessage,
    pattern,
    maxLength,
    min,
    max,
  } = props;

  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };

  const now = new Date();

  const getMaxDate = () => {
    const min = 725809896000;

    const nowSec = now.getTime();
    const sec = nowSec - min;

    const maxDate = new Date(sec).toJSON().slice(0, 10);
    return maxDate;
  };
  const getMinDate = () => {
    const min = 1767189312000;

    const nowSec = now.getTime();
    const sec = nowSec - min;

    const minDate = new Date(sec).toJSON().slice(0, 10);
    return minDate;
  };

  return (
    <div className="form_input_box">
      <input
        type={type ? type : "text"}
        maxLength={maxLength}
        autoComplete="off"
        className={
          inputValue?.length > 0 || type === "date"
            ? "phone_input active_input"
            : "phone_input"
        }
        name={name}
        onChange={onchange}
        value={inputValue}
        required
        pattern={pattern}
        onBlur={handleFocus}
        focused={focused.toString()}
        max={type === "date" ? getMaxDate() : max}
        min={type === "date" ? getMinDate() : min}
      />
      <label
        id={(inputValue?.length > 0 || type === "date") && "label_up"}
        className="forminput_label"
        htmlFor=""
      >
        {label}
      </label>
      <span className="input_error_message">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
