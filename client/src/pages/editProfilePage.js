import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { getUserDetails } from "../redux/Actions/userActions";
import DefaultPP from "../images/dpp.png";
import Layout from "../components/layout";
import Input from "../components/input";
import Modal from "../components/modal";
import styled from "styled-components";
import Loader from "../components/loader";

export const CustomInput = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  font-size: 1.25em;
  font-weight: 700;
  color: white;
  background-color: black;
  display: inline-block;

  background-color: red;
  border-bottom: 1px solid, #000;

  &:focus {
    background-color: red;
  }
`;
export const CustomLabel = styled.label`
  font-size: 1.25em;
  color: #000;
  display: inline-block;
  cursor: pointer;
  padding: 5px 15px;
`;

const EditProfilePage = ({ history }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [fileInputState, setFileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
    profilepic: "",
  });

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDetails = useSelector((state) => state.userDetails);
  const { profile } = userDetails;

  const userUpdateProfilePicture = useSelector((state) => state.userUpdateProfilePicture);
  const { loading, error, profilePic } = userUpdateProfilePicture;

  const data = useLocation();
  const { state } = data;

  useEffect(() => {
    if (!userInfo || !state || userInfo.returnedUserId !== state.user) {
      return history.push("/login");
    }
    dispatch(getUserDetails());
  }, [state]);

  useEffect(() => {
    if (profile) {
      setInputs({
        firstName: profile.first_name,
        lastName: profile.last_name,
        username: profile.username,
        profilepic: profile.profilepic,
      });
    }
  }, [dispatch, profilePic]);

  // profile && console.log(profile);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setInputs({ inputs, name: value });
  };

  const handleFileInputState = (e) => {
    //grabs the first file
    const file = e.target.files[0];

    previewFile(file);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file); //convers images into a string
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  // console.log(modalOpen);
  return (
    <Layout>
      {loading && <Loader />}
      {error && <h1>{error}</h1>}
      {profile && (
        <section className="px-10 pt-5 flex flex-col ">
          <div className="flex items-center gap-5">
            <img
              src={
                !profile.profilepic
                  ? previewSource
                    ? previewSource
                    : DefaultPP
                  : profile.profilepic
              }
              className="w-24 h-24 rounded-full object-cover"
            />
            <div className="flex flex-col gap-4">
              <h3 className="font-bold text-2xl">{profile.username}</h3>

              <Modal imageSrc={previewSource}>
                <CustomInput
                  type="file"
                  name="image"
                  id="file"
                  className="inputfile"
                  onChange={handleFileInputState}
                  value={fileInputState}
                />
                <CustomLabel htmlFor="file">Choose a file</CustomLabel>
                <button className="w-full text-red-500">Remove Current Photo</button>
              </Modal>
              {/* {previewSource && <img className="w-64" src={previewSource} />} */}
            </div>
          </div>

          <label htmlFor="name" className="mt-10 text-2xl font-bold">
            First Name
          </label>
          <Input name="firstName" value={inputs.firstName} onChange={handleChange} />

          <label htmlFor="name" className="mt-5 text-2xl font-bold">
            Last Name
          </label>
          <Input name="lastName" value={inputs.lastName} onChange={handleChange} />

          <label htmlFor="name" className="mt-5 text-2xl font-bold">
            Username
          </label>
          <Input name="lastName" value={inputs.username} onChange={handleChange} />
        </section>
      )}
    </Layout>
  );
};

export default EditProfilePage;
