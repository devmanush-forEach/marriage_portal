import axios from "axios";
import "./SignupForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import FormInput from "../formInput/FormInput";
import { axiosPost } from "../../helpers/axiosRequests";
import { toast } from "react-toastify";
import GenderInput from "../genderInput/GenderInput";
import inputList from "./inputList";

const SignupForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    gender: "",
    dob: new Date().toJSON().slice(0, 10),
  });
  const handleSignup = async (e) => {
    e.preventDefault();

    const res = await axiosPost("/signup", userData);
    const { status, data } = res;

    if (status === 201) {
      localStorage.setItem("jwt_token", data.token);
      toast("User registered successfully!!");
      navigate("/");
      window.location.reload();
    } else {
      toast.error(data.error);
    }
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <form
      action=""
      id="signup_form"
      onSubmit={handleSignup}
      className="signup_form"
    >
      {inputList.map((e, i) => {
        if (i === 1) return <GenderInput onchange={handleChange} />;
        return (
          <>
            <FormInput
              name={e.name}
              onchange={handleChange}
              label={e.label}
              inputValue={userData[e.value]}
              errorMessage={e.errorMessage}
              pattern={e.pattern}
              type={e.type}
            />
          </>
        );
      })}

      <FormInput
        name="confirmPassword"
        onchange={handleChange}
        label="Confirm Password"
        inputValue={userData.confirmPassword}
        errorMessage="Passwords are not equal !!"
        pattern={userData.password}
      />
      <button className="submit_button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
