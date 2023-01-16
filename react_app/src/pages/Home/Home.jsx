import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Application from "../../components/application/Application";
import { get_Applications } from "../../redux/actions/applications.actions";
import "./Home.css";

const Home = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <div className="home_page_container">
        <div>
          {user?.roles?.includes("r1") ? (
            <Link
              onClick={() => {
                dispatch(get_Applications());
              }}
              to="/applications"
              className="home_link"
            >
              Click here to see all Applications.
            </Link>
          ) : (
            <Link to="/application" className="home_link">
              Click here to Register your Application.
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
