import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { updateNames } from "../redux/Actions/userActions";
import DefaultPP from "../images/dpp.png";
import Layout from "../components/layout";
import Input from "../components/input";
import Modal from "../components/modal";
import styled from "styled-components";
import Loader from "../components/loader";
import PaddingWrapper from "../components/paddingWrapper";

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
  const [fileInputState] = useState("");
  const [previewSource, setPreviewSource] = useState("");
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    username: "",
  });
  const [inputError, setInputError] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  const userUpdateProfilePicture = useSelector((state) => state.userUpdateProfilePicture);
  const { loading, error, profilePic } = userUpdateProfilePicture;

  const userUpdateNames = useSelector((state) => state.userUpdateNames);
  const { success } = userUpdateNames;

  const data = useLocation();
  const { state } = data;

  useEffect(() => {
    if (!userInfo) {
      return history.push("/login");
    }
    if (userInfo && !state) {
      return history.push(`/dashboard/${loggedInUserDetails.returnedUsername}`);
    }
  }, [state, history, userInfo, dispatch, loggedInUserDetails]);
  // console.log(profile);

  useEffect(() => {
    if (loggedInUserDetails) {
      setInputs({
        firstName: loggedInUserDetails.first_name,
        lastName: loggedInUserDetails.last_name,
        username: loggedInUserDetails.username,
      });
    }
  }, [dispatch, profilePic, success, loggedInUserDetails]);

  // console.log(userInfo);

  const handleChange = (e) => {
    // console.log(name);

    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdate = () => {
    if (inputs.firstName !== "" && inputs.lastName !== "" && inputs.username !== "") {
      dispatch(updateNames(inputs.firstName, inputs.lastName, inputs.username));
      window.location.reload();
      setInputError("");
    } else {
      setInputError("Nothing must be blank");
    }
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
  console.log(previewSource);
  return (
    <Layout>
      {loading && <Loader />}
      {error && <h1>{error}</h1>}

      {loggedInUserDetails && (
        <PaddingWrapper>
          <section className="px-10 pt-20 flex flex-col ">
            <div className="flex items-center gap-5">
              <img
                src={
                  !previewSource
                    ? loggedInUserDetails
                      ? loggedInUserDetails.profilepic
                      : DefaultPP
                    : previewSource
                }
                className="w-24 h-24 rounded-full object-cover"
              />
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-2xl">{loggedInUserDetails.username}</h3>

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
            {inputError && <h2 className="text-red-500 mt-8">{inputError}</h2>}
            {success && <h2 className="text-green-500 mt-8">Profile Updated Successfully</h2>}
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
            <Input name="username" value={inputs.username} onChange={handleChange} />

            <button
              type="button"
              className="bg-gray-800 text-white w-1/2 px-6 py-1 rounded-sm"
              onClick={handleUpdate}
            >
              Update Username
            </button>
          </section>
        </PaddingWrapper>
      )}
    </Layout>
  );
};

export default EditProfilePage;
