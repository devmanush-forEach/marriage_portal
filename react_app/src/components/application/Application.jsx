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

  // const [addDoc, setAddDoc] = useState(false);
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
    if (file) {
      const url = await uploadImage(file);
      setApplication({
        ...application,
        docs: [...application.docs, { url, name: file.name }],
      });
      const Url = await getImageUrl(url);
      setDocUrlList([...docUrlList, { url: Url, name: file.name }]);
      // setAddDoc(false);
    }
  };

  const handleAddProfile = async (img) => {
    if (img) {
      setApplication({ ...application, profile: img });
      const Url = URL.createObjectURL(img);
      setProfileUrl(Url);
    }
  };

  const handleProfileChange = () => {
    setProfileUrl(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const profileUrl = await uploadImage(application.profile);

      const toCreate = { ...application, profile: profileUrl };
      console.log(toCreate);

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
    } catch (error) {
      toast.error(error.message);
    }
  };

  console.log(application);

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
          <section className="form_input_containers">
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
          </section>
          <section className="form_input_containers">
            <div className="profile_div" id="profile_div">
              <label className="profile_label" htmlFor="profile_div">
                Profile
              </label>
              {profileUrl && (
                <div className="app_profile_change">
                  <button onClick={handleProfileChange}>change</button>
                </div>
              )}
              {profileUrl ? (
                <div className="app_profile_view">
                  <img className="app_profile" src={profileUrl} alt="" />
                </div>
              ) : (
                <ImageUpload
                  title="Upload Your Photo"
                  name="profile"
                  onSelected={handleAddProfile}
                />
              )}
            </div>
            <div className="profile_div">
              <label className="profile_label" htmlFor="profile_div">
                Documents
              </label>
              <div className="document_input_container">
                <ImageUpload
                  title={
                    application.docs.length === 0
                      ? "Upload Document"
                      : "Upload Another Document"
                  }
                  name="document"
                  onSelected={handleAddDocs}
                />
              </div>
            </div>
          </section>
          {docUrlList.length > 0 && (
            <div className="document_view_box">
              {docUrlList?.map(({ url, name }, i) => {
                return (
                  <>
                    <div className="document_view_tile" id={`${i}${name}`}>
                      <img src={url} alt="" />
                      <label className="profile_label" htmlFor={`${i}${name}`}>
                        <abbr title={name}>{name}</abbr>
                      </label>
                    </div>
                  </>
                );
              })}
            </div>
          )}

          <div className="form_sbmt_div application_submit_div">
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
