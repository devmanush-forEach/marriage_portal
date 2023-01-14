import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="home_page_container">
        <div>
          <h2>Welcome to policy Calculater.</h2>
          <Link className="homelink" to="/calculater">
            Click Here to Calculate
          </Link>
        </div>
      </div>
    </>
  );
};

export default Home;
