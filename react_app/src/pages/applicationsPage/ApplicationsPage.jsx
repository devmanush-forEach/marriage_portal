import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ApplicationTile from "../../components/applicationTile/ApplicationTile";
import { get_Applications } from "../../redux/actions/applications.actions";
import "./ApplicationsPage.css";

const ApplicationsPage = () => {
  const dispatch = useDispatch();
  const { applications } = useSelector((state) => state.applications);

  useEffect(() => {
    if (!applications) {
      dispatch(get_Applications());
    }
  }, []);

  console.log(applications);
  return (
    <div className="applications_page_main_container">
      <div className="applications_container">
        <h2 className="applications_heading">Applications</h2>
        {applications?.map((ele) => (
          <ApplicationTile application={ele} />
        ))}
      </div>
    </div>
  );
};

export default ApplicationsPage;
