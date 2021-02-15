import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../components/button";
import ErrorMessage from "../components/errorMessage";
import Form from "../components/form";
import Input from "../components/input";
import Layout from "../components/layout";
import Loader from "../components/loader";
import { register } from "../redux/Actions/userActions";

const SignUp = ({ history }) => {
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, userInfo, error } = userRegister;

  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (userInfo && loggedInUserDetails) {
      history.push(`/dashboard/${loggedInUserDetails.username}`);
    }
  }, [history, userInfo, loggedInUserDetails]);

  const handleSignUp = (e) => {
    e.preventDefault();
    setFormError("");
    if (password === confirmPassword) {
      if (username !== "" && firstName !== "" && lastName !== "" && password !== "" && email !== "")
        dispatch(register(email, username, firstName, lastName, password));
      else {
        return setFormError("Nothing must be blank.");
      }
    } else {
      setFormError("The passwords do not match");
    }
  };

  return (
    <Layout>
      <div className="h-screen w-full flex items-center justify-center ">
        {loading && <Loader />}
        <Form title={"Sign Up"} className="mx-auto" handleSubmit={handleSignUp}>
          {error && (
            <ErrorMessage className="mx-auto w-3/4 p-3 text-red-500 shadow">{error}</ErrorMessage>
          )}
          {formError && <ErrorMessage>{formError}</ErrorMessage>}
          <Input
            placeholder="First Name"
            type="text"
            name="firstName"
            value={firstName}
            className="mx-auto lg:w-1/4 "
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            placeholder="Last Name"
            type="text"
            name="lastName"
            value={lastName}
            className="mx-auto lg:w-1/4 "
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            placeholder="Username"
            type="text"
            name="username"
            value={username}
            className="mx-auto lg:w-1/4 "
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            className="mx-auto lg:w-1/4 "
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            className="mx-auto lg:w-1/4 "
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            className="mx-auto lg:w-1/4 "
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button className="w-3/4 md:w-1/2 lg:w-1/4 uppercase" type="submit">
            Continue
          </Button>
          <Link to="/login" className="mx-auto mt-5">
            If you already have an account, <span style={{ color: "#ff0078" }}>Sign In</span>
          </Link>
        </Form>
      </div>
    </Layout>
  );
};

export default SignUp;
