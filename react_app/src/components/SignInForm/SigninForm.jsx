import React, { useState } from "react";
import "./SigninForm.css";
import { useNavigate } from "react-router";
import { axiosPost } from "../../helpers/axiosRequests";
import FormInput from "../formInput/FormInput";
import { toast } from "react-toastify";

const SigninForm = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({ email: "", password: "" });
  const handleSignin = async (e) => {
    e.preventDefault();

    const { status, data: res } = await axiosPost("/signin", data);
    console.log(res);
    if (status === 200) {
      localStorage.setItem("jwt_token", res.token);
      toast("Successfully Logged In !!");
      navigate("/");
      window.location.reload();
    } else {
      toast.error(res.error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };
  return (
    <form action="" onSubmit={handleSignin} className="signin_form">
      <FormInput
        name="email"
        onchange={handleChange}
        label="Phone / Email"
        inputValue={data.email}
      />
      <FormInput
        name="password"
        onchange={handleChange}
        label="Password"
        inputValue={data.password}
      />
      <button className="submit_button" type="submit">
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;
