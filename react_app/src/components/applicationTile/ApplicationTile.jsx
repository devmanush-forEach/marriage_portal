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
      let verify = window.confirm("Are you sure ??");
      if (verify) {
        const { status, data } = await axiosPost(
          "/application/reject",
          application
        );
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
  return (
    <>
      <div className="application_tile">
        <img src={profile} alt="" className="application_img" />
        <p className="applicant_name">Name : {application.name}</p>
        <p className="applicant_name">Email : {application.email}</p>
        <p className="applicant_name">Phone : {application.phone}</p>
        <p className="applicant_name">Gender : {application.gender}</p>
        <p className="applicant_name">DOB : {application.dob.slice(0, 10)}</p>
        <button
          onClick={() => {
            setShowDocs(!showdocs);
          }}
          className="show_docs_btn"
        >
          Show Docs
        </button>
        <div className="btn_box">
          <button onClick={handleVerify} className="verify_btn">
            Verify
          </button>
          <button onClick={handleReject} className="reject_btn">
            Reject
          </button>
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
