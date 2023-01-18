import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaUserEdit } from "react-icons/fa";
import { RiEdit2Fill } from "react-icons/ri";
import "./Profile.css";
import { set_User } from "../../redux/actions/user.actions";
import { uploadImage } from "../../helpers/firebase";
import { axiosPost } from "../../helpers/axiosRequests";
import GenderInput from "../../components/genderInput/GenderInput";
import FormInput from "../../components/formInput/FormInput";
import { addressInputList, generalInputList } from "./inputList";
import { toast } from "react-toastify";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const [generalData, setGeneralData] = useState({
    ...user,
    dob: new Date().toJSON().slice(0, 10),
  });

  const [address, setAddress] = useState({});

  const [edit, setEdit] = useState(true);

  const [editInfo, setEditInfo] = useState(true);
  const [editAddress, setEditAddress] = useState(true);

  const [userProfile, setUserProfile] = useState("");
  const [data, setData] = useState(user);
  const [newProfile, setNewProfile] = useState(null);
  const [showdd, setShowdd] = useState(false);

  const toggledd = () => {
    setShowdd(!showdd);
  };

  const toggleInfoEdit = () => {
    setEditInfo(!editInfo);
  };
  const toggleAddressEdit = () => {
    setEditAddress(!editAddress);
  };

  const handleChange = (e) => {
    const {
      target: { name, value },
    } = e;
    setGeneralData({ ...generalData, [name]: value });
  };

  const updateAddress = (e) => {
    const {
      target: { name, value },
    } = e;
    setAddress({ ...address, [name]: value });
  };

  const handleRemoveProfile = () => {
    dispatch(set_User({ ...user, profile: null }));
    setData({ ...data, profile: null });
  };

  const handleUploadPhoto = () => {
    document.getElementById("profile_upload").click();
  };

  const handleProfileChange = ({ target }) => {
    if (target.files.length > 0) {
      setNewProfile(target.files[0]);
      setUserProfile(URL.createObjectURL(target.files[0]));
    }
  };

  const updateUser = async (e) => {
    e.preventDefault();
    try {
      const toUpdate = { ...generalData };
      // if (newProfile !== null) {
      //   const imgUrl = await uploadImage(newProfile);
      //   toUpdate.profile = imgUrl;
      // }

      const { status, data: updated } = await axiosPost(
        "/user/update",
        toUpdate
      );
      if (status === 201) {
        toast("User successfully updated.");
        dispatch(set_User(updated));
      }

      console.log(status);

      setEdit(false);
      setShowdd(false);
    } catch (error) {}
  };
  const handleUpdateAddress = async (e) => {
    e.preventDefault();
    try {
      const toUpdate = { ...user.address, ...address };
      if (!user?.address) {
        const { status, data: created } = await axiosPost(
          "/address/create",
          toUpdate
        );
        if (status === 201) {
          toast("Address successfully added.");
        } else {
          toast.error(created.error);
        }
      } else {
        const { status, data: updated } = await axiosPost(
          "/address/update",
          toUpdate
        );
        if (status === 200) {
          toast("Address successfully updated.");
        } else {
          toast.error(updated.error);
        }
      }

      // window.location.reload();

      // dispatch(set_User(updated));
      setEdit(false);
      setShowdd(false);
    } catch (error) {
      toast.error(error.message);
      // dispatch(show_Notification({ message: "ERR_CONNECTION_REFUSED" }));
    }
  };

  return (
    <div className="profile_main_container">
      <div className="edit_form_box">
        <div className="general_information_box input_boxes">
          <h2>
            General Information
            <span className="edit_icon" onClick={toggleInfoEdit}>
              <FaUserEdit />
            </span>
          </h2>
          <form onSubmit={updateUser} action="" className="general_info_form">
            {generalInputList.map((e, i) => {
              if (i === 1)
                return (
                  <div className="form_div">
                    <GenderInput
                      onchange={handleChange}
                      defaultVal={user?.gender}
                      disabled={editInfo}
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
                      // inputValue={generalData[e.value]}
                      errorMessage={e.errorMessage}
                      pattern={e.pattern}
                      type={e.type}
                      defaultVal={user ? user[e.name] : ""}
                      disabled={editInfo}
                    />
                  </div>
                </>
              );
            })}
            <div className="form_sbmt_div">
              <button
                className="formSubmitBtn"
                type="submit"
                disabled={editInfo}
              >
                Update
              </button>
            </div>
          </form>
        </div>
        <div className="general_information_box input_boxes">
          <h2>
            Address
            <span className="edit_icon" onClick={toggleAddressEdit}>
              <FaUserEdit />
            </span>
          </h2>
          <form
            onSubmit={handleUpdateAddress}
            action=""
            className="general_info_form"
          >
            {addressInputList.map((e) => (
              <div className="form_div">
                <FormInput
                  name={e.name}
                  onchange={updateAddress}
                  label={e.label}
                  inputValue={address[e.value]}
                  // defaultVal={address[e.value]}
                  errorMessage={e.errorMessage}
                  pattern={e.pattern}
                  type={e.type}
                  maxLength={e.maxLength}
                  disabled={editAddress}
                  defaultVal={user ? user.address[e.name] : ""}
                />
              </div>
            ))}
            <div className="form_sbmt_div">
              <button
                className="formSubmitBtn"
                type="submit"
                disabled={editAddress}
              >
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="profile_card_box">
        <div className="profile_box">
          <img
            className="profile_image"
            src={
              userProfile
                ? userProfile
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRROt7YUKa7excpJt4CR59ZwHzhWDfV1mr0eQ&usqp=CAU"
            }
            alt=""
          />
          {!editInfo && (
            <button
              onClick={toggledd}
              className="profile_edit_btn get-start-btn"
            >
              <span>
                <RiEdit2Fill />
              </span>
              Edit
            </button>
          )}
          {showdd && (
            <div className="profile_edit_option_dd">
              <button onClick={handleUploadPhoto}>Upload A Photo</button>
              <input
                id="profile_upload"
                type="file"
                placeholder="Upload aphoto"
                hidden
                onChange={handleProfileChange}
              />
              <button onClick={handleRemoveProfile}>Remove photo</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
