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
    defaultVal,
    disabled,
  } = props;

  const [focused, setFocused] = useState(false);
  const handleFocus = () => {
    setFocused(true);
  };

  const now = new Date();

  const getMaxDate = () => {
    const min = 568025136000;

    const nowSec = now.getTime();
    const sec = nowSec - min;

    const maxDate = new Date(sec).toJSON().slice(0, 10);
    return maxDate;
  };

  return (
    <div className="form_input_box">
      <input
        style={{
          cursor: disabled && "not-allowed",
          color: disabled && "wheat",
        }}
        type={type ? type : "text"}
        maxLength={maxLength}
        autoComplete="off"
        className={
          defaultVal?.length > 0 || type === "date"
            ? "phone_input active_input"
            : "phone_input"
        }
        name={name}
        onChange={onchange}
        defaultValue={type !== "date" ? defaultVal : defaultVal.slice(0, 10)}
        // value={date}
        required
        pattern={pattern}
        onBlur={handleFocus}
        focused={focused.toString()}
        max={type === "date" ? getMaxDate() : max}
        disabled={disabled}
      />
      <label
        className={
          defaultVal?.length > 0 || type === "date"
            ? "forminput_label label_up"
            : "forminput_label"
        }
        htmlFor=""
      >
        {label}
      </label>
      <span className="input_error_message">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
