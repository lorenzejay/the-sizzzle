import React, { useState, useEffect } from "react";
import Button from "../components/button";
import Form from "../components/form";
import Input from "../components/input";
import Layout from "../components/layout";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../redux/Actions/userActions";
import Loader from "../components/loader";
import { Link } from "react-router-dom";
import ErrorMessage from "../components/errorMessage";
import PaddingWrapper from "../components/paddingWrapper";

const SignIn = ({ history }) => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, userInfo, error } = userLogin;
  //if there is a logged in user
  const userLoggedInDetails = useSelector((state) => state.userLoggedInDetails);
  const { loggedInUserDetails } = userLoggedInDetails;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (userInfo && loggedInUserDetails) {
      history.push(`/dashboard/${loggedInUserDetails.username}`);
    }
  }, [history, userInfo, loggedInUserDetails]);

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Layout>
      <div className="h-screen w-full flex items-center justify-center overflow-y-hidden -mt-20">
        <PaddingWrapper>
          <Form title="Sign In" className="items-center" handleSubmit={(e) => handleLogin(e)}>
            {loading && <Loader />}
            {error && <ErrorMessage className="text-red-500 shadow">{error}</ErrorMessage>}
            <Input
              placeholder="Email"
              type="email"
              value={email}
              name="email"
              className="w-3/4 "
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              name="password"
              className=" w-3/4"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button className="w-3/4 uppercase" type="submit">
              Sign In
            </Button>
            <Link to="/sign-up" className="">
              If you don't have an account, <span style={{ color: "#ff0078" }}>Sign Up</span>
            </Link>
          </Form>
        </PaddingWrapper>
      </div>
    </Layout>
  );
};

export default SignIn;
