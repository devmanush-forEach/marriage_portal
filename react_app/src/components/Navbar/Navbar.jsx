import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { set_User } from "../../redux/actions/user.actions";
import { axiosGet } from "../../helpers/axiosRequests";
import { RxCross2 } from "react-icons/rx";
import SignupForm from "../SignupForm/SignupForm";
import SigninForm from "../SignInForm/SigninForm";
import { toast } from "react-toastify";
import links from "./links";

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showSignin, setShowSignin] = useState(false);
  const [formType, setFormType] = useState(false);

  const handleSignOut = async () => {
    localStorage.clear();
    toast("Successfully Signed Out");
    dispatch(set_User(null));
  };

  const handleShowSignin = () => {
    setShowSignin(!showSignin);
    setFormType(false);
  };

  useEffect(() => {
    const getData = async () => {
      const { status, data } = await axiosGet("/user");
      if (status === 200) {
        dispatch(set_User(data.user));
      }
    };
    getData();

    window.addEventListener("mousedown", (e) => {
      const { target } = e;

      if (!document.getElementById("signInBox").contains(target)) {
        setShowSignin(false);
        setFormType(false);
      }
    });
  }, []);

  const handleToggleForm = () => {
    setFormType(!formType);
  };

  return (
    <>
      <header>
        <nav>
          <div className="nav_left">
            <ul className="nav_link_list">
              {links.map((ele) => (
                <>
                  <li>
                    <Link className="nav_links" to={ele.path}>
                      {ele.label}
                    </Link>
                  </li>
                </>
              ))}
            </ul>
          </div>
          <div className="nav_right">
            {user ? (
              <>
                <div className="nav_user_name">{user.name.split(" ")[0]}</div>
                <div className="nav_dd">
                  <button onClick={handleSignOut}>Sign Out</button>
                  <Link className="nav_dd_link" to="/profile">
                    Profile
                  </Link>
                </div>
              </>
            ) : (
              <>
                <button
                  className="signin_btn"
                  to="/"
                  onClick={handleShowSignin}
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </nav>
      </header>
      {showSignin && (
        <div className="signin_box">
          <div className="signin_main_box" id="signInBox">
            <span>
              <RxCross2 onClick={handleShowSignin} />
            </span>
            <div className="signin_title">
              {formType ? "Welcome" : "Welcome Back"}
            </div>

            {formType ? <SignupForm /> : <SigninForm />}
            <div className="toggle_signin_form">
              {formType
                ? "Already have an account. "
                : "Don't have an account. "}
              Click here to
              <button
                className="sign_form_toggle_btn"
                onClick={handleToggleForm}
              >
                {formType ? " Log in" : " Register"}
              </button>
              {" ."}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
