import axios from "axios";
import "./SignupForm.css";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import FormInput from "../formInput/FormInput";
import { axiosPost } from "../../helpers/axiosRequests";
import { toast } from "react-toastify";
import GenderInput from "../genderInput/GenderInput";

const SignupForm = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
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
      <FormInput
        name="name"
        onchange={handleChange}
        label="Full Name"
        inputValue={userData.name}
        errorMessage="Name's length should not be less than 3 and shouldn't include any special character"
        pattern="^([a-zA-Z]{2,}\s[a-zA-Z]{1,}'?-?[a-zA-Z]{2,}\s?([a-zA-Z]{1,})?)"
      />
      <GenderInput onchange={handleChange} />
      <FormInput
        type="email"
        name="email"
        onchange={handleChange}
        label="Email"
        inputValue={userData.email}
        errorMessage="Entered email should be a valid email"
        pattern="^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$"
      />
      <FormInput
        name="phone"
        onchange={handleChange}
        label="Phone"
        inputValue={userData.phone}
        errorMessage="Phone number's length should not be less than 10"
        pattern="^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$"
      />
      <FormInput
        type="date"
        name="dob"
        onchange={handleChange}
        label="Date Of Birth"
        inputValue={userData.dob}
        errorMessage="Date should be less than 1-1-2020"
        pattern="^[A-Za-z0-9]{3,20}"
      />
      <FormInput
        name="password"
        onchange={handleChange}
        label="Password"
        inputValue={userData.password}
        errorMessage="Minimum length is 8, at includes at least one letter and one number"
        pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$"
      />
      <button className="submit_button" type="submit">
        Sign Up
      </button>
    </form>
  );
};

export default SignupForm;
