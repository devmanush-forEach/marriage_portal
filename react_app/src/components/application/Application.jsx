import { async } from "@firebase/util";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { axiosPost } from "../../helpers/axiosRequests";
import { getImageUrl, uploadImage } from "../../helpers/firebase";
import FormInput from "../formInput/FormInput";
import GenderInput from "../genderInput/GenderInput";
import ImageUpload from "../ImageUpload/ImageUpload";
import "./Application.css";
import inputList from "./inputList";
import { toast } from "react-toastify";

const Application = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    profile: null,
    docs: [],
    dob: new Date().toJSON().slice(0, 10),
  });

  const [addDoc, setAddDoc] = useState(false);
  const [profileUrl, setProfileUrl] = useState(null);
  const [docUrlList, setDocUrlList] = useState([]);
  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;

    console.log(name, value);
    setApplication({ ...application, [name]: value });
  };

  const handleAddDocs = async (file) => {
    const url = await uploadImage(file);
    setApplication({ ...application, docs: [...application.docs, url] });
    if (url) {
      toast("Document uploaded Successfully");
    } else {
      toast.error("Document didn't grt uploaded.");
    }
    const Url = await getImageUrl(url);
    setDocUrlList([...docUrlList, Url]);
    setAddDoc(false);
  };

  const handleAddProfile = async (img) => {
    const url = await uploadImage(img);
    setApplication({ ...application, profile: url });
    if (url) {
      toast("Profile uploaded Successfully");
    } else {
      toast.error("Profile didn't grt uploaded.");
    }
    const Url = await getImageUrl(url);
    setProfileUrl(Url);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const toCreate = { ...application };

      const { status, data: created } = await axiosPost(
        "/application/create",
        toCreate
      );

      if (status === 201) {
        navigate("/");
        toast("Your application is successfully registered. Thank you !! ");
      } else {
        toast.error(created.error);
      }
    } catch (error) {}
  };

  return (
    <div className="apltn_page_container">
      <div className="application_form_container">
        <h2 className="app_head">Application Form</h2>
        <form
          onSubmit={handleFormSubmit}
          action=""
          className="application_form"
          id="applicationForm"
        >
          {inputList.map((e, i) => {
            if (i === 1)
              return (
                <div className="form_div">
                  <GenderInput
                    onchange={handleChange}
                    defaultVal={application.gender}
                  />
                </div>
              );
            return (
              <>
                <div className="form_div">
                  <FormInput
                    name={e.name}
                    onchange={handleChange}
                    label={e.label}
                    inputValue={application[e.value]}
                    errorMessage={e.errorMessage}
                    pattern={e.pattern}
                    type={e.type}
                    defaultVal={application[e.name]}
                  />
                </div>
              </>
            );
          })}
          <div className="form_div">
            {application?.profile ? (
              <div className="app_profile_view">
                <img className="app_profile" src={profileUrl} alt="" />
              </div>
            ) : (
              <ImageUpload
                title="Upload Your Photo"
                onSelected={handleAddProfile}
              />
            )}
          </div>
          <div className="form_div">
            <div
              className="add_doc_btn "
              onClick={() => {
                setAddDoc(!addDoc);
              }}
            >
              {application.docs.length === 0
                ? "Upload Document"
                : "Upload Another Document"}
            </div>
            {addDoc && (
              <ImageUpload
                title="Upload Your Documents"
                onSelected={handleAddDocs}
              />
            )}
          </div>

          <div className="form_sbmt_div">
            <button className="formSubmitBtn" type="submit">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Application;
