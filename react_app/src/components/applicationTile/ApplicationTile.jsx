import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { axiosPost } from "../../helpers/axiosRequests";
import { getImageUrl } from "../../helpers/firebase";
import { get_Applications } from "../../redux/actions/applications.actions";
import { RxCross2 } from "react-icons/rx";
import "./ApplicationTile.css";
import ApplicationDocs from "./ApplicationDocs";

const ApplicationTile = ({ application }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState(null);
  const [showdocs, setShowDocs] = useState(null);
  useEffect(() => {
    const getUrl = async () => {
      const url = await getImageUrl(application.profile);
      setProfile(url);
    };
    getUrl();

    window.addEventListener("mousedown", (e) => {
      const { target } = e;

      if (!document.getElementById("rightDrawer").contains(target)) {
        setShowDocs(false);
      }
    });
  }, [application]);

  const handleVerify = async () => {
    try {
      const verify = window.confirm("Are you sure ??");
      if (verify) {
        const { status, data } = await axiosPost(
          "/application/verify",
          application
        );
        if (status === 202) {
          toast("Application is successfully Verified.");
        } else {
          toast.error(data.error);
        }
        dispatch(get_Applications());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleReject = async () => {
    try {
      let remark = window.prompt("PLease add a remark here!!");
      if (remark) {
        const { status, data } = await axiosPost("/application/reject", {
          ...application,
          remark,
        });
        if (status === 202) {
          toast("Application is successfully deactivated.");
        } else {
          toast.error(data.error);
        }
        dispatch(get_Applications());
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleShowDocs = () => {
    if (application.docs.length > 0 && application.docs[0].name) {
      setShowDocs(!showdocs);
    } else {
      toast.error("No Docs are present!!");
    }
  };
  return (
    <>
      <div
        className={
          application.isActive
            ? "application_tile"
            : "application_tile rejected_application"
        }
      >
        <div className="application_img">
          <img src={profile} alt="" />
        </div>
        <p className="applicant_property">
          <span>Name :</span>
          {application.name}
        </p>
        <p className="applicant_property">
          <span>Email :</span>
          {application.email}
        </p>
        <p className="applicant_property">
          <span>Phone :</span>
          {application.phone}
        </p>
        <p className="applicant_property">
          <span>Gender :</span>
          {application.gender}
        </p>
        <p className="applicant_property">
          <span>DOB :</span>
          {application.dob.slice(0, 10)}
        </p>
        {!application.isActive && (
          <p className="applicant_property">
            <span>Remark :</span>
            {application?.remark}
          </p>
        )}
        <button onClick={handleShowDocs} className="show_docs_btn">
          Show Docs
        </button>
        <div className="btn_box">
          {application.isActive ? (
            <>
              <button onClick={handleVerify} className="verify_btn">
                Verify
              </button>
              <button onClick={handleReject} className="reject_btn">
                Reject
              </button>
            </>
          ) : (
            <>
              <div className="rejected_text">Rejected</div>
            </>
          )}
        </div>
      </div>
      {showdocs && (
        <div className="right_drawer" id="rightDrawer">
          <span
            onClick={() => {
              setShowDocs(false);
            }}
            className="cross_icon"
          >
            <RxCross2 />
          </span>

          <div className="docs_div">
            {application?.docs?.map(({ url, name }) => (
              <>
                <ApplicationDocs link={url} name={name} />
              </>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ApplicationTile;
